import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import Script from 'react-load-script'
import {Input, Preloader} from 'react-materialize';
import _ from 'lodash';
import {Button, Icon} from 'react-materialize';

import Immutable from 'immutable';
import EditService from './EditService'

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
      selectedSection: 0,
      resetSaveColor: false,
      resetWorkplaceColor: false,
      resetCategoryColor: false,
      workplace: { workplaceId: null, workplaceName: null },
      category: { categoryId: null, categoryName: null },
      location: { locationId: null, locationName: null },
      $$selectedServices: Immutable.fromJS([]),
      $$selectedAddOns: Immutable.fromJS([]),
    };
    _.bindAll(['handleScriptError', 'handleScriptLoad', 'selectWorkplace', 'makeSelection',
      'selectLocation', 'fromJSGreedy', 'saveButton'])
  }

  handleScriptError() {
    this.setState({scriptError: true});
  }
  handleScriptLoad() {
    this.setState(() => ({scriptLoaded: true}));
  }

  componentDidMount() {
    this.props.workplace ?
      this.selectWorkplace()
      : null;
    this.props.location ?
      this.selectLocation()
      : null;
  }

  /*  https://stackoverflow.com/questions/40661729/immutable-fromjs-is-not-deep
   fromJSGreedy(js) {
   return typeof js !== 'object' || js === null ? js :
   Array.isArray(js) ?
   Immutable.Seq(js).map(fromJSGreedy).toList() :
   Immutable.Seq(js).map(fromJSGreedy).toMap();
   }*/

  makeSelection(propertyName, event) {
    const { actions } = this.props;
    let { workplace, category, location } = this.state;

    const eventId = parseInt(event.target.value);
    //https://stackoverflow.com/questions/35511600/react-access-data-attribute-in-option-tag
    let dataset = event.target.options[event.target.selectedIndex].dataset;
    console.dir('EVENT = ' + eventId + " value = " + dataset.attribute);
    this.setState({[propertyName]: eventId});
    //if workplace is selected
    if (propertyName == 'selectedWorkplace') {
      //get categories
      actions.getCategories(event.target.value)
        .then(() => this.setState({selectedCategory: 0}))
        .then(() => actions.selectEditWorkplace({
          workplaceId: eventId,
          workplaceName: dataset.attribute
        }))
        .then(() => actions.resetServices());
      workplace['workplaceId'] = eventId
      workplace['workplaceName'] = dataset.attribute
      this.setState({ workplace })
      //if category is changed
    } else if (propertyName == 'selectedCategory') {
      //get locations
      actions.getLocations(event.target.value)
      //set selectedLocation to 0
        .then(() => this.setState({selectedLocation: 0}))
        .then(() => actions.selectEditCategory({
          categoryId: eventId,
          categoryName: dataset.attribute
        }))
        //reset services
        .then(() => actions.resetServices())
      category['categoryId'] = eventId
      category['categoryName'] = dataset.attribute
      this.setState({ category })
    } else if (propertyName == 'selectedLocation') {
      //get sections
      actions.getSections(this.state.selectedLocation)
      //set $$editLocation object with the selection
        .then(() => actions.selectEditLocation({
          locationId: eventId,
          locationName: dataset.attribute
        }))
        //reset services
        .then(() => actions.resetServices());
      location['locationId'] = eventId
      location['locationName'] = dataset.attribute
      this.setState({ location })
    }
  }
  saveButton(propertyName) {
    let { workplace, category, location } = this.state;
    if(propertyName == 'workplace') {
      this.props.saveButton('workplace', workplace)
      this.setState({ resetWorkplaceColor: true })
      setTimeout( () => { this.setState({ resetWorkplaceColor: false }) }, 3000)

    } else if(propertyName == 'category') {
      this.props.saveButton('category', category)
      this.setState({ resetCategoryColor: true })
      setTimeout( () => { this.setState({ resetCategoryColor: false }) }, 3000)

    } else if(propertyName == 'location') {
      this.props.saveButton('location',location)
      this.setState({ resetSaveColor: true })
      setTimeout( () => { this.setState({ resetSaveColor: false }) }, 3000)

    }
  }
  selectWorkplace() {
    const {actions, booking} = this.props;
    actions.getWorkplaces()
      .then(() => this.setState({selectionLoading: false}))
      .then(() => actions.getCategories(booking.workplace_id))
  }

  selectLocation() {
    const {actions, booking} = this.props;
    let category;
    booking ? category = booking.category_id : category = this.state.selectedCategory;
    actions.getLocations(category)
      .then(() => this.setState({selectionLoading: false}));
    //.then(() => actions.getCategories(booking.workplace_id))
  }

  render() {
    let editNode;
    let {workplace, location, service, booking, data, actions} = this.props;
    let { selectedWorkplace, selectedCategory, selectedLocation, resetSaveColor,
          resetCategoryColor, resetWorkplaceColor } = this.state;
    const isFetching = data.get('isFetching');
    let workplaces = data.get('$$workplaces');
    let categories = data.get('$$categories');
    let locations = data.get('$$locations');

    //parse the string booking into JSON
    const parsedServicesObject = JSON.parse(booking.services_object);
    //create deeply nested array of maps
    let servicesObject = Immutable.fromJS(parsedServicesObject)
    //console.log("what is my booking " + JSON.stringify(booking));

    /*  Use to convert a ruby hash stored in DB to a JSON object, not necessary at this time
     service1 = service1.replace(/:/g, '').replace(/=>/g, ':').replace(/ /g, "");
     service1 = this.fromJSGreedy(service1);
     https://stackoverflow.com/questions/4843746/regular-expression-to-add-double-quotes-around-keys-in-javascript
     service1 = JSON.parse(service1.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":'));
     */

    if (workplace) {
      editNode =
        <div>
          <span style={{float: 'left', display: isFetching ? 'inline' : 'none'}}>
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
          <Button className={resetWorkplaceColor == false ? 'grey lighten-5' : 'green accent-2'} waves='light'
                  s={12} onClick={this.saveButton.bind(this, 'workplace')} style={{ float: 'right', color: 'grey',
            marginBottom: 30, width: 140 }}>
            {resetSaveColor == false ?
              <span>
                Save<Icon right>save</Icon>
              </span> :
              <span>
                Complete<Icon style={{ width: 20 }} left>checkmark</Icon>
              </span>
            }
          </Button>
          <span style={{float: 'left', display: isFetching ? 'inline' : 'none'}}>
            <Preloader size='small'/>
          </span>
          <Input onChange={this.makeSelection.bind(this, 'selectedCategory')} s={12}
                 type='select' label="Category"
                 value={selectedWorkplace == 0 && data.getIn(['$$editCategory', 'categoryId']) == undefined
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
          <Button className={resetCategoryColor == false ? 'grey lighten-5' : 'green accent-2'} waves='light'
                  s={12} onClick={this.saveButton.bind(this, 'category')} style={{ float: 'right', color: 'grey',
            marginBottom: 30, width: 140 }}>
            {resetSaveColor == false ?
              <span>
                Save<Icon right>save</Icon>
              </span> :
              <span>
                Complete<Icon style={{ width: 20 }} left>checkmark</Icon>
              </span>
            }
          </Button>
        </div>
    } else if (location) {
      editNode =
        <div>
          <span style={{position: 'absolute', float: 'left', display: isFetching ? 'inline' : 'none'}}>
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
          <Button className={resetSaveColor==false ? 'grey lighten-5' : 'green accent-2'} waves='light'
                  s={12} onClick={this.saveButton.bind(this, 'location')} style={{ float: 'right', color: 'grey',
            marginBottom: 30, width: 140 }}>
            {resetSaveColor == false ?
              <span>
                Save<Icon right>save</Icon>
              </span> :
              <span>
                Complete<Icon style={{ width: 20 }} left>checkmark</Icon>
              </span>
            }
          </Button>
        </div>
    } else if (service) {
      editNode =
        //render edit nodes for service and corresponding section
        //may have to create a new component to manage each selections state
        <div>
          <EditService actions={actions}
                       data={data}
                       admin={this.props.admin}
                       saveService={this.props.saveService}
                       removeService={this.props.removeService}
                       chargedBooking={this.props.chargedBooking}
                       handleSections={this.props.handleSections}
                       sections={this.props.sections}
                       directEdit={this.props.directEdit}
                       serviceId={this.props.serviceId}
                       booking={booking}
                       //updateServices={this.props.updateServices}
                       sectionId={this.props.sectionId}
                       serviceName={this.props.serviceName}
                       servicePrice={this.props.servicePrice}
                       serviceTax={this.props.serviceTax}
          />
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