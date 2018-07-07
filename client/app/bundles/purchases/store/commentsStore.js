import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';
import { logger } from 'redux-logger';

export default (props, railsContext) => {

  const { $$commentsState } = initialStates;
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      railsContext: railsContext,
    }),
    railsContext,
  };

  const reducer = combineReducers(reducers);
  let composedStore;
  if (window.navigator.userAgent.includes('Chrome')) {
    composedStore = compose(
      applyMiddleware(thunkMiddleware, loggerMiddleware, logger),
      //enable the store to be viewable for redux dev tools chrome extension
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    composedStore = compose(
      compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware, logger),
      )
    );
  }

  return composedStore(createStore)(reducer, initialState);
};
