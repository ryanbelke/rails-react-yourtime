import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './Category.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Category extends BaseComponent {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    categoryDescription: PropTypes.string.isRequired,
    categoryIcon: PropTypes.string.isRequired,

    //categoryInfo: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    _.bindAll(this, 'selectCategory');
  }

  selectCategory() {
    const { actions } = this.props;
    const categoryId = this.props.categoryId;
    actions.selectCategory(categoryId);
  }

  render() {
    const { categoryName, categoryDescription,
      categoryIcon, categoryInfo, categoryId, category} = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    /* eslint-disable react/no-danger */
    return (
        <div
          onClick={this.selectCategory}
          className={`card sticky-action card-panel ${categoryId==category ?
            css.selectedCategory : ''}`}>
          <div className="card-image category-image">
            <i className={`fa ${categoryIcon} fa-5x activator`} id="fa-icon"></i>
            <h3 className="left-align">
              {categoryName}
              <i className="material-icons right activator">info_outline</i></h3>
          </div>
          <div className="card-content">
            <p> {categoryDescription} </p>
          </div>
          <div className="card-action center-align">
            <ReactCSSTransitionGroup
              transitionName={cssTransitionGroupClassNames}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {categoryId==category ?
                <a href={`/categories/${categoryId}/locations`} className="waves-effect waves-light btn blue ">Select</a>
                : ''}
            </ReactCSSTransitionGroup>
          </div>
          <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">More Info
            <hr /><br />
            <i className="material-icons right">close</i></span>
            <p> {categoryInfo}</p>
          </div>
        </div>

    );
  }
}
