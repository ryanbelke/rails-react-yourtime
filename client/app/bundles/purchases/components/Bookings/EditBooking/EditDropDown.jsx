import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import Script from 'react-load-script'
import { Input, Preloader } from 'react-materialize';
import _ from 'lodash';
import Immutable from 'immutable';

export default class EditDropDown extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
      scriptError: false,
      selectionLoading: false,
      selectedWorkplace: 0,
      selectedCategory: 0,
      selectedLocation: 0,
      $$selectedServices: Immutable.fromJS([]),
      $$selectedAddOns: Immutable.fromJS([]),
    };
    _.bindAll(['handleScriptError', 'handleScriptLoad', 'selectWorkplace', 'makeSelection',
    'selectLocation'])
  }
  handleScriptError() { this.setState({ scriptError: true }); }
  handleScriptLoad() { this.setState(() => ({ scriptLoaded: true })); }

  componentDidMount() {
    this.props.workplace ?
      this.selectWorkplace()
      : null;
    this.props.location ?
      this.selectLocation()
      : null;
  }

  makeSelection(propertyName, event) {
    const { actions } = this.props;
    const eventId = parseInt(event.target.value);

    let dataset = event.target.options[event.target.selectedIndex].dataset;
    console.dir('EVENT = ' + eventId + " value = " + dataset.attribute);

    this.setState({ [propertyName]: eventId });
    //if workplace is selected
    if(propertyName == 'selectedWorkplace') {
      //get categories
      actions.getCategories(event.target.value)
        .then(() => this.setState({ selectedCategory: 0 }))
        .then(() => actions.selectEditWorkplace({ workplaceId: eventId,
                                                  workplaceName: dataset.attribute }))
        .then(() => actions.resetServices());
      //if category is changed
    } else if(propertyName == 'selectedCategory') {
      //get locations
      actions.getLocations(event.target.value)
        //set selectedLocation to 0
        .then(() => this.setState({ selectedLocation: 0 }))
        .then(() => actions.selectEditCategory({ categoryId: eventId,
                                                 categoryName: dataset.attribute }))
        //reset services
        .then(() => actions.resetServices())
    } else if(propertyName == 'selectedLocation') {
      //get sections
      actions.getSections(this.state.selectedLocation)
      //set $$editLocation object with the selection
      .then(() => actions.selectEditLocation({ locationId: eventId,
                                               locationName: dataset.attribute }))
      //reset services
      .then(() => actions.resetServices());
    }
  }
  selectWorkplace() {
    const { actions, booking  } = this.props;
    actions.getWorkplaces()
      .then(() => this.setState({ selectionLoading: false }))
      .then(() => actions.getCategories(booking.workplace_id))
  }
  selectLocation() {
    const { actions, booking  } = this.props;
    let category;
    booking ? category = booking.category_id : category = this.state.selectedCategory;
    actions.getLocations(category)
      .then(() => this.setState({ selectionLoading: false }));
      //.then(() => actions.getCategories(booking.workplace_id))
  }
  render() {
    let editNode;
    let { workplace, category, location, service, booking, data } = this.props;
    let { selectedWorkplace, selectedCategory, selectedLocation, selectionLoading } = this.state;
    const isFetching = data.get('isFetching');
    let workplaces = data.get('$$workplaces');
    let categories = data.get('$$categories');
    let locations = data.get('$$locations');
    let services = data.get('$$services');
    console.log("test me " + data.getIn(['$$editCategory', 'categoryId']))
    if(workplace) {

      editNode =
        <div>
          <span style={{float: 'left', display: isFetching ? 'inline' : 'none'  }} >
            <Preloader size='small'/>
          </span>

          <Input onChange={this.makeSelection.bind(this, 'selectedWorkplace')}
                 s={12} type='select' label="Workplace" value={selectedWorkplace == 0 ? `${booking.workplace_id}`
            : `${selectedWorkplace}`}>
            <option value="0" key="0" disabled>Select Workplace</option>

            { workplaces.map((workplace) => {
                return <option key={workplace.get('id')}
                               data-attribute={workplace.get('workplace_name')}
                               value={workplace.get('id')}>
                           {workplace.get('workplace_name')}
                       </option>
              })}
          </Input>
          <span style={{float: 'left', display: isFetching ? 'inline' : 'none'  }} >
            <Preloader size='small'/>
          </span>

              <Input onChange={this.makeSelection.bind(this, 'selectedCategory')} s={12}
                     type='select' label="Category" value={selectedWorkplace == 0 && data.getIn(['$$editCategory', 'categoryId']) == undefined
                ? `${booking.category_id}` : `${selectedCategory}` }>
                <option value='0' key="0" disabled>Select Category</option>

                { categories != null ? categories.map((category) => {
                  return <option key={category.get('id')}
                                 data-attribute={category.get('category_name')}
                                 value={category.get('id')}>
                           {category.get('category_name')}
                         </option>
                }) : null }
              </Input>
        </div>
    } else if(location) {

      editNode =
        <div>
          <span style={{position: 'absolute',float: 'left', display: isFetching ? 'inline' : 'none'  }} >
            <Preloader size='small'/>
          </span>

          <Input onChange={this.makeSelection.bind(this, 'selectedLocation')}
                 s={12} type='select' label="Location" value={selectedLocation == 0 ? `${booking.location_id}`
            : `${selectedLocation}`}>
            <option value="0" key="0" disabled>Select Location</option>
            { locations != null ? locations.map((location) => {
                return <option key={location.get('id')}
                               value={location.get('id')}
                               data-attribute={location.get('location_name')}>
                  {location.get('location_name')}
                </option>
              }) : null}
          </Input>
        </div>
    } else if(service) {

      editNode =
        <div>
          <span style={{float: 'left', display: isFetching ? 'inline' : 'none'  }} >
            <Preloader size='small'/>
          </span>
          <Input onChange={this.makeSelection.bind(this, 'selectedService')}
                 s={12} type='select' label="Service" value={selectedService}>
            <option value="0" key="0" disabled>Select Service</option>
            { services != null ? services.map((service) => {
                return <option key={service.get('id')} value={service.get('id')}>
                  {service.get('service_name')}
                </option>
              }) : null}
          </Input>
        </div>
    } else {
      editNode = <small>No Edit Selected</small>
    }
    return (
      <div>
          <Script
            url="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
          {this.state.scriptLoaded ? editNode : null}
      </div>
    )
  }

}