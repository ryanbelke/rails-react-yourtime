import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import BaseComponent from 'libs/components/BaseComponent';


import * as commentsActionCreators from '../actions/commentsActionCreators';



function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

class Categories extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/



    return (
      <div>
        Category
      </div>
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(CheckoutContainer);