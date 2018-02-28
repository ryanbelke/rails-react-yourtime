/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/checkoutConstants';

export const $$initialState = Immutable.fromJS({
  isFetching: false,
  isSaving: false,
  $$categories: [],
  $$locations: [],
  $$sections: [],
  category: '',
  locationSelection: '',
  selected: false,

});

export default function commentsReducer($$state = $$initialState, action = null) {
  const { category, type, comment, comments, error,
     $$categories, $$locations, locationSelection, $$sections,
     sectionSelection } = action;

  switch (type) {
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

    default: {
      return $$state;
    }
  }
}
