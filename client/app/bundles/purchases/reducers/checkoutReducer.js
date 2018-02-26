import Immutable from 'immutable';
import * as actionTypes from '../constants/checkoutConstants';


export default function checkoutReducer($$state = $$initialState, action = null) {
  const { type, error } = action;

  //switch based on the type of action received
  switch (type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return $$state.merge({
        $$categories: 'success',
        fetchCategoriesError: null,
        isFetching: false,
      });
    }

    case actionTypes.FETCH_CATEGORIES_FAILURE: {
      return $$state.merge({
        fetchCategoriesError: error,
        isFetching: false,
      });
    }
    case actionTypes.SELECT_CATEGORY: {
      return $$state.merge({
        category: category,
      });
    }
    //return a default state
    default: {
      return $$state;
    }
  }
}