import React from 'react';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import _ from 'lodash';

import NavBar from 'components/Navigation/NavBar';
import Hamburger from 'components/Navigation/Hamburger';
/*  eslint jsx-quotes: ['error', 'prefer-single'] */
class Navigation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    _.bindAll([
      'handleOpen',
    ]);
  }

  handleOpen = () => this.setState({ open: !this.state.open });

  render() {
    const fullNav = (
      <NavBar background={this.props.background}>
        <span style={styles.logoFont}>hashtgd</span>
        <ul>
          <li style={styles.logo}>
            <Button color='contrast' style={styles.logoFont} href='/'>
              hashtgd
            </Button>
          </li>
          <div>

            <li>
              <Button color='contrast' href='/orthodontists' style={styles.button}>
                FOR ORTHODONTISTS
              </Button>
            </li>
            <li>
              <Button color='contrast' style={styles.button} href='/thesite'>
                WHAT WE OFFER
              </Button>
            </li>
            <li>
              <Button color='contrast' style={styles.button} href='/pricing'>
                WHAT'S IT COST?
              </Button>
            </li>
            <li>
              <Button color='contrast' style={styles.button} href='/book'>
                BOOK ONLINE
              </Button>
            </li>

            <li>
              <Button color='contrast' href='/contact' style={styles.button}>
                CONTACT US
              </Button>
            </li>
            <li>
              <Button color='contrast' style={styles.button} href="/about">
                ABOUT US
              </Button>
            </li>
          </div>
        </ul>
      </NavBar>
    );

    const sideNav = (
      <div>
        <ListItem >
          <Hamburger >
            <Button style={styles.darkBurger} onClick={this.handleOpen}>
              &#8801;
            </Button>
          </Hamburger>
        </ListItem>
        <br />


        <List className='list' disablePadding>
          <ListItem>
            <Button color='contrast' href='/' style={styles.button} >
             <ListItemText primary='Home' />
            </Button>
          </ListItem>
          <Divider />

          <ListItem>
            <Button color='contrast' style={styles.button} href='/orthodontists'>
              <ListItemText primary='FOR ORTHODONTISTS' />
            </Button>

          </ListItem>
          <Divider />

          <ListItem>
            <Button color='contrast' style={styles.button} href='/pricing'>
              <ListItemText primary="WHAT'S IT COST" />
            </Button>

          </ListItem>
          <Divider />
          <ListItem>
            <Button color='contrast' style={styles.button} href='/thesite'>
              <ListItemText primary='What we can do' />

            </Button>

          </ListItem>
          <Divider />
          <ListItem >
            <Button color='contrast' style={styles.button} href='/book'>
              <ListItemText primary='Book Online' />
            </Button>

          </ListItem>
          <Divider />
          <ListItem >
            <Button color='contrast' style={styles.button} href="/about">
              <ListItemText primary='About' />

            </Button>
          </ListItem>
          <Divider />
          <ListItem button href="/contact">
            <Button color='contrast' href='/contact' style={styles.button}>
              <ListItemText primary='Contact' />

            </Button>

          </ListItem>
          <Divider />

        </List>

      </div>
    );

    return (

      <section>
        <Drawer
          open={this.state.open}
          onRequestClose={this.handleOpen}
          onClick={this.handleOpen}
          anchor='left'
          style={styles.drawer}
          className='drawer'
        >
          {sideNav}
        </Drawer>
        <Hamburger >
          <Button onClick={this.handleOpen} color='contrast' style={styles.lightBurger}>
            &#8801;
          </Button>

        </Hamburger>
        {fullNav}
      </section>
    );
  }
}
const styles = {
  drawer: { paddingTop: 50 },
  logoFont: { fontSize: 25, textTransform: 'uppercase', fontWeight: 'bold', color: 'white', padding: 5 },
  darkBurger: { fontSize: 35, color: 'gray', padding: 10, },
  lightBurger: { fontSize: 40, color: 'white' }

};

export default Navigation;
