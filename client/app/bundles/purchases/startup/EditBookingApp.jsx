import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import EditBookingContainer from '../containers/EditBookingContainer';
import { CookiesProvider } from 'react-cookie';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('commentsStore');
  return (
    <Provider store={store}>
      <CookiesProvider>
        <EditBookingContainer props={_props} />
      </CookiesProvider>
    </Provider>
  );
};