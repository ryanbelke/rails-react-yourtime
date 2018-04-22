import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './Workplace.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Workplace extends BaseComponent {
  static propTypes = {
    workplaceName: PropTypes.string.isRequired,
    workplaceDescription: PropTypes.string.isRequired,
    workplaceInfo: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectWorkplace');
  }

  selectWorkplace() {
    const { actions } = this.props;
    const workplaceId = this.props.workplaceId;
    actions.selectWorkplace(workplaceId);
  }

  render() {
    const { workplaceName, workplaceDescription,
            workplaceInfo, workplaceId, workplaceSelection, slug } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (
      <div
        onClick={this.selectWorkplace}
        className={`card sticky-action card-panel ${workplaceId==workplaceSelection ?
          css.selectedWorkplace : ''}`}>
        <div className="card-image workplace-image">
          <h3 className="left-align">
            {workplaceName}
            <i className="material-icons right activator">info_outline</i></h3>
        </div>
        <div className="card-content">
          <p> {workplaceDescription} </p>
        </div>
        <div className="card-action center-align">
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {workplaceId==workplaceSelection ?
              <a href={`/workplaces/${slug}/categories?workplace=${slug}`} className="waves-effect waves-light btn blue ">Select</a>
              : ''}
          </ReactCSSTransitionGroup>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">More Info
            <hr /><br />
            <i className="material-icons right">close</i></span>
          <p> {workplaceInfo}</p>
        </div>
      </div>

    );
  }
}
