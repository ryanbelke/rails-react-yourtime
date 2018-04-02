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

//FETCH AND SELECT SECTIONS AFTER LOCATION IS SLEECTED
export function fetchSections(section) {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      //make a request conserving the workplace=id that is set from the home screen
      //sets state: $$categories = list of the categories
      request
        .get('sections.json', { responseType: 'json' })
        .then(res => dispatch(fetchSectionsSuccess(res.data)))
        .catch(error => dispatch(fetchSectionsFailure(error)))
    );
  };
}
export function fetchSectionsSuccess(data) {
  return {
    type: actionTypes.FETCH_SECTIONS_SUCCESS,
    $$sections: data.sections,
  };
}
export function fetchSectionsFailure(error) {
  return {
    type: actionTypes.FETCH_SECTIONS_FAILURE,
    error,
  };
}
export function selectSection(section) {
  return {
    type: actionTypes.SELECT_SECTION,
    sectionSelection: section,
  }
}

//FETCH AND SELECT SERVICES AFTER SECTION IS SELECTED
export function fetchServices(service) {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      //make a request conserving the workplace=id that is set from the home screen
      //sets state: $$categories = list of the categories
         requestsManager.submitEntity(service)
        .then(res => dispatch(fetchServicesSuccess(res.data)))
        .catch(error => dispatch(fetchServicesFailure(error)))
    );
  };
}
export function fetchServicesSuccess(data) {
  return {
    type: actionTypes.FETCH_SERVICES_SUCCESS,
    $$services: data.services,
  };
}
export function fetchServicesFailure(error) {
  return {
    type: actionTypes.FETCH_SERVICES_FAILURE,
    error,
  };
}
export function selectService(service) {
  return {
    type: actionTypes.SELECT_SERVICE,
    serviceSelection: service,
  }
}

//FETCH AND SELECT BOOKINGS
export function fetchBookings(service) {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      //make a request conserving the workplace=id that is set from the home screen
      //sets state: $$categories = list of the categories
        requestsManager.postBooking(service)
        .then(res => dispatch(fetchBookingsSuccess(res.data)))
        .catch(error => dispatch(fetchBookingsFailure(error)))
    );
  };
}
export function fetchBookingsSuccess(data) {
  return {
    type: actionTypes.FETCH_BOOKINGS_SUCCESS,
    $$bookings: data.bookings,
  };
}

export function fetchBookingsFailure(error) {
  return {
    type: actionTypes.FETCH_BOOKINGS_FAILURE,
    error,
  };
}

export function selectBooking(booking) {
  return {
    type: actionTypes.SELECT_BOOKING,
    bookingSelection: booking,
  }
}