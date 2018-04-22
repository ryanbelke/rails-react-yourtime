import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';
import { CardElement, CardNumberElement } from 'react-stripe-elements';
import css from './CardSection.scss';

class CardSection extends BaseComponent {
  render() {
    return (
      <div>
        <div className={css.form}>
          <label htmlFor="card-element">
            Credit or debit card
          </label>
          <form action="/charge" method="post" id="payment-form">
            <div className="form-row">
              <div className={css.card} id="card-element">
                <CardElement style={{base: {fontSize: '18px'}}} />
              </div>
              <button id={css.submit}>Confirm order</button>

              <div id="card-errors" role="alert"></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CardSection;