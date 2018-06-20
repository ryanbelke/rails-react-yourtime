import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';
import css from './Booking.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import EditDropDown from './EditBooking/EditDropDown';
import {Button, Icon} from 'react-materialize';
import createHistory from "history/createBrowserHistory"
import {withCookies, Cookies} from 'react-cookie';
import moment from 'moment';

class Booking extends BaseComponent {
  static propTypes = {
    workplaceName: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    sectionName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editSelection: null,
      newServiceCount: ['service'],
      sections: Immutable.fromJS([]),
      directEdit: false,
      chargedBooking: Immutable.fromJS({ workplace: { workplaceName: null, workplaceId: null },
                                        category: { categoryName: null, categoryId: null},
                                        location: { locationName: null, locationId: null },
                                        services: [],
                                        date: null })
    };
    _.bindAll(this, ['selectDate', 'editSelection',
      'saveSelection', 'addServices', 'saveService', 'removeService', 'handleSections', 'saveBooking']);
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

    let {dates, cookies} = this.props;
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
        if (context.select) {
          history.push(`?appointment&date=${context.select.toString().slice(0, -3)}`);
          let date = moment(context.select);
          cookies.set('date', `${date.format('MM-DD-YYYY')}`, {path: '/'})
        }
      },
    });
  }

  editSelection(select) {
    this.setState({ editSelection: select })
    if(select=='service') {
      this.setState({ directEdit: true })
    }
  }

  saveSelection(propertyName) {
    this.setState({ editSelection: false })
    if( propertyName == 'service' ) {
      this.setState({ directEdit: false })
    }

  }

  addServices() {
    let newServiceCount = this.state.newServiceCount;
    this.setState(prevState => ({newServiceCount: [...prevState.newServiceCount, 'service']}));
    console.log("nodes = " + JSON.stringify(newServiceCount))
  }

  handleSections(sectionId, action) {
    let { sections } = this.state;
    //console.log("event " + sectionId)
    //console.log("sections = " + sections)
    //find index of section ID will return -1 if not found
    const returnIndex = sections.findIndex(listItem => {
      if(listItem == sectionId) {
        return listItem
      }
    })
    if(returnIndex == -1) {
      sections = sections.push(sectionId)
    } else {
      if(action=='remove') {
        sections = sections.remove(sectionId)
      }
    }
    this.setState({ sections })
  }
  saveService(service, serviceId) {
    let { chargedBooking } = this.state;
    chargedBooking = Immutable.fromJS(chargedBooking)
    //chargedBooking = chargedBooking.update('services', prop => prop.push(service));
    // list = list.update(
    //   list.findIndex(function(item) {
    //     return item.get("name") === "third";
    //   }), function(item) {
    //     return item.set("count", 4);
    //   }
    // );
    const returnIndex = chargedBooking.get('services').findIndex(listItem => {
       console.log("inside return index")
       console.log(JSON.stringify(listItem))
      //check the listItem serviceId for the serviceId passed in, if its found update the item
      //if its not found push the service into the List
      return listItem.serviceId == serviceId

    })
    if(returnIndex == -1) {
      chargedBooking = chargedBooking.update('services', prop => prop.push(service));
      // console.log("no index found " + returnIndex)
      // console.log(JSON.stringify(chargedBooking))
      this.setState(state => { return { chargedBooking } })

    } else {
      // console.log("return index " + returnIndex)
      // console.log(" index  updating" + chargedBooking)
      chargedBooking = chargedBooking.update('services', item => item.set(returnIndex, service))
      this.setState( () => { return { chargedBooking } } )
      console.log(JSON.stringify(this.state.chargedBooking))
    }
  }
  removeService(serviceId) {
    let { chargedBooking } = this.state
    const returnIndex = chargedBooking.get('services').findIndex(listItem => {
      // console.log("inside return index")
      // console.log(JSON.stringify(listItem))
      //check the listItem serviceId for the serviceId passed in, if its found update the item
      //if its not found push the service into the List
      if(listItem.serviceId == serviceId) {
        return listItem.serviceId
      }
    })
    chargedBooking = chargedBooking.update('services', item => item.remove(returnIndex))
    this.setState( () => { return { chargedBooking } })
  }

  //save object of the edited items and prices
  //workplace, category, location, section, service + date
  saveBooking() {
    let { data, booking, props, workplaceName, locationName, categoryName } = this.props
    let $$editWorkplace = data.get('$$editWorkplace')
    let $$editCategory = data.get('$$editCategory')
    let $$editLocation = data.get('$$editLocation')
    let postBooking = { workplace: { workplace_id: null, workplace_name: null },
                        category: { category_id: null, category_name: null},
                        location: { location_id: null, location_name: null },
                        services: {} }

    let { chargedBooking } = this.state

    const createWorkplace = () => {
      if($$editWorkplace.isEmpty) {
        postBooking['workplace']['workplace_id'] = booking.workplace_id
        postBooking['workplace']['workplace_name'] = workplaceName
        console.log(JSON.stringify(postBooking))
        return postBooking

      } else if( !$$editWorkplace.isEmpty ) {
        postBooking['workplace']  = $$editWorkplace
        return postBooking
      }
    }
    const createCategory = () => {
      if( $$editCategory.isEmpty ) {
           postBooking['category']['category_id'] = booking.category_id
           postBooking['category']['category_name'] = categoryName
           return postBooking

         } else if( !$$editCategory.isEmpty ) {
           postBooking['category'] = $$editCategory
          return postBooking
         }
    }
    const createLocation = () => {
      if( $$editLocation.isEmpty ) {
        postBooking['location']['location_id'] = booking.location_id
        postBooking['location']['location_name'] = locationName
        return postBooking

      } else if( !$$editLocation.isEmpty ) {
        postBooking['location'] = $$editLocation
        return postBooking
      }
    }
    const createServices = () => {
      //services are edited in chargedBooking.services state
      postBooking['services'] = this.state.chargedBooking
    }
    console.log('edit everything')
    const workplace = createWorkplace()
    const category = createCategory()
    const location = createLocation()
    const services = createServices()
    console.log("working object = ")
    console.log(JSON.stringify(postBooking))
  }

  render() {
    let { workplaceName, categoryName, locationName, services,
          addOns, cookies, booking, actions, data } = this.props;
    let { editSelection, newServiceCount } = this.state;
    let cookie = cookies.get('date');
    let selected_date = moment(cookie, 'MM-DD-YYYY');

    if (moment(selected_date).isValid() == true) {
      /*      let month = `0${(selected_date.getMonth() + 1).toString().slice(-2)}`;
       let day = `0${selected_date.getDate().toString()}`.slice(-2);
       selected_date = `${month}/${day}/${selected_date.getFullYear()}`;*/
      //console.log("valid date ");
      selected_date = moment(selected_date).format('MM-DD-YYYY')
    } else {
      selected_date = "select a date";
    }

    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    let serviceNodes, addOnNodes, newEditServiceNode;
    //use newServiceCount to create corresponding section/service # of
    // edit nodes for each time add service button is clicked
    if (newServiceCount.length > 0) {
      newEditServiceNode =
          this.state.newServiceCount.map((a, index) => {
            return (
              <EditDropDown data={this.props.data}
                            key={index}
                            actions={this.props.actions}
                            service={true}
                            booking={booking}
                            admin={this.props.admin}
                            saveService={this.saveService}
                            removeService={this.removeService}
                            chargedBooking={this.state.chargedBooking}
                            handleSections={this.handleSections}
                            sections={this.state.sections}
              />
            )
          })
    }

    if (services != null || undefined) {
      serviceNodes = services.map(($$service, index) => (
        $$service.get('status') != 302 ?
          <div key={index}>
            <div className="form-info">
              <span className="form-header">Service:</span>
              <span className="form-text">
                  <span>
                    { $$service.getIn(['service', 'section', 'section_name']) }
                    <br />
                    { $$service.getIn(['service', 'service_name']) } &nbsp; &nbsp;
                    { this.state.directEdit ? $$service.getIn(['service', 'service_price']) : null }
                  </span>

                { editSelection == 'service' ?
                  <span>
                    <div onClick={this.saveSelection.bind(this, 'service')}
                         style={{
                           width: 30,
                           paddingLeft: 5,
                           paddingRight: 5,
                           float: 'right',
                           background: '#00C853',
                           color: 'gray'
                         }}
                         className="waves-effect grey lighten-5 btn-flat">
                    <i className="material-icons left">navigate_before</i>

                  </div>
                  <EditDropDown data={this.props.data}
                                key={index}
                                actions={this.props.actions}
                                service={true}
                                booking={booking}
                                admin={this.props.admin}
                                saveService={this.saveService}
                                removeService={this.removeService}
                                chargedBooking={this.state.chargedBooking}
                                handleSections={this.handleSections}
                                sections={this.state.sections}
                                directEdit={this.state.directEdit}
                                serviceId={$$service.getIn(['service', 'id'])}
                                sectionId={$$service.getIn(['service', 'section', 'id'])}
                                serviceName={$$service.getIn(['service', 'service_name'])}
                  />
                  </span>
                  :
                  booking ?
                    <div onClick={this.editSelection.bind(this, 'service')}
                         style={{width: 80, paddingLeft: 5, paddingRight: 5, float: 'right'}}
                         className="waves-effect grey lighten-5 btn-flat">
                      <i className="material-icons left">edit</i>Edit</div>
                    : null
                }
                </span>
            </div>
            { !this.state.directEdit ?
              <div>
                <div className="form-info">
                  <span className="form-header">Price: </span>
                  <span className="form-text"> ${$$service.getIn(['service', 'service_price'])}</span>
                </div>
                <div className="form-info">
                  <span className="form-header">Vendor/Time: </span>
                  <span className="form-text">{$$service.getIn(['service', 'service_vendor'])}&nbsp; |
                    &nbsp; {$$service.getIn(['service', 'service_time_to_complete'])}h</span>
                </div>
              </div> : null }
          </div>
          : null ));
          addOnNodes = addOns.map(($$addOn, index) => (
            <div key={index}>
              <div className="form-info">
                <span className="form-header">{null}</span>
                <span className="form-text"> {$$addOn.getIn(['service', 'service_name'])}:
                  &nbsp; ${$$addOn.getIn(['service', 'service_price'])}
                  { editSelection == 'addOn' || editSelection == 'service' ?
                    <span>
                      <div onClick={this.saveSelection.bind(this, 'service')}
                           style={{ width: 30, paddingLeft: 5, paddingRight: 5,
                                    float: 'right', background: '#00C853', color: 'gray' }}
                           className="waves-effect grey lighten-5 btn-flat">
                        <i className="material-icons left">navigate_before</i>
                      </div>
                      <EditDropDown data={this.props.data}
                                    key={index}
                                    actions={this.props.actions}
                                    service={true}
                                    booking={booking}
                                    admin={this.props.admin}
                                    saveService={this.saveService}
                                    removeService={this.removeService}
                                    chargedBooking={this.state.chargedBooking}
                                    handleSections={this.handleSections}
                                    sections={this.state.sections}
                                    directEdit={this.state.directEdit}
                                    serviceId={$$addOn.getIn(['service', 'id'])}
                                    sectionId={$$addOn.getIn(['service', 'section', 'id'])}
                                    serviceName={$$addOn.getIn(['service', 'service_name'])} />
                    </span>

                    :
                    booking ?
                      <div onClick={this.editSelection.bind(this, 'service')}
                           style={{ width: 30, paddingLeft: 5, paddingRight: 5, float: 'right' }}
                           className="waves-effect grey lighten-5 btn-flat">
                        <i className="material-icons left">edit</i></div>
                      : null
                  }
                </span>
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
                  <input onChange={() => null} value={selected_date} onClick={this.selectDate} id={css.datepicker}
                         className="datepicker" placeholder="Date" name="date" type="text"/>
                </form>
              </div>
            </div>
          </div>
          <div className="col l6 m6 s12">
            <div className="paper-no-border" style={{ marginBottom: data.get('resetServices') ? '10%' : null }}>
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
                <span className="form-text">
                  {editSelection == 'workplace' ?
                    <EditDropDown data={data}
                                  actions={actions}
                                  booking={booking}
                                  workplace={true}/>
                    :
                    workplaceName
                  }
                  {editSelection == 'workplace' ?
                    <div onClick={this.saveSelection.bind(this, 'workplace')}
                         style={{
                           width: 100,
                           paddingLeft: 5,
                           paddingRight: 5,
                           float: 'right',
                           background: '#00C853',
                           color: 'white'
                         }}
                         className="waves-effect blue lighten-2 btn-flat">
                      <i className="material-icons left">save</i>
                      Save
                    </div>
                    :
                    booking ?
                      <div onClick={this.editSelection.bind(this, 'workplace')}
                           style={{width: 80, paddingLeft: 5, paddingRight: 5, float: 'right'}}
                           className="waves-effect grey lighten-5 btn-flat">
                        <i className="material-icons left">edit</i>
                        Edit
                      </div>
                      : null
                  }
                  &nbsp;<br />
                  {editSelection == 'workplace' ?
                    null
                    :
                    categoryName
                  }
                </span>
              </div>
              <div className="form-info">
                <span className="form-header">Location:</span>
                <span className="form-text"> {
                  editSelection == 'location' ?
                    <EditDropDown data={data}
                                  actions={actions}
                                  booking={booking}
                                  location={true}/>
                    :
                    locationName}
                  {editSelection == 'location' ?
                    <div onClick={this.saveSelection.bind(this, 'location')}
                         style={{
                           width: 100,
                           paddingLeft: 5,
                           paddingRight: 5,
                           float: 'right',
                           background: '#00C853',
                           color: 'white'
                         }}
                         className="waves-effect blue lighten-2 btn-flat">
                      <i className="material-icons left">save</i>
                      Save
                    </div>
                    :
                    booking ?
                      <div onClick={this.editSelection.bind(this, 'location')}
                           style={{width: 80, paddingLeft: 5, paddingRight: 5, float: 'right'}}
                           className="waves-effect grey lighten-5 btn-flat">
                        <i className="material-icons left">edit</i>
                        Edit</div>
                      : null
                  }
                </span>
              </div>
              {serviceNodes}
              { data.get('resetServices') || this.state.directEdit ?
                <div className="form-info" style={{ borderBottom: 'none',
                                                    paddingTop: data.get('resetServices') ? 20 : 0 }}>
                  <span className="form-header">
                    <Button className="blue lighten-2" waves='light'
                            s={12} onClick={this.addServices}>
                            <Icon right>add</Icon>
                            Add Service
                    </Button>
                  </span>
                  <span className="form-text" />
                </div>
                : null }
              <div className="form-info" style={{ border: 'none',
                                                  paddingBottom: data.get('resetServices') ? '12%' : null }}>
                <span className="form-header" style={{ flex: '.30' }}/>
                  <span className="form-text" style={{ flex: '.7' }}>
                    {data.get('resetServices') ? newEditServiceNode : null}
                  </span>
              </div>

              { !this.state.directEdit && !data.get('resetServices') ?
                <div>
                  <div className="form-info">
                    <span className="form-header">Add-ons:</span>
                  </div>
                </div> : null}
              {addOnNodes}
            </div>
            <br />
            <Button style={{ float: 'right', marginRight: 30 }}
                    className="blue lighten-2" waves='light' s={12}
                    onClick={this.saveBooking}>
              <Icon left>save</Icon>
              Save Booking
            </Button>
          </div>
        </div>
      </section>

    );
  }
}
export default withCookies(Booking)