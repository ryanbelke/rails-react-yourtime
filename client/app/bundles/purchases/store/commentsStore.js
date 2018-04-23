import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';
import { logger } from 'redux-logger';

export default (props, railsContext, rails) => {

  const { $$commentsState } = initialStates;
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      railsContext: railsContext,
      rails: rails,
    }),
    railsContext,
    rails,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware, logger),
  );

  return composedStore(createStore)(reducer, initialState);
};
