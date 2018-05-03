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
import moment from 'moment';

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
        //let newDate = new Dat e(date.get(0));
      let moment2 = moment(date.get(0), 'YYYY-M-DD');
      let newDate = new Date(moment2.toISOString());
      console.log('New Date = ' + newDate);
      return datesArray.push(newDate);
    });
    console.log('dates array ' + datesArray);

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      format: 'mm-dd-yyyy',
      editable: false,
      closeOnSelect: false, // Close upon selecting a date,
      disable: datesArray,
      //set parameter of selected date for cookie setting
      onSet: (context) => {
        if(context.select) {
          history.push(`?appointment&date=${context.select.toString().slice(0, -3)}`);
          let date = moment(context.select);
          cookies.set('date', `${date.format('MM-DD-YYYY')}`, {path: '/'})
        }
      },
    });
  }

  render() {
    let { workplaceName, categoryName,
      locationName, services, addOns, cookies, edit } = this.props;
    let cookie = cookies.get('date');
    let selected_date = moment(cookie, 'MM-DD-YYYY');

    if(moment(selected_date).isValid() == true) {
/*      let month = `0${(selected_date.getMonth() + 1).toString().slice(-2)}`;
      let day = `0${selected_date.getDate().toString()}`.slice(-2);
      selected_date = `${month}/${day}/${selected_date.getFullYear()}`;*/
      console.log("valid date ");
      selected_date = moment(selected_date).format('MM-DD-YYYY')
    } else  {
      console.log("not valid date ");
      selected_date = "select a date";
    }

    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    let serviceNodes, addOnNodes;
    //console.log('services ==== ' + services);
    if(services != null || undefined) {
        serviceNodes = services.map(($$service, index) => (
          <div key={index}>
            <div className="form-info">
              <span className="form-header">Service:</span>
              <span className="form-text">
                {$$service.getIn(['service', 'section', 'section_name'])}
                <br />
                {$$service.getIn(['service', 'service_name'])}</span>
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
                  <input onChange={() => null} value={selected_date} onClick={this.selectDate} id={css.datepicker} className="datepicker" placeholder="Date" name="date" type="text" />
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
                <span className="form-text"> {workplaceName}&nbsp;  <br /> {locationName} </span>
              </div>

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