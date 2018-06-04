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
      sectionId: 0,
      sectionName: null,
      $$services: Immutable.fromJS([]),
      error: null,
      hideNode: false,
    };
    _.bindAll(['makeSelection', 'removeSelection'])
  }

  makeSelection(propertyName, event) {
    const {actions} = this.props;
    const eventId = parseInt(event.target.value);
    //https://stackoverflow.com/questions/35511600/react-access-data-attribute-in-option-tag
    let dataset = event.target.options[event.target.selectedIndex].dataset;
    console.dir('EVENT = ' + eventId + " value = " + dataset.attribute);

    this.setState({[propertyName]: eventId});
    //if selection is selected
    if (propertyName == 'selectedSection') {
      //get services for selected section
      requestsManager.getServices(event.target.value)
        .then(res => this.setState({$$services: Immutable.fromJS(res.data) }))
        .catch(error => this.setState({error: error}))
        //set the service drop down to the default value for selection
        .then(() => this.setState({ selectedService: 0 }))
        //set the sectionId + sectionName = to the values selected in section drop down
        .then(() => this.setState({
          sectionId: eventId,
          sectionName: dataset.attribute,
          hideNode: false,
        }))
    }  else if(propertyName == 'selectedService') {
      actions.selectEditServices(eventId)
    }
  }
  removeSelection(propertyName, event) {
    const { actions } = this.props;
    //remove service id from the $$services Set
    actions.removeEditServices(this.state.selectedService);
    //set state of selectedService to 0
    this.setState({ selectedService: 0, selectedSection: 0, hideNode: true })
  }

  render() {
    const {selectedSection, selectedService, $$sections, $$services, hideNode } = this.state;
    const {data, actions} = this.props;
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
              }) : null}
          </Input>
{/*        {console.log("service = " + services)}*/}
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
                  {service.get('service_name')}
                </option>
              })}
            </Input>
            </span>
          : null}
      </div>
    )
  }
}
export default EditService