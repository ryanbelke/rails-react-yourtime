import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Categories from '../components/Categories/Categories';
import Locations from '../components/Locations/Locations';
import SectionsComponent from '../components/Sections/SectionsComponent';
import ServicesComponent from '../components/Services/ServicesComponent';
import BookingsComponent from '../components/Bookings/BookingsComponent';

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
    const {dispatch, data} = this.props;
    const actions = bindActionCreators(checkoutActionCreator, dispatch);
    const location = data.getIn(['railsContext', 'location']);
    const lastCharacter = location.substr(location.length - 1);

    let renderNode;
    //const locationState = this.props.location;
    if (location.includes('workplaces')) {
      renderNode = <Categories actions={actions} data={data}/>
    } else if (location.includes('categories')) {
      renderNode = <Locations actions={actions} data={data}/>
    } else if (location.includes('locations')) {
      renderNode = <SectionsComponent actions={actions} data={data}/>
    } else if (location.includes('sections') && !location.includes('?appointment')) {
      renderNode = <ServicesComponent actions={actions} data={data}/>
    } else if (location.includes('/services/booking') || location.includes('/bookings/new')) {
      renderNode = <BookingsComponent actions={actions} data={data} />
    }

    return (
      <section>
        {renderNode}
      </section>
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(CheckoutContainer);