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
      serviceSelection: null,
    };
    _.bindAll(this, ['fetchServices', 'selectService']);
  }
  componentDidMount() {
    console.log("compon " +this.state.services);
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
      .catch(error => error)
  }
/*  selectSection() {
    const { actions } = this.props;
    const sectionId = this.props.sectionId;
    //actions.selectSection(sectionId);
  }*/
  selectService(serviceId) {
    this.setState({serviceSelection: serviceId})
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
    let serviceSelection = this.state.serviceSelection;
    let services = this.state.services.get(0);
    let isFetching = this.state.isFetching;

    if(services != null) {
      serviceNodes = services.map(($$service, index) => {
        return (
          $$service.get('add_on')  == true ?
            <AddOn addOnName="hello"/>
            :
            <Service
              key={$$service.get('id')}
              serviceName={$$service.get('service_name')}
              serviceDescription={$$service.get('service_description')}
              serviceInfo={$$service.get('service_info')}
              selected={serviceSelection==$$service.get('id')}
              actions={actions}
              serviceId={$$service.get('id')}
              sectionId={sectionId}
              serviceSelection={serviceSelection}
              selectService={this.selectService}
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


        <div className="card-action center-align">
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
