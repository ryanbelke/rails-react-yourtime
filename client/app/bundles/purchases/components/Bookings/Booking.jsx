import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';
import css from './Booking.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Booking extends BaseComponent {
  static propTypes = {
    workplaceName: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
    service: PropTypes.object.isRequired,
  };
/*  constructor(props) {
    super(props);
    _.bindAll(this, 'selectCategory');
  }

  selectCategory() {
    const { actions } = this.props;
    const categoryId = this.props.categoryId;
    actions.selectCategory(categoryId);
  }*/

  render() {
    let { workplaceName, categoryName,
      locationName, sectionName, service } = this.props;

    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    console.log("service = " + service )
    /* eslint-disable react/no-danger */
    return (
      <section className={css.booking}>
        <div className="paper-no-border">
          <div className="css-flash">
            <div className="icon-div-info">
              <i className="fa fa-info" aria-hidden="true"></i>
            </div>
            <div className="flash-text">
              <h6>Booking Info:</h6>
            </div>
          </div>
          <div className="form-info">
            <span className="form-header">Workplace:</span>
            <span className="form-text"> {workplaceName} </span>
          </div>
          <div className="form-info">
            <span className="form-header">Location:</span>
            <span className="form-text"> {locationName}</span>
          </div>

          <div className="form-info">
            <span className="form-header">Category:</span>
            <span className="form-text"> {categoryName}</span>
          </div>
          <div className="form-info">
            <span className="form-header">Service Section:</span>
            <span className="form-text"> {sectionName} </span>
          </div>
          <div className="form-info">
            <span className="form-header">Service: </span>
            <span className="form-text">{service.get('service_name')}</span>
          </div>
          <div className="form-info">
            <span className="form-header">Price: </span>
            <span className="form-text"> ${service.get('service_price')}</span>
          </div>
          <div className="form-info">
            <span className="form-header">Vendor: </span>
            <span className="form-text">{service.get('service_vendor')} </span>
          </div>
          <div className="form-info">
            <span className="form-header">Time Frame: </span>
            <span className="form-text">{service.get('service_time_to_complete')}</span>
          </div>
        </div>
        <br />
        <div className="paper-no-border">
          <div className="css-flash-cost">
            <div className="icon-div-dollar">
              <i className="fa fa-credit-card" aria-hidden="true"></i>

            </div>
            <div className="flash-text">
              <h6>Booking Cost:</h6>
            </div>
          </div>
          <div className="form-info">
            <span className="form-header">Price </span>
            <span className="form-text"> $ </span>
          </div>
          <div className="form-info">
            <span className="form-header">Estimate Tax: </span>
            <span className="form-text"> </span>
          </div>
          <div className="form-info">
            <span className="form-header">YourTime Fee: </span>
            <span className="form-text">  </span>
          </div>
          <div className="form-info">
            <span className="form-header">Estimated Total </span>
            <span className="form-text">  </span>
          </div>
          <div className="form-info">
            <span className="form-header">Discount Code:</span>
            <span className="form-text">

            <small>submit at checkout</small>

            <span>

            </span>

          </span>
          </div>
          <div className="form-info">
            <span className="form-header">Time Frame: </span>
            <span className="form-text">

          </span>
          </div>
        </div>
      </section>

    );
  }
}
