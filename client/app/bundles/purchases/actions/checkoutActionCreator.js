import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/checkoutConstants';
import request from 'axios';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}
//fetch categories takes workplace as argument from location to get correct
//categories
export function fetchCategories(workplace) {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      //make a request conserving the workplace=id that is set from the home screen
      //sets state: $$categories = list of the categories
      request
        .get('categories.json' + '?' + 'workplace=' + workplace, { responseType: 'json' })
        .then(res => dispatch(fetchCategoriesSuccess(res.data)))
        .catch(error => dispatch(fetchCategoriesFailure(error)))
    );
  };
}
export function fetchCategoriesSuccess(data) {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    $$categories: data.categories,
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILURE,
    error,
  };
}

export function selectCategory(category) {
  return {
    type: actionTypes.SELECT_CATEGORY,
    category: category,
  }
}

export function fetchLocations(workplace) {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      //make a request conserving the workplace=id that is set from the home screen
      //sets state: $$categories = list of the categories
      request
        .get('locations.json', { responseType: 'json' })
        .then(res => dispatch(fetchLocationsSuccess(res.data)))
        .catch(error => dispatch(fetchLocationsFailure(error)))
    );
  };
}
export function fetchLocationsSuccess(data) {
  return {
    type: actionTypes.FETCH_LOCATIONS_SUCCESS,
    $$locations: data.locations,
  };
}

export function fetchLocationsFailure(error) {
  return {
    type: actionTypes.FETCH_LOCATIONS_FAILURE,
    error,
  };
}

export function selectLocation(location) {
  return {
    type: actionTypes.SELECT_LOCATION,
    locationSelection: location,
  }
}