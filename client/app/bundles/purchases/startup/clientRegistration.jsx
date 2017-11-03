import ReactOnRails from 'react-on-rails';

import App from './App';

import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';


ReactOnRails.setOptions({
  traceTurbolinks: process.env.TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,

});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
