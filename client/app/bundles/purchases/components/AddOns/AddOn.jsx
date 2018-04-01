import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './AddOn.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AddOn extends BaseComponent {
  static propTypes = {
    addOnName: PropTypes.string.isRequired,
    addOnDescription: PropTypes.string.isRequired,
    //addOnPrice: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, ['selectAddOn', 'deSelectAddOn']);
  }

  selectAddOn() {
    const addOnId = this.props.addOnId;
    this.props.selectAddOn(addOnId);

  }
  deSelectAddOn() {
    const addOnId = this.props.addOnId;
    this.props.deSelectAddOn(addOnId);

  }

  render() {

    const { addOnName, addOnId, addOnSelection, addOnDescription, addOnInfo,
           addOnPrice, selected } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (
      <div
        onClick={selected ? this.deSelectAddOn : this.selectAddOn}
        className={`card sticky-action card-panel addOns ${css.addOn} ${selected ?
          css.selectedAddOn : ''}`}>
        <div className={`card-title left-align + ${css.subtitles}`}>
          {addOnName}

          <small className={css.purple}> &nbsp; ${addOnPrice}</small>
        {/*  <i className="material-icons right activator">info_outline</i>*/}
          <hr />
        </div>

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
            {selected ? <h5 className={css.green}>&#10004;</h5> : ''}
          </ReactCSSTransitionGroup>
        </div>
{/*        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
            More Info <hr /><br/>
          </span>
          <p>
            {addOnInfo}
          </p>
        </div>*/}
      </div>

    );
  }
}
