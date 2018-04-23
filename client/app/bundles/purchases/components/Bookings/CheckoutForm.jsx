import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';
import { injectStripe } from 'react-stripe-elements';
import request from 'axios';
import requestsManager from 'libs/requestsManager';
import CardSection from './CardSection';

class CheckoutForm extends BaseComponent {
  authenticityToken = () => {
  let token = document.querySelector('meta[name="csrf-token"]');
  if (token && token instanceof window.HTMLMetaElement) {
    return token.content.toString();
  }
  return null;
};

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    console.log("rails token = " + this.authenticityToken());
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'customer'}).then(({token}) => {
      console.log('Received Stripe token:', token);
      let url = window.location.href.replace('/new', '');

         requestsManager.createBooking(url, token.id, this.authenticityToken())
        .then((response) => response.data.status == 302 ?
          window.location.replace('/') : console.log("booking not complete"))
        .catch((error) => console.log(error))
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    return (
      <div onSubmit={this.handleSubmit}>
        <CardSection />
      </div>
    );
  }
}
export default injectStripe(CheckoutForm);