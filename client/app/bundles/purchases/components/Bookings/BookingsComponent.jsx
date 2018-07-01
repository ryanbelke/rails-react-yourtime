import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import {withCookies, Cookies} from 'react-cookie';

import {StripeProvider} from 'react-stripe-elements';
import Script from 'react-load-script'
import Booking from './Booking';
import css from './BookingsComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkout from './Checkout';
import requestsManager from 'libs/requestsManager';

class BookingsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$bookings: Immutable.fromJS([]),
      fetchBookingsError: null,
      isFetching: false,
      $$bookingServices: Immutable.fromJS([]),
      $$changedServices: Immutable.fromJS([]),
      serviceList: Immutable.fromJS([]),
      $$bookingAddOns: Immutable.fromJS([]),
      totalCost: 0,
      totalTax: 0,
      adjustedTotalCost : 0,
      adjustedTotalTax: 0,
      yourTimeFee: 0,
      adjustedPrices: false,
      checkoutLoading: true,
      stripeScriptLoaded: false,
      jqueryScriptLoaded: false,
      scriptError: null,
      showDiscount: true,
      discountError: null,
      discountMessage: null,
      discountPrice: null,
      $$combinedServices: Immutable.fromJS([]),
      discountCode: null,
      bookingNotes: null,
    };
    _.bindAll(this, ['fetchBookings', 'fetchServices',
      'calculateTotal', 'handleScriptError',
      'handleScriptLoad',  'returnLocation', 'bookingState', 'updateServices']);
    this.checkDiscount = this.checkDiscount.bind(this);
  }

  componentDidMount() {
    this.fetchBookings()
      .then(() => this.fetchServices())
      .then(() => this.fetchAddOns())
      .then(() => this.calculateTotal());
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.setState({stripeKey: "pk_test_5yOGF65rhzZjobGYiOoYJoj0"});
    } else {
      this.setState({stripeKey: "pk_live_WSJt2zrFYytVOVNhNJUezCKx"});
    }
  }

  bookingState(booking_notes) {
    this.setState({ bookingNotes: booking_notes})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.get('resetServices') == true) {
      this.setState({
        $$bookingServices: [],
        $$bookingAddOns: [],
        totalCost: 0, totalTax: 0, yourTimeFee: 0, addServiceButton: true
      });
    }
  }

  updateServices(chargedService) {
    console.log("update service " + chargedService)
      this.setState( () => { return {
        adjustedTotalCost: 0,
        adjustedTotalTax: 0,
        yourTimeFee: 0,
      }})
    this.calculateTotal(chargedService)
  }
  fetchBookings() {
    return new Promise((resolve, reject) => {
      let {props} = this.props.props;
      let booking = props.booking;
      const {cookies} = this.props;
      let workplace, location, category, section;

      if (booking) {
        workplace = booking.workplace_id;
        location = booking.location_id;
        category = booking.category_id;
        section = booking.section_id;
      } else {
        location = cookies.get('location');
      }
      if (booking || cookies.get('location') != null || undefined) {
        this.props.actions.fetchBookings(workplace, location, category, section);
        resolve();
      } else {
        reject("location not found");
      }
    })
  }

  fetchServices() {
    let {props} = this.props.props;
    let {data, cookies} = this.props;
    let booking = props.booking;
    let serviceList = Immutable.List([]);

    if (booking && data.get('resetServices') == false) {
      serviceList = booking.service_id;
    } else if (data.get('resetServices')) {

    } else {
      serviceList = Immutable.List(cookies.get('services'));
    }

    return new Promise((resolve, reject) => {
      const {cookies} = this.props;
      if (serviceList.size != 0) {
        serviceList.forEach(($$service) => {
          requestsManager
            .postService($$service)
            .then(res => this.setState(({$$bookingServices, $$combinedServices}) => ({
              $$bookingServices: $$bookingServices.push(Immutable.fromJS(res.data)),
              $$combinedServices: $$combinedServices.push(Immutable.fromJS(res.data)),
            })))
            .catch(error => this.setState({error: error}));
        }, resolve());
      } else {
        reject("services not found")
      }
    })
  }

  fetchAddOns() {
    const {cookies} = this.props;
    const addOnList = Immutable.List(cookies.get('addOns'));
    return new Promise((resolve, reject) => {
      console.log("fetching add ons");
      if (addOnList.size > 0) {
        addOnList.forEach(($$addOn) => {
          requestsManager
            .postAddOn($$addOn)
            .then(res => this.setState(({$$bookingAddOns, $$combinedServices}) => ({
              $$bookingAddOns: $$bookingAddOns.push(Immutable.fromJS(res.data)),
              $$combinedServices: $$combinedServices.push(Immutable.fromJS(res.data)),
            })))
            .catch(error => this.setState({error: error}));
        }, resolve());
      } else {
        resolve("no add on lists selected")
      }
    })
  }

  calculateTotal(chargedServices) {
    let {totalCost, totalTax, yourTimeFee, $$bookingServices, $$bookingAddOns, adjustedTotalCost, adjustedTotalTax} = this.state;
    let x = 0;
    console.log("charged service = " + JSON.stringify(chargedServices))
    if(chargedServices != undefined ) {
      chargedServices.forEach( ($$service) => {
        this.setState( (prevState) => {
          console.log('update state ' + prevState.totalCost + "current state = " + this.state.totalCost)
          return {
            adjustedTotalCost: prevState.adjustedTotalCost += parseFloat($$service.servicePrice),
            adjustedTotalTax: prevState.adjustedTotalTax += parseFloat($$service.serviceTax),
            checkoutLoading: false,
            adjustedPrices: true,
            // yourTimeFee: yourTimeFee += (parseFloat($booking.getIn(['service', 'service_price'])) *
            // parseFloat($booking.getIn(['service', 'yourtime_fee'])))
          }
        })
      })
    }
    if(chargedServices == undefined) {
      if ($$bookingServices.size == 0) {
        ( () => {
          setTimeout(() => {
            if ($$bookingServices.size == 0 && x < 3) {
              setTimeout(() => {
                console.log("RETRYING ");
                this.calculateTotal()
              }, 1000);
              x++;
            }
          }, 1000)
        })()
      } else {
        $$bookingServices.forEach(($booking) => {
          if ($booking.getIn(['service', 'service_price']) != null) {
            this.setState( () => {
                return {
                  totalCost: totalCost += parseFloat($booking.getIn(['service', 'service_price'])),
                  totalTax: totalTax += parseFloat($booking.getIn(['service', 'service_tax'])),
                  checkoutLoading: false,
                  yourTimeFee: yourTimeFee += (parseFloat($booking.getIn(['service', 'service_price'])) *
                  parseFloat($booking.getIn(['service', 'yourtime_fee'])))
                }
              }
            )
          }
        });
        $$bookingAddOns.forEach(($booking) => {
          if ($booking.getIn(['service', 'service_price']) != null) {
            this.setState((prevState) => {
              return {
                totalCost: totalCost += parseFloat($booking.getIn(['service', 'service_price'])),
                totalTax: totalTax += parseFloat($booking.getIn(['service', 'service_tax'])),
                checkoutLoading: false,
                yourTimeFee: yourTimeFee += (parseFloat($booking.getIn(['service', 'service_price'])) *
                parseFloat($booking.getIn(['service', 'yourtime_fee'])))
              }
            })
          }
        });
      }
    }

  }

  handleScriptError() {
    this.setState({scriptError: true});
  }

  handleScriptLoad(script) {
    if (script == 'stripe') {
      this.setState({stripeScriptLoaded: true});
    } else {
      this.setState({jqueryScriptLoaded: true});

    }
  }

  checkDiscount(discount) {
    let {discountPrice, totalCost, showDiscount, discountMessage, discountError, props} = this.state;
    let current_user = this.props.props.props.railsHelpers.current_user;

    this.setState({checkoutLoading: true});

    this.setState({showDiscount: false});
    requestsManager.checkDiscount(discount, current_user)
      .then((res) => res.data.status == 403 ? this.setState({
          showDiscount: true,
          discountError: res.data.message, discountMessage: false, discountPrice: null, checkoutLoading: false
        })
        : setTimeout(() => {
          this.setState( () => {
            return {
              showDiscount: true, discountMessage: "Discount Applied", discountError: false,
              discountPrice: res.data.discount.discount_price, totalCost: totalCost -= res.data.discount.discount_price,
              checkoutLoading: false, discountCode: discount
            }
          })
        }, 1000)
      )
      .catch((error) => this.setState({showDiscount: true, discountError: error, checkoutLoading: false}));
  }

  returnLocation() {
    const {data, props} = this.props;
    let booking = props.props.booking;
    //if reset services is false and there is no selected category return 'Select Location'
    if ( !data.get('resetServices') &&  data.getIn(['$$editLocation', 'locationName']) == undefined
      && data.get('$$bookings').isEmpty() ) {

      return booking.booking_location;
      //if there has been a selected category return the selected locations name
    } else if ( !data.get('resetServices') && data.get('$$editLocation').isEmpty() ){

      return data.getIn(['$$bookings', '0', 'locationName'])

    } else if (data.getIn(['$$editLocation', 'locationName']) != undefined) {

      return data.getIn(['$$editLocation', 'locationName']);
      //else just return the booking location's name
    } else {
      return 'Select Location'
    }
  }

  render() {
    const {data, actions, props, edit} = this.props;
    let booking = props.props.booking;
    let admin = props.props.railsHelpers.admin;
    let bookingNodes, stripeNode, editNode;
    const isFetching = data.get('isFetching');
    const bookings = Immutable.fromJS(data.get('$$bookings'));
    let bookingServices = this.state.$$bookingServices;
    let bookingAddOns = this.state.$$bookingAddOns;

    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    this.state.stripeScriptLoaded ?
      stripeNode = (
        <StripeProvider apiKey={this.state.stripeKey}>
          <Checkout totalPrice={this.state.adjustedPrices ? this.state.adjustedTotalCost : this.state.totalCost}
                    totalTax={this.state.adjustedPrices ? this.state.adjustedTotalTax : this.state.totalTax}
                    loading={this.state.checkoutLoading}
                    yourTimeFee={this.state.yourTimeFee}
                    props={props}
                    showDiscount={this.state.showDiscount}
                    checkDiscount={this.checkDiscount}
                    discountMessage={this.state.discountMessage}
                    discountError={this.state.discountError}
                    edit={edit}
                    bookingMessage={booking ? booking.booking_notes : null}
                    bookingNotes={this.bookingState}
          />
        </StripeProvider>
      )
      :
      null;

    if (bookings != null || undefined) {
      bookingNodes = bookings.map(($$booking, index) =>
        (<Booking
          key={$$booking.get('bookingId') || index }
          workplaceName={data.getIn(['$$editWorkplace', 'workplaceName'])
          || $$booking.get('workplaceName')}
          categoryName={data.getIn(['$$editCategory', 'categoryName'])
          || $$booking.get('categoryName')}
          locationName={this.returnLocation()}
          sectionName={$$booking.get('sectionName')}
          services={bookingServices}
          addOns={bookingAddOns}
          dates={$$booking.get('dates')}
          actions={actions}
          booking={booking}
          data={data}
          addAddOns={this.addAddOns}
          admin={admin}
          combinedServices={this.state.$$combinedServices}
          bookingNotes={this.state.bookingNotes}
          updateServices={this.updateServices}
        />),
      )
    }

    return (
      <section className={css.bookingsSection}>
        <div style={{display: isFetching ? '' : 'none'}} id={css.loader}>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          component="section"

        >
          {bookingNodes}
        </ReactCSSTransitionGroup>
        <section className={css.checkoutSection}>
          <Script
            url="https://js.stripe.com/v3/"
            onError={this.handleScriptError.bind(this, 'stripe')}
            onLoad={this.handleScriptLoad.bind(this, 'stripe')}
          />
          {stripeNode}
        </section>
        <Script
          url="https://code.jquery.com/jquery-2.1.1.min.js"
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this, 'jquery')}
        />
      </section>
    );
  }
}
export default withCookies(BookingsComponent);