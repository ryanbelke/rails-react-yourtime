import commentsReducer, { $$initialState as $$commentsState } from './commentsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';
import railsHelpersReducer, { initialState as railsState } from './railsHelpersReducer';
export default {
  $$commentsStore: commentsReducer,
  railsContext: railsContextReducer,
  railsHelpers: railsHelpersReducer,
};

export const initialStates = {
  $$commentsState,
  railsContextState,
  railsState,
};
