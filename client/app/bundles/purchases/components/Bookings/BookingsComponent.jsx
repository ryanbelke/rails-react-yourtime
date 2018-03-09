import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Booking from './Booking';
import css from './BookingsComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkout from './Checkout';

class BookingsComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$bookings: Immutable.fromJS([]),
      fetchBookingsError: null,
      isFetching: false,
    };
    _.bindAll(this, 'fetchBookings');
  }

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings() {
    const  { data, actions } = this.props;
    let pathname = data.getIn(['railsContext', 'pathname']);
    actions.fetchBookings(pathname);

  }
  render() {
    const  { data, actions }   = this.props;
    let bookingNodes;
    const isFetching = data.get('isFetching');
    const bookings = data.get('$$bookings');
    //const selected = data.get('selected');
    //let bookingSelection = data.get('serviceSelection');
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    if(bookings != null) {
      bookingNodes = bookings.map(($$booking, index) =>
        (<Booking
          key={$$booking.get('bookingId') || index }
          workplaceName={$$booking.get('workplaceName')}
          categoryName={$$booking.get('categoryName')}
          locationName={$$booking.get('locationName')}
          sectionName={$$booking.get('sectionName')}
          service={$$booking.get('service')}
          dates={$$booking.get('dates')}
          //selected={selected}
          //serviceSelection={serviceSelection}
          actions={actions}
          //bookingId={sectionId}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <section className={css.bookingsSection}>
        <section style={{display: isFetching ? '' : 'none'}} id={css.loader}>
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
        </section>
            <ReactCSSTransitionGroup
              transitionName={cssTransitionGroupClassNames}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {bookingNodes}
            </ReactCSSTransitionGroup>
        <section className={css.checkoutSection}>
          <div className="row">
            <div className="col l16 m6 s12 offset-l4 offset-m6">
              <Checkout />
            </div>
          </div>
        </section>
      </section>
    );
  }
}
export default BookingsComponent;