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
  }

  render() {
    let { data, actions, props } = this.props;

    return (
      <div className="editBookings">
        <BookingsComponent props={this.props} actions={actions} data={data}
                           booking={props.booking} edit={true}
        />
      </div>
    )
  }
}