import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Categories from '../components/Categories/Categories';


import BaseComponent from 'libs/components/BaseComponent';


import * as checkoutActionCreator from '../actions/checkoutActionCreator';



function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

class CheckoutContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
/*    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,*/

  };


  render() {
   const { dispatch, data } = this.props;
   const actions = bindActionCreators(checkoutActionCreator, dispatch);
    //const locationState = this.props.location.state;

    return (
      <section>
        <Categories actions={actions} data={data} />
      </section>
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(CheckoutContainer);