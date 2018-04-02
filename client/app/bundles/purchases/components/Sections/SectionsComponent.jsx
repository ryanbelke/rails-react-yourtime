import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Section from './Section';
import css from './SectionsComponent.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withCookies, Cookies } from 'react-cookie';

class SectionsComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$sections: Immutable.fromJS([]),
      fetchSectionsError: null,
      isFetching: false,
      continueButton: Immutable.fromJS([]),
      selections: Immutable.List(),
      addOnSelections: Immutable.List(),
    };
    _.bindAll(this, ['fetchSections', 'continueButton', 'selectAddOn']);

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

  continueButton(serviceSelection, action, serviceId, services) {
    const { cookies } = this.props;
    let selections = this.state.selections;
    let servicesInRow = Immutable.List();
    if (action == 1) {
      services.map(($$service) => {
        $$service.map(($ser) => {
            servicesInRow = servicesInRow.push($ser.get('id'));
          }
        )
      });
      console.log("servicesInRow = " + servicesInRow);
      console.log("selections = " + selections);
      //iterate over all items in selections
      selections.forEach(($$selection) => {
        if (servicesInRow.includes($$selection)) {
          //remove every selection but serviceId
          console.log("remove all servicesInRow except serviceId ");
          if($$selection != serviceId) {
            console.log("$$selection != serviceId " + $$selection);
            let index = selections.indexOf($$selection);
            console.log("index = " + index);
            selections = selections.remove(index);
            this.setState({selections: selections});
            console.log("state = " + this.state.selections);

          }
        }
      });
      //need to take the items in list thats passed in and add them to selections List
      serviceSelection.size == 0 ?
          this.setState({selections: selections.push(serviceSelection.get(0))})
      :
        serviceSelection.forEach(($$service, index) =>
          this.setState({selections: selections.push($$service)})
        );

    } else if (action == 2) {
      let indexPosition = selections.indexOf(serviceId);
      selections = selections.remove(indexPosition);
      this.setState({selections: selections});
      cookies.set('services', selections);
    }
  }

  selectAddOn(addOnList) {
    this.setState({ addOnSelections: addOnList })
  }
  render() {
    const  { data, actions, cookies }   = this.props;
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
    console.log("cookie = " + JSON.stringify(cookies.get('services')))
    cookies.set('services', this.state.selections, { path: '/' });


    if(sections != null) {
      sectionNodes = sections.map(($$section, index) =>
        (<Section
          key={$$section.get('id')}
          sectionName={$$section.get('section_name')}
          selected={selected}
          actions={actions}
          sectionId={$$section.get('id')}
          data={data}
          continueButton={this.continueButton}
          selectAddOn={this.selectAddOn}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <div>
        <section className={css.sectionsSection}>
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
          <section>
            <ReactCSSTransitionGroup
              transitionName={cssTransitionGroupClassNames}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
              component="span"
            >
              {sectionNodes}
            </ReactCSSTransitionGroup>
          </section>
          <br />

        </section>
        <div className={css.continueButton}>
          {this.state.selections.size > 0 ?
            <a className="btn pulse" href="/services/booking" id={css.button}>
             <span>Continue <i className="material-icons">arrow_forward</i></span></a>
            : ''}
        </div>
      </div>
    );
  }
}
export default withCookies(SectionsComponent);