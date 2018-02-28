import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './Location.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Location extends BaseComponent {
  static propTypes = {
    locationName: PropTypes.string.isRequired,
    locationDescription: PropTypes.string.isRequired,
    locationAddress: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectLocation');
  }

  selectLocation() {
    const { actions } = this.props;
    const locationId = this.props.locationId;
    actions.selectLocation(locationId);
  }

  render() {
    const { locationName, locationDescription,
        locationAddress, locationId, locationSelection} = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (

      <div
        onClick={this.selectLocation}
        className={`card sticky-action card-panel ${css.location}
        ${locationId==locationSelection ? css.selectedLocation : ''}`}>
        <div className="card-image location-image">

          <h3 className="left-align">
            {locationName}
            <i className="material-icons right activator">info_outline</i></h3>
        </div>
        <div className="card-content">
          <p> {locationDescription} </p>
        </div>
        <div className="card-action center-align">
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {locationId==locationSelection ?
              <a href={`/locations/${locationId}/sections`} className="waves-effect waves-light btn blue ">Select</a>
              : ''}
          </ReactCSSTransitionGroup>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">More Info
            <hr /><br />
            <i className="material-icons right">close</i></span>
          <p> {locationAddress}</p>
        </div>
      </div>

    );
  }
}
