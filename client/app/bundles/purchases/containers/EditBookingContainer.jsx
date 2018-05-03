import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import EditBooking from '../components/Bookings/EditBooking/EditBooking';
import * as checkoutActionCreator from '../actions/checkoutActionCreator';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

class EditBookingContainer extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {dispatch, data} = this.props;
    const actions = bindActionCreators(checkoutActionCreator, dispatch);

    return (
      <EditBooking actions={actions} {...this.props} />
    )
  }
}
export default connect(select)(EditBookingContainer);