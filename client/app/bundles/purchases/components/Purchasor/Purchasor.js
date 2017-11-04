import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';
import { CSSTransitionGroup } from 'react-transition-group';

import css from './Purchasor.scss';

class Purchasor extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { id: 'submitButton', click: 0, price: null, zip: '', display: 'display', noDisplay: 'noDisplay' }
  }
  onSubmit = () => {
    if (this.state.click===0) {
      this.setState({ segment: 'processing', click: this.state.click+1 });
      setTimeout(() => {
        this.setState({ segment: 'done', price: '$2.32', display: 'noDisplay', noDisplay: 'display', id: 'checkMark' });
      }, 2000);
    } else {
      console.log("second submit")
    }
  };

  handleChange = (event) => {
    let zip = event.target.value;
    this.setState( { zip: zip } );
  };

  handleSubmit = () => {
    window.location.replace('/purchase')
  };
  render() {
    let currentState = this.state.segment;
    let inputNode;

    if (this.state.click===0) {
      inputNode =
        <input
          id="number"
          type="text"
          label="Zip Code"
          autoFocus
          key={this.state.click}
          value={this.state.zip}
          onChange={this.handleChange}
          style={styles.text}
        />
    } else {
      if(this.state.segment==='done') {
      inputNode =
        <div style={styles.textField}> <h5 key={this.state.click}>{this.state.zip} <br /> Price: {this.state.price}</h5></div>
        }
    }
  //Staes are processing and done
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <section className="PurchaseApp" style={styles.container}>
        <div>
          <div style={styles.div}>
            <h5>Current Price:</h5>
             <hr />
            <h5>$2.24</h5>
            <small className="h5">for zip code: 78751</small>
            <h5 style={styles.green}>Find your price:</h5>
              <hr />
             <br />
            <div style={styles.center}>
              <span style={styles.center}>Zip Code</span>
            </div>
            <div style={styles.textField}>
            <CSSTransitionGroup
              transitionName={cssTransitionGroupClassNames}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {inputNode}
             </CSSTransitionGroup>
            </div>
            <div style={styles.textField}>
              <button id={this.state.id} className={currentState  } onClick={this.onSubmit}>
                <span>Submit</span>
                <span>&#10004;</span>
              </button>
              <br />
              <button id='submitButton' className={this.state.noDisplay} onClick={this.handleSubmit}>
                <span>BUY NOW</span>
              </button>

            </div>
          </div>
        </div>
      </section>
    )
  }
};
export default Purchasor;

const styles = {
  container: { padding: 3,},
  center: { textAlign: 'center' },
  green: { color: '#26a69a' },
  div: { padding: 5 },
  textField: { textAlign: 'center' },
  text: {
    fontSize: '2.0em',
    width: '50%',

  }
};