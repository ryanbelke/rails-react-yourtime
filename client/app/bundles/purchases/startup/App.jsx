import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import CheckoutContainer from '../containers/CheckoutContainer';
import { CookiesProvider } from 'react-cookie';
export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('commentsStore');

  return (
    <Provider store={store}>
      <CookiesProvider>
        <CheckoutContainer />
      </CookiesProvider>
    </Provider>
  );
};
