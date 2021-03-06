import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Service from './Service';
import css from './ServicesComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ServicesComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$services: Immutable.fromJS([]),
      fetchServicesError: null,
      isFetching: false,
    };
    _.bindAll(this, 'fetchServices');
  }

  componentWillMount() {
    this.fetchServices();
  }

  fetchServices() {
    const  { data, actions } = this.props;
    //const locationUrl = data.getIn(['railsContext', 'location']);
    //const workplace = location.split('workplace=')[1];
    actions.fetchServices(this.props.sectionId);
  }
  render() {
    const  { data, actions, sectionId } = this.props;
    let serviceNodes = null;
    //let location = data.getIn(['railsContext', 'location']);
    //assign sectionId to pass to service for appointment URL
    // sectionId = location.substring(location.lastIndexOf("s/")+2,location.lastIndexOf("/"));

    const isFetching = data.get('isFetching');
    const services = this.state.$$services;
    const selected = data.get('selected');

    let serviceSelection = data.get('serviceSelection');
    //console.log("services = " + services);
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    if(services != null) {
      serviceNodes = services.map(($$service, index) =>
        (<Service
          key={$$service.get('id')}
          serviceName={$$service.get('service_name')}
          serviceDescription={$$service.get('service_description')}
          serviceInfo={$$service.get('service_info')}
          selected={selected}
          actions={actions}
          serviceId={$$service.get('id')}
          sectionId={sectionId}
          serviceSelection={serviceSelection}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
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
    );
  }
}
export default ServicesComponent;