import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';
import css from './Booking.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';

export default class Booking extends BaseComponent {
  static propTypes = {
    workplaceName: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
    service: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectDate');
  }

  selectDate() {
    let {dates} = this.props;
    let datesArray = [true];
    dates = dates.toArray();
    let date = dates.forEach((date, index) => {
       return datesArray.push(new Date(date.get(0)))

    });

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false, // Close upon selecting a date,
      disable: datesArray
    });
  }

  render() {
    let { workplaceName, categoryName,
      locationName, sectionName, service, dates } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    /* eslint-disable react/no-danger */
    return (
      <section className={css.booking}>
        <div className="row" id={css.row}>
          <div className="col l3 m6 s12 offset-l1">
            <div className="paper-no-border">
              <div className="css-flash">
                <div className="icon-div">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </div>
                <div className="flash-text">
                  <h6>Appointment Date</h6>
                </div>
              </div>
              <div className="date-selector">
                <form action="" acceptCharset="UTF-8" method="get">
                  <label className="active">Select a date</label>
                  <br />
                  <input onClick={this.selectDate} id={css.datepicker} className="datepicker" placeholder="Date" name="date" type="text" />
                  <br />
                  <button name="button" type="submit" className="waves-effect waves-light btn">
                    &nbsp; Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col l6 m6 s12">
            <div className="paper-no-border">
              <div className="css-flash">
                <div className="icon-div-info">
                  <i className="fas fa-info" aria-hidden="true"></i>
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

          </div>
        </div>

      </section>

    );
  }
}
