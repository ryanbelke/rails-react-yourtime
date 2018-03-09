import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Category from './Category';
import css from './Categories.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Categories extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$categories: Immutable.fromJS([]),
      fetchCategoriesError: null,
      isFetching: false,
    };
    _.bindAll(this, 'fetchCategories');

  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    const  { data, actions } = this.props;
    const location = data.getIn(['railsContext', 'location']);
    const workplace = location.split('workplace=')[1];
    actions.fetchCategories(workplace);

  }
  render() {
    const  { data, actions }   = this.props;
    let categoryNodes = null;
    const isFetching = data.get('isFetching');
    const categories = data.get('$$categories');
    const selected = data.get('selected');
    let category = data.get('category');
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    if(categories != null) {
       categoryNodes = categories.map(($$category, index) =>
        (<Category
          key={$$category.get('id')}
          categoryName={$$category.get('category_name')}
          categoryDescription={$$category.get('category_description')}
          categoryIcon={$$category.get('category_icon')}
          catgoryInfo={$$category.get('category_info')}
          selected={selected}
          actions={actions}
          categoryId={$$category.get('id')}
          category={category}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <section className={css.categoriesSection}>
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
        {categoryNodes}
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}
export default Categories;