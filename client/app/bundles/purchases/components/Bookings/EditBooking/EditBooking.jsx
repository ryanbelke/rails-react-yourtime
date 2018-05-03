import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import css from './EditBooking.scss';
import bookingCss from '../Booking.scss';
import requestsManager from 'libs/requestsManager';
import Booking from '../../Bookings/Booking';
import BookingsComponent from '../BookingsComponent';

export default class EditBooking extends BaseComponent {
  constructor(props) {
  super(props);
  _.bindAll(['fetchBookings', 'fetchServices'])
  }
  componentDidMount() {
    const  { actions } = this.props;
    actions.fetchBookings();
  }

  fetchBookings() {

  }
  render() {
    let { data, actions, props } = this.props;
    //const bookings = Immutable.fromJS(data.get('$$bookings'));
    let bookingNodes;
    let services = props.booking.services;

/*    if(bookings != null || undefined) {
      bookingNodes = bookings.map(($$booking, index) =>
        (<Booking
          key={$$booking.get('bookingId') || index }
          workplaceName={$$booking.get('workplaceName')}
          categoryName={$$booking.get('categoryName')}
          locationName={$$booking.get('locationName')}
          sectionName={$$booking.get('sectionName')}
          //services={bookingServices}
          //addOns={bookingAddOns}
          dates={$$booking.get('dates')}
          actions={actions}
          //selected={selected}
          //serviceSelection={serviceSelection}
          //bookingId={sectionId}
        />),
      )
    }*/
    return (
      <div className="editBookings">
        <BookingsComponent props={this.props} actions={actions} data={data}
                           booking={props.booking} edit={true}
        />
      </div>
    )
  }
}