import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Workplace from './Workplace';
import css from './WorkplacesComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class WorkplacesComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$workplaces: Immutable.fromJS([]),
      fetchWorkplacesError: null,
      isFetching: false,
    };
    _.bindAll(this, 'fetchWorkplaces');

  }

  componentDidMount() {
    this.fetchWorkplaces();
  }

  fetchWorkplaces() {
    const  { data, actions } = this.props;
    const location = data.getIn(['railsContext', 'location']);
    const workplace = location.split('workplace=')[1];
    actions.fetchWorkplaces();

  }
  render() {
    const  { data, actions }   = this.props;
    let workplaceNodes = null;
    const isFetching = data.get('isFetching');
    const workplaces = data.get('$$workplaces');
    const selected = data.get('selected');
    let workplaceSelection = data.get('workplaceSelection');
    
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    if(workplaces != null) {
      workplaceNodes = workplaces.map(($$workplace, index) =>
        (<Workplace
          key={$$workplace.get('id')}
          workplaceName={$$workplace.get('workplace_name')}
          workplaceDescription={$$workplace.get('workplace_description')}
          workplaceInfo={$$workplace.get('workplace_info')}
          selected={selected}
          actions={actions}
          workplaceId={$$workplace.get('id')}
          workplaceSelection={workplaceSelection}
          slug={$$workplace.get('slug')}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <section className={css.workplacesSection}>
        <section style={{display: isFetching ? 'block' : 'none'}} id={css.loader}>
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
          {workplaceNodes}
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}
export default WorkplacesComponent;