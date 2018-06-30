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
  constructor(props) {
    super(props);
    this.state = {
      bookingMessage: '',
      discount: '',
    };
    _.bindAll(['onChange'])
  }

  onChange(name, event) {
    if(name == 'discount') {
      this.setState({ [name]: event.target.value.toUpperCase() })
    }
    if(name == 'bookingMessage') {
      this.setState({ [name]: event.target.value })
      this.props.bookingNotes(event.target.value)
    }
  }
  componentDidMount() {
    let bookingMessage = this.props.bookingMessage;
    bookingMessage ? this.setState({ bookingMessage: bookingMessage }) : null
  }
  render() {
    let { totalPrice, totalTax, loading, yourTimeFee, props, discountError, discountMessage, edit, bookingMessage } = this.props;
    let checkOutNodes, checkoutForm, discountButton;
    let user = props.props.railsHelpers.user;
    let checkoutTotal = parseFloat(totalPrice) + parseFloat(totalTax) + parseFloat(yourTimeFee);
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    let showDiscount = this.props.showDiscount;
    let loadingIcon = (
      <span style={{display: this.props.loading || !showDiscount ? '' : 'none', top: 2 }} id={css.loader}>
        <div className="preloader-wrapper small active" style={{ height: 23, width: 23 }}>
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
      </span>
    );

    if(showDiscount) {
        discountButton = <button style={{ visibility: showDiscount ? 'visible' : 'hidden'  }}
                                 onClick={() => this.props.checkDiscount(this.state.discount)}
                                 id={css.discountButton}>
          Enter
        </button>
      } else { discountButton = loadingIcon }

    if(user)  {
      checkoutForm = (
        <Elements>
          <InjectedCheckoutForm bookingMessage={this.state.bookingMessage} discount={this.state.discount} />
        </Elements>
      );
     }
    /* eslint-disable react/no-danger */
    return (
      <div className="row" id={css.row}>
        <div className="col l16 m6 s12 offset-l4 offset-m6">
          <div className={css.checkout}>
            <div className="paper-no-border" >
              <div className={`${css.flashTop} center-align vertical-align`}>
                <div className={css.iconTop}>
                  <i className="fas fa-dollar-sign" aria-hidden="true"></i>
                </div>
                <div className={css.text}>
                  <h6>Total Cost:</h6>
                </div>
              </div>
              <div className="form-info" style={{background: '#E6EBF1'}}>
                <span className={`form-text ${css.formHeader}`}>Estimate Tax: </span>
                <span className={`form-text ${css.checkoutText}`}>{loading ? loadingIcon : '$' + totalTax.toFixed(2) } </span>
              </div>
              <div className="form-info" style={{background: '#E6EBF1'}}>
                <span className={`form-text ${css.formHeader}`}>YourTime Fee: </span>
                <span className={`form-text ${css.checkoutText}`}>{loading ? loadingIcon : '$' + yourTimeFee.toFixed(2) }</span>
              </div>
              <div className="form-info" style={{background: '#E6EBF1'}}>
                <span className={`form-text ${css.formHeader}`}>Estimated Total </span>
                <span className={`form-text ${css.checkoutText}`}>{loading ? loadingIcon : '$' + checkoutTotal.toFixed(2)} </span>
              </div>
              {!edit ?
                <div className="form-info" style={{background: '#E6EBF1', paddingTop: 10, height: 85 }}>
                  <span className="form-header">Discount Code:</span>
                  <span className="form-text">
                  {user ?
                    <span>
                        <input type="text"
                               name="discount"
                               value={this.state.discount}
                               className={css.textInput}
                               onChange={this.onChange.bind(this, 'discount')}

                        />
                        <ReactCSSTransitionGroup
                          transitionName={cssTransitionGroupClassNames}
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}
                          component="span"

                        >
                        {discountButton}
                        </ReactCSSTransitionGroup>
                        <div id={css.discountMessage}
                             style={{ display: discountMessage ? 'inline-block' : 'none' }}>
                          {this.props.discountMessage}
                          </div>

                        <div id={css.discountError}
                             style={{ display : discountError ? 'inline-block' : 'none'}}>
                           {this.props.discountError}
                        </div>
                      </span>
                    : <small>submit at checkout</small>
                  }
                </span>
                </div>
                :
                null
              }
              {user ?
                <div className="form-info" style={{background: '#E6EBF1'}}>
                  <div className={css.stripeForm}>
                    <label htmlFor={css.textarea}>Anything we should know before hand? </label>

                    <textarea placeholder="please include any notes you would like us to know"
                              id={css.textarea}
                              className="materialize-textarea"
                              onChange={this.onChange.bind(this, 'bookingMessage')}
                              value={this.state.bookingMessage}
                              name="bookingMessage"
                              style={{
                                backgroundColor: 'white', padding: 10,
                                height: 60, width: '95%', borderRadius: 5,
                                borderBottom: '1px solid gray' }}
                    />
                  </div>
                </div> : null
              }
            </div>
            <br />
            { user && !edit ?
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
                      <i className="fas fa-exclamation-circle fa-2x"></i>
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

