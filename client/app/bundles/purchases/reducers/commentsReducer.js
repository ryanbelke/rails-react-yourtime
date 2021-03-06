/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/checkoutConstants';

export const $$initialState = Immutable.fromJS({
  $$editWorkplace: {},
  $$editCategory: {},
  $$editLocation: {},
  $$editServices: [],
  $$editAddOns: [],
  $$workplaces: [],
  $$categories: [],
  $$locations: [],
  $$sections: [],
  $$services: Immutable.Set([]),
  $$bookings: [],
  $$bookingServices: [],
  category: '',
  locationSelection: '',
  selected: false,
  $$serviceSelection: [],
  resetServices: false,
  isFetching: false,
  isSaving: false,
});

export default function commentsReducer($$state = $$initialState, action = null) {
  const { category, type, comment, comments, error, $$workplaces, workplaceSelection,
     $$categories, $$locations, locationSelection, $$sections,
     sectionSelection, $$services, serviceSelection, $$bookings, $$bookingServices,
     $$editWorkplace, $$editCategory, $$editLocation,data } = action;

  switch (type) {
    case actionTypes.FETCH_WORKPLACES_SUCCESS: {
      return $$state.merge({
        $$workplaces: $$workplaces,
        fetchWorkplacesError: null,
        isFetching: false,
      });
    }
    case actionTypes.FETCH_WORKPLACES_FAILURE: {
      return $$state.merge({
        fetchWorkplacesError: error,
        isFetching: false,
      });
    }
    case actionTypes.SELECT_WORKPLACE: {
      return $$state.merge({
        workplaceSelection: workplaceSelection,
        selected: true,
      });
    }

    case actionTypes.FETCH_CATEGORIES_SUCCESS: {
      return $$state.merge({
        $$categories: $$categories,
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
        selected: true,
      });
    }

    case actionTypes.FETCH_LOCATIONS_SUCCESS: {
      return $$state.merge({
        $$locations: $$locations,
        fetchLocationsError: null,
        isFetching: false,
      });
    }
    case actionTypes.FETCH_LOCATIONS_FAILURE: {
      return $$state.merge({
        fetchLocationsError: error,
        isFetching: false,
      });
    }
    case actionTypes.SELECT_LOCATION: {
      return $$state.merge({
        locationSelection: locationSelection,
        selected: true,
      });
    }

    case actionTypes.FETCH_SECTIONS_SUCCESS: {
      return $$state.merge({
        $$sections: $$sections,
        fetchSectionsError: null,
        isFetching: false,
      });
    }
    case actionTypes.FETCH_SECTIONS_FAILURE: {
      return $$state.merge({
        fetchSectionsError: error,
        isFetching: false,
      });
    }
    case actionTypes.SELECT_SECTION: {
      return $$state.merge({
        sectionSelection: sectionSelection,
        selected: true,
      });
    }

    case actionTypes.FETCH_SERVICES_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$services'],
            $$services => $$services.unshift(Immutable.fromJS($$services)),
          )
          .merge({
            isFetching: false,
            fetchServicesError: null,
          })
      ));
    }

    case actionTypes.FETCH_SERVICES_FAILURE: {
      return $$state.merge({
        fetchServicesError: error,
        isFetching: false,
      });
    }
/*    case actionTypes.SELECT_SERVICE: {
      return $$state.merge({
        serviceSelection: serviceSelection,
        selected: true,
      });
    }*/
    case actionTypes.SELECT_SERVICE: {
      return $$state.withMutations(state => (
        state
          .push(
            ['$$servicesSelection'],
            serviceSelection,
          )
          .merge({
        //serviceSelection: serviceSelection,
        selected: true,
      })));
    }
    case actionTypes.FETCH_BOOKINGS_SUCCESS: {
      return $$state.merge({
        $$bookings: $$bookings,
        fetchBookingsError: null,
        isFetching: false,
      });
    }
