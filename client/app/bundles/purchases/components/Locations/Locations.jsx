import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Location from './Location';
import css from './Locations.scss';
import BaseComponent from 'libs/components/BaseComponent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Locations extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      $$locations: Immutable.fromJS([]),
      fetchLocationsError: null,
      isFetching: false,
    };
    _.bindAll(this, 'fetchLocations');

  }

  componentDidMount() {
    this.fetchLocations();
  }

  fetchLocations() {
    const  { data, actions } = this.props;
    //const locationUrl = data.getIn(['railsContext', 'location']);
    //const workplace = location.split('workplace=')[1];
    actions.fetchLocations();

  }
  render() {
    const  { data, actions }   = this.props;
    let locationNodes = null;
    const isFetching = data.get('isFetching');
    const locations = data.get('$$locations');
    const selected = data.get('selected');
    let locationSelection = data.get('locationSelection');
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    if(locations != null) {
      locationNodes = locations.map(($$location, index) =>
        (<Location
          key={$$location.get('id')}
          locationName={$$location.get('location_name')}
          locationDescription={$$location.get('location_description')}
          locationAddress={$$location.get('location_address')}
          selected={selected}
          actions={actions}
          locationId={$$location.get('id')}
          locationSelection={locationSelection}
        />),
      );
    }
    /*    const { dispatch, data } = this.props;
     const actions = bindActionCreators(commentsActionCreators, dispatch);
     const locationState = this.props.location.state;*/
    return (
      <section className={css.locationsSection}>
        <div style={{display: isFetching ? '' : 'none'}} id={css.loader}>
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
        </div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          component="section"
          className={css.transition}
        >
          {locationNodes}
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}
export default Locations;