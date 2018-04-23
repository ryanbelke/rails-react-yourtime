import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import _ from 'lodash';
import Immutable from 'immutable';
import css from './Checkout.scss';
import InjectedCheckoutForm from './CheckoutForm';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Checkout extends BaseComponent {
  static propTypes = {
    totalPrice: PropTypes.number.isRequired,
    totalTax: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  };


  render() {
    let { totalPrice, totalTax, loading, yourTimeFee, props } = this.props;
    let checkOutNodes, checkoutForm;
    let user = props.props.railsHelpers.user;
    let checkoutTotal = parseFloat(totalPrice) + parseFloat(totalTax) + parseFloat(yourTimeFee);
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    let loadingIcon = (
      <div style={{display: this.props.loading ? '' : 'none'}} id={css.loader}>
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

    if(user)  {
      checkoutForm = (
        <Elements>
          <InjectedCheckoutForm/>
        </Elements>
      );
     }

    /* eslint-disable react/no-danger */
    return (
      <div className="row" id={css.row}>
        <div className="col l16 m6 s12 offset-l4 offset-m6">
          <div className={css.checkout}>
            <div className="paper-no-border">
              <div className="css-flash-cost">
                <div className="icon-div-dollar">
                  <i className="fas fa-dollar-sign" aria-hidden="true"></i>
                </div>
                <div className="flash-text">
                  <h6>Total Cost:</h6>
                </div>
              </div>
              <div className="form-info">
                <span className="form-header">Estimate Tax: </span>
                <span className="form-text">{loading ? loadingIcon : '$' + totalTax.toFixed(2) } </span>
              </div>
              <div className="form-info">
                <span className="form-header">YourTime Fee: </span>
                <span className="form-text">{loading ? loadingIcon : '$' + yourTimeFee.toFixed(2) }</span>
              </div>
              <div className="form-info">
                <span className="form-header">Estimated Total </span>
                <span className="form-text">{loading ? loadingIcon : '$' + checkoutTotal.toFixed(2)} </span>
              </div>
              <div className="form-info">
                <span className="form-header">Discount Code:</span>
                <span className="form-text">
                 <small>submit at checkout</small>
                </span>
              </div>
            </div>
            <br />
            {user ?
              <div className="paper-no-border">
                <div className={`${css.flash} center-align vertical-align`}>
                  <div className={css.icon}>
                    <i className="fas fa-credit-card" aria-hidden="true"></i>
                  </div>
                  <div className={css.text}>
                    <h6>Credit Card</h6>
                  </div>
                </div>
                <div className="form-info" style={{background: '#E6EBF1'}}>
                  <div className={css.stripeForm}>
                    <label htmlFor={css.textarea}>Anything we should know before hand? </label>

                    <textarea placeholder="booking notes"
                              id={css.textarea}
                              className="materialize-textarea"
                              style={{
                                backgroundColor: 'white', padding: 10,
                                height: 60, width: '95%', borderRadius: 5,
                                borderBottom: '1px solid gray'
                              }}
                    />
                  </div>
                </div>
                <div className="form-info" style={{background: '#E6EBF1' }}>
                  <div className={css.stripeForm}>
                    {checkoutForm}
                  </div>
                  <br />
                </div>
                <div className="form-info" style={{background: '#E6EBF1', paddingTop: 30}}>
                  <div className={css.stripeForm} id={css.alert}>
                    <div className={css.leftAlert}>
                      <i class="fas fa-exclamation-circle fa-2x"></i>
                    </div>
                    <div className={css.rightAlert}>
                      <div>
                        YourTime does not charge card at time of booking, only
                        after service has been completed on day of booking.
                      </div>
                    </div>
                  </div>
                </div>
              </div> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

