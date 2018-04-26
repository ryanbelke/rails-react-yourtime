import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';
import { CardElement, CardNumberElement } from 'react-stripe-elements';
import css from './CardSection.scss';

class CardSection extends BaseComponent {
  render() {
    let disabled = this.props.disabled;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    let loadingIcon = (
      <div style={{display: disabled ? '' : 'none'}} id={css.loader}>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div className={css.form}>
          <label htmlFor="card-element">
            Credit or debit card
          </label>
          {!disabled ? null : loadingIcon }
          <form action="/charge" method="post" id="payment-form">
            <div className={css.overlay} style={{
              zIndex: disabled ? 100 : 0
            }}>
              <fieldset style={{ border: 'none' }} disabled={this.props.disabled}>
                <div className="form-row">
                  <div className={css.card} style={{ visibility: disabled ?  'hidden' : null}} id="card-element">
                    <CardElement style={{base: {fontSize: '18px' }}} />
                  </div>
                  <button style={{visibility: disabled ? 'hidden' : null }}
                          id={css.submit}>
                    Confirm order
                  </button>
                  {this.props.stripeError ?
                  <div>{this.props.stripeError}</div> : null
                  }
                  <div id="card-errors" role="alert"></div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CardSection;