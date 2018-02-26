import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';
import { logger } from 'redux-logger';

export default (props, railsContext) => {

  const initialComments = props.comments;
  const categories = props.categories;
  const { $$commentsState } = initialStates;
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      //$$comments: initialComments,
      //get categories

      railsContext: railsContext,
    }),
    railsContext,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware, logger),
  );

  return composedStore(createStore)(reducer, initialState);
};
