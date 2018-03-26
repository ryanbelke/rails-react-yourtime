import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './AddOn.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AddOn extends BaseComponent {
  static propTypes = {
    addOnName: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectAddOn');
  }

  selectAddOn() {
    const { actions } = this.props;
    const addOnId = this.props.addOnId;
    this.props.selectaddOn(addOnId);

  }

  render() {

    const { addOnName, addOnId, addOnSelection, addOnTime,
      addOnInfo, addOnDescription, addOnPicture,
      addOnVendor, addOnPrice, sectionId, selected } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (
      <div
        onClick={this.selectAddOn}
        className={`card sticky-action card-panel addOns ${css.addOn} ${selected ?
          css.selectedAddOn : ''}`}>
        <div className="card-image card-gradient">
          {addOnPicture}
        </div>
        <div className="card-title">
          {addOnName}
          <i className="material-icons right activator">info_outline</i>
          <hr />
        </div>
        <section className={css.subtitles}>
          <span className={css.subtitle}>
          ${addOnPrice}
        </span>
          <span className={css.subtitle}>
          <small> &nbsp; Time:</small>
            {addOnTime}

        </span>
          <span className={css.subtitle}>
          <small>&nbsp; Vendor: </small>{addOnVendor}
        </span>
        </section>
        <div className="card-content">
          <p>{addOnDescription}</p>
        </div>
        <div className="card-action center-align">
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {/*addOnId==addOnSelection ?
             <a href={`/sections/${sectionId}/addOns/${addOnId}?appointment`} className="waves-effect waves-light btn blue ">Select</a>
             : ''*/}
            {addOnId==addOnSelection ? <h5>Selected</h5> : ''}
          </ReactCSSTransitionGroup>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
            More Info <hr /><br/>
          </span>
          <p>
            {addOnInfo}
          </p>
        </div>
      </div>

    );
  }
}
