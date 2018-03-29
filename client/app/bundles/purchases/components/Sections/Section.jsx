import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';
import Service from '../Services/Service';
import AddOn from '../AddOns/AddOn';

import requestsManager from 'libs/requestsManager';

import css from './Section.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ServicesComponent from '../Services/ServicesComponent';

export default class Section extends BaseComponent {
  static propTypes = {
    sectionName: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      services: Immutable.fromJS([]),
      fetchServicesError: null,
      isFetching: false,
      serviceSelection: Immutable.fromJS([]),
      selectedAddOn: Immutable.fromJS([]),
    };
    _.bindAll(this, ['fetchServices', 'selectService', 'selectAddOn', 'deselectAddOn', 'deSelectService']);
  }
  componentDidMount() {
    this.fetchServices();
  }

  fetchServices() {
    const  { data, actions, sectionId } = this.props;
    //actions.fetchServices(this.props.sectionId);
    requestsManager.submitEntity(sectionId)
      .then(res => this.setState(({services}) => ({
        services: services.set(services.size, Immutable.fromJS(res.data.services))
      })

      ))
      .catch(error => this.setState({ fetchServicesError: error }))
  }
/*  selectSection() {
    const { actions } = this.props;
    const sectionId = this.props.sectionId;
    //actions.selectSection(sectionId);
  }*/
  selectService(serviceId) {
    let serviceSelection = this.state.serviceSelection;
    //clear array and push new value to allow only 1 service selection
    serviceSelection = serviceSelection.clear().push(serviceId);
    this.setState({ serviceSelection: serviceSelection })
  }
  deSelectService(serviceId) {
    let serviceSelection = this.state.serviceSelection;
    let indexPosition = serviceSelection.indexOf(serviceId);
    serviceSelection = serviceSelection.remove(indexPosition);
    this.setState({ serviceSelection: serviceSelection })
  }
  selectAddOn(addOnId) {
    let selectedAddOn = this.state.selectedAddOn;
    selectedAddOn = selectedAddOn.push(addOnId);
    this.setState({ selectedAddOn: selectedAddOn })
  }
  deselectAddOn(addOnId) {
    let selectedAddOn = this.state.selectedAddOn;
    let indexPosition = selectedAddOn.indexOf(addOnId);
    selectedAddOn = selectedAddOn.remove(indexPosition);

    this.setState({ selectedAddOn: selectedAddOn })
  }

  render() {
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    const { sectionName, sectionId, sectionSelection, actions, data} = this.props;
    let serviceNodes = null;

    //const isFetching = data.get('isFetching');
    //const services = data.get('$$services');
    //const selected = data.get('selected');
    //let serviceSelection = data.get('serviceSelection');
    let { serviceSelection, selectedAddOn }  = this.state;
    console.log("lists " + serviceSelection );
    let services = this.state.services.get(0);
    let isFetching = this.state.isFetching;
    if(services != null) {
      serviceNodes = services.map(($$service, index) => {
        return (
          $$service.get('add_on') ?
            <AddOn
              key={$$service.get('id')}
              selectAddOn={this.selectAddOn}
              deSelectAddOn={this.deselectAddOn}
              addOnId={$$service.get('id')}
              addOnName={$$service.get('service_name')}
              addOnDescription={$$service.get('service_description')}
              addOnPrice={$$service.get('service_price')}
              selected={selectedAddOn.includes($$service.get('id'))}
            />
            :
            <Service
              key={$$service.get('id')}
              serviceName={$$service.get('service_name')}
              serviceDescription={$$service.get('service_description')}
              serviceInfo={$$service.get('service_info')}
              selected={serviceSelection.includes($$service.get('id'))}
              actions={actions}
              serviceId={$$service.get('id')}
              sectionId={sectionId}
              serviceSelection={serviceSelection}
              selectService={this.selectService}
              deSelectService={this.deSelectService}
            />
        )
    });
    }
    /* eslint-disable react/no-danger */
    return (

      <div id={css.section}>
          <h2 className="left-align" id={css.sectionName}>
            {sectionName}
            <hr />
          </h2>
        <section className={css.servicesSection}>
          <section style={{display: isFetching ? '' : 'none'}} id={css.loader}>
            <div className="preloader-wrapper big active">
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
          </section>
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            component="section"
          >
            {serviceNodes}
          </ReactCSSTransitionGroup>
        </section>


        <div className="card-action right-align">
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
         {/*   {sectionId==sectionSelection ?
              <a href={`/sections/${sectionId}/services`} className="waves-effect waves-light btn blue ">Select</a>
              : ''}*/}

          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
