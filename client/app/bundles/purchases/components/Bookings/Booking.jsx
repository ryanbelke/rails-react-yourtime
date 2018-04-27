import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';
import css from './Booking.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import createHistory from "history/createBrowserHistory"
import { withCookies, Cookies } from 'react-cookie';

class Booking extends BaseComponent {
  static propTypes = {
    workplaceName: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
    services: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectDate');
  }

  selectDate() {
    const history = createHistory();

// Get the current location.
    const location = history.location;

// Listen for changes to the current location.
    const unlisten = history.listen((location, action) => {
      // location is an object like window.location
      //console.log(action, location.pathname, location.state)
    });

    let { dates, cookies} = this.props;
    let datesArray = [true];
    dates = dates.toArray();
    let date = dates.forEach((date) => {
        let newDate = new Date(date.get(0))
        let formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}T00:00:00`;
        return datesArray.push(formattedDate)
    });

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      format: 'mm/dd/yyyy',
      editable: false,
      closeOnSelect: false, // Close upon selecting a date,
      disable: datesArray,
      //set parameter of selected date for cookie setting
      onSet: (context) => {
        history.push(`?appointment&date=${context.select}`);
        let date = new Date(context.select);
        cookies.set('date', `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}T00:00:00`, {path: '/'})
      },
    });
  }

  render() {
    let { workplaceName, categoryName,
      locationName, services, addOns,cookies } = this.props;
    let selected_date = new Date(cookies.get('date'));
    if(selected_date != "Invalid Date" || null) {
      let month = `0${(selected_date.getUTCMonth() + 1).toString().slice(-2)}`;
      let day = `0${selected_date.getUTCDate().toString()}`.slice(-2);
      selected_date = `${month}/${day}/${selected_date.getUTCFullYear()}T00:00:00`;

    } else if(selected_date == "Invalid Date") {
      selected_date = "select a date";
    }

    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    let serviceNodes, addOnNodes;
    console.log('services ==== ' + services);
    if(services != null || undefined) {
        serviceNodes = services.map(($$service, index) => (
          <div key={index}>
            <div className="form-info">
              <span className="form-header">Service:</span>
              <span className="form-text"> {$$service.getIn(['service', 'section', 'section_name'])}&nbsp;|
                &nbsp;{$$service.getIn(['service', 'service_name'])}</span>
            </div>

            <div className="form-info">
              <span className="form-header">Price: </span>
              <span className="form-text"> ${$$service.getIn(['service','service_price'])}</span>
            </div>
            <div className="form-info">
              <span className="form-header">Vendor/Time: </span>
              <span className="form-text">{$$service.getIn(['service', 'service_vendor'])}&nbsp; |
              &nbsp; {$$service.getIn(['service', 'service_time_to_complete'])}h</span>
            </div>
          </div>
        ));
      addOnNodes = addOns.map(($$addOn, index) => (
        <div key={index}>
          <div className="form-info">
            <span className="form-header"></span>
            <span className="form-text"> {$$addOn.getIn(['service', 'service_name'])}:
            &nbsp; ${$$addOn.getIn(['service','service_price'])}</span>
          </div>
        </div>
      ))
    }

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
                  <input onChange={() => null} value={selected_date.toString()} onClick={this.selectDate} id={css.datepicker} className="datepicker" placeholder="Date" name="date" type="text" />
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
                <span className="form-text"> {workplaceName}&nbsp; | &nbsp;{locationName} </span>
              </div>
{/*              <div className="form-info">
                <span className="form-header">Location:</span>
                <span className="form-text"> </span>
              </div>*/}

              <div className="form-info">
                <span className="form-header">Category:</span>
                <span className="form-text"> {categoryName}</span>
              </div>
              {serviceNodes}
              <hr />
              <hr />
              <hr />
              <div className="form-info">
                <span className="form-header">Add-ons:</span>
              </div>
              {addOnNodes}
            </div>
            <br />

          </div>
        </div>
      </section>

    );
  }
}
export default withCookies(Booking)