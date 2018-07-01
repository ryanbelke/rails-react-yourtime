import React from 'react';
import {Input, Preloader} from 'react-materialize';
import _ from 'lodash'
import Immutable from 'immutable'
import {Button, Icon} from 'react-materialize'
import requestsManager from 'libs/requestsManager'

class EditService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: 0,
      selectedService: 0,
      defaultServicePrice: 0,
      defaultServiceTax: 0,
      selectedServiceName: null,
      sectionId: 0,
      sectionName: null,
      $$services: Immutable.fromJS([]),
      error: null,
      hideNode: false,
      service: { serviceName: null, serviceId: null, serviceTax: 0, servicePrice: 0 },
      resetSaveColor: false,
    };
    _.bindAll(['makeSelection', 'removeSelection', 'handleChange', 'saveService'])
  }
  componentDidMount() {
    const { actions, booking } = this.props

    if(this.props.directEdit) {
      actions.getSections(booking.location_id)
      this.makeSelection('selectedSection', parseInt(this.props.sectionId))
    }
  }
  handleChange(propertyName, event) {
    let { service } = this.state;
    let dataset = event.target.options[event.target.selectedIndex].dataset;

    if(propertyName=='selectedService') {
      const eventId = parseInt(event.target.value);
      service['serviceName'] = dataset.attribute
      service['serviceId']  = eventId
    } else {
      service[propertyName] = event.target.value
    }
    this.setState({ service })
  }

  makeSelection(propertyName, event) {
    const {actions} = this.props;
    let { service } = this.state;
    //conditional render for serName, serID (service)
    let eventId, dataset, serName, serId, serPrice, serTax;

    console.log(event.target)
    if(!event.target) {
      eventId = event
      serId = this.props.serviceId
      serName = this.props.serviceName
      serPrice = this.props.servicePrice
      serTax = this.props.serviceTax
    } else {
      eventId = parseInt(event.target.value);
      //https://stackoverflow.com/questions/35511600/react-access-data-attribute-in-option-tag
      event.target.options ? dataset = event.target.options[event.target.selectedIndex].dataset : null
      serId = 0
    }

    //console.dir('EVENT = ' + eventId + " value = " + dataset);
    this.setState({[propertyName]: eventId});
    //if selection is selected
    if (propertyName == 'selectedSection') {
      //get services for selected section
      requestsManager.getServices(eventId)
        //set the service drop down to the default value for selection
        //set the sectionId + sectionName = to the values selected in section drop down
        //set hideNode to false to show the associated service Input Component
        .then(res => this.setState({$$services: Immutable.fromJS(res.data), sectionId: eventId,
                                    selectedService: serId, hideNode: false,
                                    service: { serviceName: serName, serviceId: serId, servicePrice: serPrice, serviceTax: serTax }}))

        .catch(error => this.setState({error: error}))

    }  else if ( propertyName == 'selectedService' ) {

      actions.selectEditServices(eventId);
      //if a selection is made, dataset will be true and dataset.attribute will be the service name
      if( dataset ) { serName = dataset.attribute }
        service['serviceName'] = serName
        service['serviceId']  = eventId
        this.setState({ selectedService: eventId, selectedServiceName: serName, service })
      console.log("trying to update service")
      //this.props.updateServices(service)
    } else {
      service[propertyName] = event.target.value
    }
  }
  removeSelection(propertyName, event) {
    const { actions } = this.props;
    //remove service id from the $$services Set
    actions.removeEditServices(this.state.selectedService);
    this.props.removeService(this.state.selectedService)
    //set state of selectedService to 0
    //selectedSection to 0 as the associated service has been deleted
    //hideNode to true to hide the associated service input
    this.setState({ selectedService: 0, selectedSection: 0, hideNode: true })
  }
  //save the service after selection made and send back to the Booking component
  saveService() {
    this.props.saveService(this.state.service, this.state.selectedService)
    this.setState({ resetSaveColor: true })
    setTimeout( () => { this.setState({ resetSaveColor: false }) }, 3000)
  }
  render() {
    const { selectedSection, selectedService, $$sections, $$services, hideNode, resetSaveColor } = this.state;
    const { data, actions, admin, props, chargedBooking } = this.props;
    let savedServices = chargedBooking.get('services')
    let sectionsArray = this.props.sections;

    const returnIndex = savedServices.findIndex(listItem => {
      // console.log("List Item")
      // console.log(JSON.stringify(listItem))
        return listItem.serviceId == selectedService
    })
    //console.log("RETURN INDex = " + returnIndex)
    const sections = data.get('$$sections');
    //get services from returned call
    const services = $$services.get('services');
    return (
      <div>
          <Input onChange={this.makeSelection.bind(this, 'selectedSection')} style={{ flex: '.85'}}
                 l={12} s={12} type='select' label="Section" value={`${selectedSection}`}>
            <option value="0" key="0" disabled>Select Section</option>
            { sections != null ? sections.map((section, index) => {
                return <option key={section.get('id') || index}
                               value={section.get('id')}
                               data-attribute={section.get('section_name')}>
                  {section.get('section_name')}
                </option>
              }) : null }
          </Input>
        { services != undefined || null ?
          <span className="service-span" id={selectedService} style={{ display: hideNode ? 'none'  : 'inline-block' }}>
            <div className="waves-effect grey lighten-5 btn-flat"
                 onClick={this.removeSelection.bind(this, 'removeSelection')} style={{  width: 40, display: 'inline-block',
                                                          float: 'left', marginTop: 10,
                                                          padding: '1px 10px', color: 'gray' }}>
              <i className="material-icons">delete</i>
            </div>
            <Input onChange={this.makeSelection.bind(this, 'selectedService')}
                   l={10} s={12} type='select' label="Service" value={`${selectedService}`}
                   style={{ width: '90%', float: 'right'}} className="input-box">
                <option value="0" key="0" disabled> Select Service </option>
              {services.map((service, index) => {
                return <option key={service.get('id') || index}
                               value={service.get('id')}
                               data-attribute={service.get('service_name')}>
                  {service.get('service_name')} ${service.get('service_price')}
                </option>
              })}
            </Input>
            {admin ?
              <div style={{ marginLeft: 50 }}>
                <Input onChange={this.makeSelection.bind(this, 'servicePrice' )}
                       style={{ width: 70, fontSize: '1.25rem', height: 40 }} placeholder="Price"
                       defaultValue={this.state.service.servicePrice} label="Enter Price" />
                <Input onChange={this.makeSelection.bind(this, 'serviceTax')}
                       style={{ width: 70, fontSize: '1.25rem', height: 40 }} placeholder="Tax"
                       defaultValue={this.state.service.serviceTax} label="Enter Tax"/>
              </div>
              : null}

            </span>

          : null}
          <Button className={resetSaveColor==false ? 'grey lighten-5' : 'green accent-2'} waves='light'
                  s={12} onClick={this.saveService.bind(this)} style={{ float: 'right', color: 'grey',
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
    )
  }
}
export default EditService