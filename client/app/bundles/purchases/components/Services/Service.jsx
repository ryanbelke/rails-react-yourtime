import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './Service.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Service extends BaseComponent {
  static propTypes = {
    serviceName: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectService');
  }

  selectService() {
    const { actions } = this.props;
    const serviceId = this.props.serviceId;
    actions.selectService(serviceId);
  }

  render() {
    const { serviceName, serviceId, serviceSelection, serviceTime,
      serviceInfo, serviceDescription, servicePicture,
      serviceVendor, servicePrice, sectionId } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (
      <div
        onClick={this.selectService}
        className={`card sticky-action card-panel services ${css.service} ${serviceId==serviceSelection ?
          css.selectedService : ''}`}>
        <div className="card-image card-gradient">
          {servicePicture}
        </div>
        <div className="card-title">
          {serviceName}
          <i className="material-icons right activator">info_outline</i>
          <hr />
        </div>
        <section className={css.subtitles}>
          <span className={css.subtitle}>
          ${servicePrice}
        </span>
          <span className={css.subtitle}>
          <small> &nbsp; Time:</small>
            {serviceTime}

        </span>
          <span className={css.subtitle}>
          <small>&nbsp; Vendor: </small>{serviceVendor}
        </span>
        </section>
        <div className="card-content">
          <p>{serviceDescription}</p>
        </div>
        <div className="card-action center-align">
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {serviceId==serviceSelection ?
              <a href={`/sections/${sectionId}/services/${serviceId}?appointment`} className="waves-effect waves-light btn blue ">Select</a>
              : ''}
          </ReactCSSTransitionGroup>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
            More Info <hr /><br/>
          </span>
          <p>
            {serviceInfo}
          </p>
        </div>
      </div>

    );
  }
}
