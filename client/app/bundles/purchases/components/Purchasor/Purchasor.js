import React from 'react';


const Purchasor = () => {
  return (
    <section className="PurchaseApp" style={styles.container}>
      <div>
        <div style={styles.div}>

          <h5>Current Price:</h5>
          <hr />
          <h5>$2.24</h5><small className="h5">for zip code: 78751</small>
          <h5 style={styles.green}>Find your price:</h5>

          <hr />
          <br />

          <div style={styles.textField}>
            <input
              id="number"
              type="text"
              label="Zip Code"
              autoFocus
              //value={this.props.zip}
              //onChange={this.handleChange('zip')}

              style={styles.text}
              //margin="normal"
            />
            <br />
            <button color="primary" > FIND PRICE </button>
          </div>
        </div>

      </div>
    </section>
  )
};
export default Purchasor;

const styles = {
  container: {
    padding: 3,
  },
  green: { color: '#26a69a' },
  div: { padding: 5 },
  textField: { textAlign: 'center' },
  text: {
    fontSize: '2.5em',
    width: '50%',

  }
};