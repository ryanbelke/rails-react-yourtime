import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Section from './Section';
import css from './SectionsComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SectionsComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$sections: Immutable.fromJS([]),
      fetchSectionsError: null,
      isFetching: false,
    };
    _.bindAll(this, 'fetchSections');

  }

  componentDidMount() {
    this.fetchSections();
  }

  fetchSections() {
    const  { data, actions } = this.props;
    //const locationUrl = data.getIn(['railsContext', 'location']);
    //const workplace = location.split('workplace=')[1];
    actions.fetchSections();

  }
  render() {
    const  { data, actions }   = this.props;
    let sectionNodes = null;
    const isFetching = data.get('isFetching');
    const sections = data.get('$$sections');
    const selected = data.get('selected');
    let sectionSelection = data.get('sectionSelection');
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    if(sections != null) {
      sectionNodes = sections.map(($$section, index) =>
        (<Section
          key={$$section.get('id')}
          sectionName={$$section.get('section_name')}
          selected={selected}
          actions={actions}
          sectionId={$$section.get('id')}
          sectionSelection={sectionSelection}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <section className={css.sectionsSection}>
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
          component="span"
          className={css.transition}
        >
          {sectionNodes}
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}
export default SectionsComponent;