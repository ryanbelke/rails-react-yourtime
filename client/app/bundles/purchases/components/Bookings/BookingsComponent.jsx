import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import { withCookies, Cookies } from 'react-cookie';
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
    };
    _.bindAll(this, 'fetchBookings');
  }

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings() {
    const  { data, actions, cookies } = this.props;
    const serviceList = Immutable.List(cookies.get('services'));
    const addOnList = Immutable.List(cookies.get('addOns'));
    console.log("serviceList = " + addOnList);
    let pathname = data.getIn(['railsContext', 'pathname']);
    actions.fetchBookings();
    //actions.fetchBookingServices(serviceList.get(0))

    serviceList.forEach(($$service) => {
      requestsManager
        .postService($$service)
        .then(res => this.setState(({$$bookingServices}) => ({
          $$bookingServices: $$bookingServices.push(Immutable.fromJS(res.data)),
        })))
        .catch(error => this.setState({ error: error }));
    })
    addOnList.forEach(($$addOn) => {
      requestsManager
        .postService($$addOn)
        .then(res => this.setState(({$$bookingAddOns}) => ({
          $$bookingAddOns: $$bookingAddOns.push(Immutable.fromJS(res.data)),
        })))
        .catch(error => this.setState({ error: error }));
    })
  }
  render() {
    const  { data, actions }   = this.props;
    let bookingNodes;
    const isFetching = data.get('isFetching');
    const bookings = Immutable.fromJS(data.get('$$bookings'));
    let bookingServices = this.state.$$bookingServices;
    let bookingAddOns = this.state.$$bookingAddOns;
    // const bookings = this.state.$$bookings.getIn(['0', 'bookings']);
    //const selected = data.get('selected');
    //let bookingSelection = data.get('serviceSelection');
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
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
              //selected={selected}
              //serviceSelection={serviceSelection}
              actions={actions}
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
            </ReactCSSTransitionGroup>
        {bookingNodes}

        <section className={css.checkoutSection}>

              <Checkout />

        </section>
      </section>
    );
  }
}
export default withCookies(BookingsComponent);