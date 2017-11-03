import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Navigation from '../index';


it('should render an <ul> tag', () => {
  const renderedComponent = shallow(<Navigation />);
  expect(renderedComponent.find('ul')).to.have.length(1);
});

it('should render an <li> tag', () => {
  const renderedComponent = shallow(<Navigation />);
  expect(renderedComponent.find('li')).to.have.length(6);
});
it('should render an <div> tag', () => {
  const renderedComponent = shallow(<Navigation />);
  expect(renderedComponent.find('span')).to.have.length(1);
});
it('should render the logo', () => {
  const renderedComponent = shallow(<Navigation />);
  expect(renderedComponent.find('span').text()).to.equal('hshtgd');
});