/*    case actionTypes.FETCH_BOOKINGS_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .setIn(
            ['$$bookings'],
            action.$$bookings.concat("hello"),
          )
          .merge ({
            fetchBookingsError: null,
            isFetching: false,
          })
      ));
    }*/
    case actionTypes.FETCH_BOOKING_SERVICES_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .setIn(
            ['$$bookingServices'],
          data.service
          )
          .merge ({
            fetchBookingServicesError: null,
            isFetching: false,
          })
      ));
    }
    case actionTypes.FETCH_BOOKINGS_FAILURE: {
      return $$state.merge({
        fetchBookingsError: error,
        isFetching: false,
      });
    }
    case actionTypes.SELECT_BOOKING: {
      return $$state.merge({
        bookingSelection: bookingSelection,
        selected: true,
      });
    }
    case actionTypes.RESET_SERVICES: {
      return $$state.merge({
        resetServices: true
      })
    }

    case actionTypes.FETCH_COMMENTS_SUCCESS: {
      return $$state.merge({
        $$comments: comments,
        fetchCommentError: null,
        isFetching: false,
      });
    }

    case actionTypes.FETCH_COMMENTS_FAILURE: {
      return $$state.merge({
        fetchCommentError: error,
        isFetching: false,
      });
    }

    case actionTypes.MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$comments'],
            $$comments => ($$comments.findIndex(com => com.get('id') === comment.get('id')) === -1 ? $$comments.unshift(Immutable.fromJS(comment)) : $$comments),
          )
      ));
    }

    case actionTypes.SUBMIT_COMMENT_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$comments'],
            $$comments => $$comments.unshift(Immutable.fromJS(comment)),
          )
          .merge({
            submitCommentError: null,
            isSaving: false,
          })
      ));
    }

    case actionTypes.SUBMIT_COMMENT_FAILURE: {
      return $$state.merge({
        submitCommentError: error,
        isSaving: false,
      });
    }

    case actionTypes.SET_IS_FETCHING: {
      return $$state.merge({
        isFetching: true,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return $$state.merge({
        isSaving: true,
      });
    }

    case actionTypes.SET_LOCALE: {
      return $$state.merge({
        locale,
      });
    }
    case actionTypes.GET_WORKPLACES_SUCCESS: {
      return $$state.merge({
        $$workplaces: $$workplaces,
        fetchWorkplacesError: null,
        isFetching: false,
      });
    }
    case actionTypes.GET_WORKPLACES_FAILURE: {
      return $$state.merge({
        fetchWorkplacesError: error,
        isFetching: false,
      });
    }
    //GET CATEGORIES OF SELECTED WORKPLACE
    case actionTypes.GET_CATEGORIES_SUCCESS: {
      return $$state.merge({
        $$categories: $$categories,
        fetchCategoriesError: null,
        isFetching: false,
      });
    }
    //FAIL TO GET CATEGORIES OF SELECTEDWORKPLACE
    case actionTypes.GET_CATEGORIES_FAILURE: {
      return $$state.merge({
        fetchCategoriesError: error,
        isFetching: false,
        $$categories: null,
      });
    }
    //GET CATEGORIES OF SELECTED WORKPLACE
    case actionTypes.GET_LOCATIONS_SUCCESS: {
      return $$state.merge({
        $$locations: $$locations,
        fetchLocationsError: null,
        isFetching: false,
      });
    }
    //FAIL TO GET CATEGORIES OF SELECTEDWORKPLACE
    case actionTypes.GET_LOCATIONS_FAILURE: {
      return $$state.merge({
        fetchLocationsError: error,
        isFetching: false,
        $$locations: null,
      });
    }
    //GET CATEGORIES OF SELECTED WORKPLACE
    case actionTypes.GET_SECTIONS_SUCCESS: {
      return $$state.merge({
        $$sections: $$sections,
        fetchSectionsError: null,
        isFetching: false,
      });
    }
    //FAIL TO GET CATEGORIES OF SELECTEDWORKPLACE
    case actionTypes.GET_SECTIONS_FAILURE: {
      return $$state.merge({
        fetchSectionsError: error,
        isFetching: false,
        $$sections: null,
      });
    }
    //GET SERVICES OF SELECTED LOCATION
    case actionTypes.GET_SERVICES_SUCCESS: {
      return $$state.merge({
        $$services: $$services,
        fetchServicesError: null,
        isFetching: false,
      });
    }
    //FAIL TO GET SERVICES OF LOCATION
    case actionTypes.GET_SERVICES_FAILURE: {
      return $$state.merge({
        fetchServicesError: error,
        isFetching: false,
        $$services: null,
      });
    }
    //edit workplace from edit booking page
    case actionTypes.SELECT_EDIT_WORKPLACE: {
      return $$state.merge({
        $$editWorkplace: $$editWorkplace
      });
    }
    //edit category from edit booking page
    case actionTypes.SELECT_EDIT_CATEGORY: {
      return $$state.merge({
        $$editCategory: $$editCategory
      });
    }
    //edit category from edit booking page
    case actionTypes.SELECT_EDIT_LOCATION: {
      return $$state.merge({
        $$editLocation: $$editLocation
      });
    }
    //selected services on edit booking page
    case actionTypes.SELECT_EDIT_SERVICES: {
      return $$state.withMutations(state => (
        //update $$services Set by calling slice(0, -1) to return everything
        //but the last value in the Set then add new selection
        state.updateIn(['$$services'], a => a.slice(0, -1).add($$services))
        //.merge({ resetServices: true })
      ))
    }
    case actionTypes.REMOVE_EDIT_SERVICES: {
      return $$state.withMutations(state => (
        state.updateIn(['$$services'], a => a.delete($$services))
          //.merge({ resetServices: true })
      ))
    }
/*
 state
 .updateIn(
 ['$$comments'],
 $$comments => $$comments.unshift(Immutable.fromJS(comment)),
 )
 .merge({
 submitCommentError: null,
 isSaving: false,
 })
 ));
return $$state.withMutations(state => (
 state
 .push(
 ['$$servicesSelection'],
 serviceSelection,
 )
 .merge({
 //serviceSelection: serviceSelection,
 selected: true,
 })));*/
    default: {
      return $$state;
    }
  }
}
