import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './Section.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Section extends BaseComponent {
  static propTypes = {
    sectionName: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectSection');
  }

  selectSection() {
    const { actions } = this.props;
    const sectionId = this.props.sectionId;
    actions.selectSection(sectionId);
  }

  render() {
    const { sectionName, sectionId, sectionSelection} = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (

      <div
        onClick={this.selectSection}
        className={`card sticky-action card-panel ${css.section}
        ${sectionId==sectionSelection ? css.selectedSection : ''}`}>


          <h2 className="center-align">
            {sectionName}
          </h2>

        <div className="card-action center-align">
          <ReactCSSTransitionGroup
            transitionName={cssTransitionGroupClassNames}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {sectionId==sectionSelection ?
              <a href={`/sections/${sectionId}/services`} className="waves-effect waves-light btn blue ">Select</a>
              : ''}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}
