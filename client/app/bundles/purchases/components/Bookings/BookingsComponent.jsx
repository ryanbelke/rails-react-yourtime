import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import { withCookies, Cookies } from 'react-cookie';
import {StripeProvider} from 'react-stripe-elements';
import Script from 'react-load-script'
import Booking from './Booking';
import css from './BookingsComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkout from './Checkout';
import requestsManager from 'libs/requestsManager';

class BookingsComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$bookings: Immutable.fromJS([]),
      fetchBookingsError: null,
      isFetching: false,
      $$bookingServices: Immutable.fromJS([]),
      $$bookingAddOns: Immutable.fromJS([]),
      totalCost: 0,
      totalTax: 0,
      yourTimeFee: 0,
      checkoutLoading: true,
      scriptLoaded: false,
      scriptError: null,
      showDiscount: true,
      discountError: null,
      discountMessage: null,
      discountPrice: null,

    };
    _.bindAll(this, ['fetchBookings', 'fetchServices',
                      'calculateTotal', 'handleScriptError',
                      'handleScriptLoad']);
    this.checkDiscount = this.checkDiscount.bind(this);
  }

  componentDidMount() {
    this.fetchBookings()
      .then(() => this.fetchServices())
      .then(() => this.fetchAddOns())
      .then(() => this.calculateTotal());
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.setState({ stripeKey: "pk_test_5yOGF65rhzZjobGYiOoYJoj0"});
    } else {
      this.setState({ stripeKey: "pk_live_WSJt2zrFYytVOVNhNJUezCKx"});
    }
  }
  fetchBookings() {
    const  { actions, cookies } = this.props;
    //let pathname = data.getIn(['railsContext', 'pathname']);
    //actions.fetchBookingServices(serviceList.get(0))
    return new Promise((resolve, reject) => {
      console.log("fetching bookings");
      if (cookies.get('location') != null || undefined)
        {
          this.props.actions.fetchBookings();
          resolve();
        } else {
          reject("location not found");
      }
    })
  }
  fetchServices() {
    console.log("fetching services");

    return new Promise((resolve, reject) => {
      const { cookies } = this.props;
      const serviceList = Immutable.List(cookies.get('services'));
      if (serviceList.size != 0) {
        serviceList.forEach(($$service) => {
          requestsManager
            .postService($$service)
            .then(res => this.setState(({$$bookingServices}) => ({
              $$bookingServices: $$bookingServices.push(Immutable.fromJS(res.data)),
            })))
            .catch(error => this.setState({ error: error }));
        }, resolve());
      } else {
        reject("services not found")
      }
    })
  }
  fetchAddOns() {
    const { cookies } = this.props;
    const addOnList = Immutable.List(cookies.get('addOns'));
    return new Promise((resolve, reject) => {
      console.log("fetching add ons");
      if(addOnList.size > 0) {
        addOnList.forEach(($$addOn) => {
          requestsManager
            .postService($$addOn)
            .then(res => this.setState(({$$bookingAddOns}) => ({
              $$bookingAddOns: $$bookingAddOns.push(Immutable.fromJS(res.data)),
            })))
            .catch(error => this.setState({ error: error }));
        }, resolve());
      } else {
        resolve("no add on lists selected")
      }
    })
  }
  calculateTotal(discountPrice) {
    let { totalCost, totalTax, yourTimeFee, $$bookingServices, $$bookingAddOns } = this.state;
    let x = 0;

    console.log('calculating total ' + $$bookingServices);
      if ($$bookingServices.size == 0) {
        (() => {
          setTimeout(() => {
            if($$bookingServices.size === 0 && x < 3) {
              setTimeout(() => { console.log("RETRYING "); this.calculateTotal() }, 1000);
              x++;
            }
          }, 1000)
        })()
      } else {
        $$bookingServices.forEach(($booking) => {
          if ($booking.getIn(['service', 'service_price']) != null) {
            this.setState((prevState, props) => {
              return {
                totalCost: totalCost += parseFloat($booking.getIn(['service', 'service_price'])),
                totalTax: totalTax += parseFloat($booking.getIn(['service', 'service_tax'])),
                checkoutLoading: false,
                yourTimeFee: yourTimeFee += (parseFloat($booking.getIn(['service', 'service_price'])) *
                  parseFloat($booking.getIn(['service', 'yourtime_fee'])))
                }}
              )}
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
              }})}
        });
      }
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  checkDiscount(discount) {
    let { discountPrice, totalCost, showDiscount, discountMessage, discountError, props } = this.state;
    let current_user = this.props.props.props.railsHelpers.current_user;

    this.setState({ checkoutLoading: true });

    this.setState({ showDiscount: false });
    requestsManager.checkDiscount(discount, current_user)
      .then((res) => res.data.status == 403 ? this.setState({ showDiscount: true,
          discountError: res.data.message, discountMessage: false, discountPrice: null, checkoutLoading: false })
      : setTimeout(() => {
            this.setState((prevState) => {
              return {
                showDiscount: true, discountMessage: "Discount Applied", discountError: false,
                discountPrice: res.data.discount.discount_price, totalCost: totalCost -= res.data.discount.discount_price,
                checkoutLoading: false }
            })
          }, 1000)
      )
      .catch((error) => this.setState({ showDiscount: true, discountError: error, checkoutLoading: false }));
  }

  render() {
    const  { data, actions, props, edit }   = this.props;
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
    this.state.scriptLoaded ?
        stripeNode = (
          <StripeProvider apiKey={this.state.stripeKey}>
            <Checkout totalPrice={this.state.totalCost}
                      totalTax={this.state.totalTax}
                      loading={this.state.checkoutLoading}
                      yourTimeFee={this.state.yourTimeFee}
                      props={props}
                      showDiscount={this.state.showDiscount}
                      checkDiscount={this.checkDiscount}
                      discountMessage={this.state.discountMessage}
                      discountError={this.state.discountError}
                      edit={edit}
            />
          </StripeProvider>
        )
    :
    null;

    if(bookings != null || undefined) {
      bookingNodes = bookings.map(($$booking, index) =>
            (<Booking
              key={$$booking.get('bookingId') || index }
              workplaceName={$$booking.get('workplaceName')}
              categoryName={$$booking.get('categoryName')}
              locationName={$$booking.get('locationName')}
              sectionName={$$booking.get('sectionName')}
              services={bookingServices}
              addOns={bookingAddOns}
              dates={$$booking.get('dates')}
              actions={actions}
              //selected={selected}
              //serviceSelection={serviceSelection}
              //bookingId={sectionId}
            />),
        )
    }

    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <section className={css.bookingsSection}>
        <div style={{display: isFetching ? '' : 'none'}} id={css.loader}>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
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
              onError={this.handleScriptError.bind(this)}
              onLoad={this.handleScriptLoad.bind(this)}
            />
            {stripeNode}
          </section>

      </section>
    );
  }
}
export default withCookies(BookingsComponent);