import BaseComponent from 'libs/components/BaseComponent';
import React from 'react';
import Script from 'react-load-script'
import { Input, Preloader } from 'react-materialize';
import _ from 'lodash';

export default class EditDropDown extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,
      scriptError: false,
    };
    _.bindAll(['handleScriptError', 'handleScriptLoad', 'selectWorkplace'])
  }
  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  componentDidMount() {
    this.props.workplace ?
      this.selectWorkplace()
      : null
  }
  selectWorkplace() {
    const { actions } = this.props;
    actions.getWorkplaces();
  }

  render() {
    let editNode;
    let { workplace, category, location, service, booking, actions, data } = this.props;
    const isFetching = data.get('isFetching');
    let workplaces = data.get('$$workplaces')
    console.log("work " + workplaces)
    let option = workplaces.map((workplace, index) => {
      console.dir("data " + workplace)
      return <option value="1">Hello</option>

    })

    //this.selectWorkplace.bind(this)
    if(workplace) {
      editNode =
        <div>
          <Input s={12} type='select' label="Workplace" defaultValue={booking.workplace_id}>
            <option value="default" key="default">Select Workplace</option>
            { workplaces.map((workplace, index) => {
                return <option key={workplace.get('id')} value={workplace.get('workplace_name')}>
                    {workplace.get('workplace_name')}
                </option>
              })}
          </Input>
              <Input s={12} type='select' label="Location" defaultValue='2'>
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </Input>

        </div>
    } else if(category) {

    } else if(location) {

    } else if(service) {

    } else {
      editNode = <small>No Edit Selected</small>
    }
    return (
      <div>
          <Script
            url="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
          {this.state.scriptLoaded ? editNode : null}
      </div>
    )
  }

}