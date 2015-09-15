import expect from 'expect.js';
import sinon from 'sinon';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import SimpleNav from '../src/SimpleNav';
import Button from '../src/Button';

describe('SimpleNav', () => {
  it('should not crash with no props', () => {
    expect(() => TestUtils.renderIntoDocument(<SimpleNav />)).not.to.throwException();    
  });

  it('should display a button for each item', () => {
    var buttons = {
      left:   [{ id: '1', name: 'one' }],
      center: [{ id: '2', name: 'two' }],
      right:  [{ id: '3', name: 'three' }]
    };
    var nav = TestUtils.renderIntoDocument(<SimpleNav buttons={buttons} />);
    var buttons = TestUtils.scryRenderedDOMComponentsWithTag(nav, 'li');
    expect(buttons.length).to.be(3);
  });

  describe('buttons', () => {
    var nav, buttonProps, buttons;
    var spyFn;
    beforeEach(() => {
      spyFn = sinon.spy();
      buttonProps = {
        left:   [{ id: 'icon-src', icon: { link: 'http://google.com/image.jpg' } }],
        center: [{ id: 'icon-class', icon: { className: 'my-icon-class' } }],
        right:  [
          { id: 'name', name: 'two' },
          { id: 'name+icon-src',   icon: { link: 'http://facebook.com/image.jpg' } },
          { id: 'name+icon-class', icon: { className: 'my-icon-class-with-name' } },
          { id: 'name+icon-all',   icon: { className: 'my-icon-class-with-all', link: 'http://twitter.com/image.jpg' } }
        ]
      };
      nav = TestUtils.renderIntoDocument(<SimpleNav buttons={buttonProps} onClick={spyFn} />);
      buttons = TestUtils.scryRenderedComponentsWithType(nav, Button);
    });

    it('should render all the buttons', () => {
      expect(buttons.length).to.be(buttonProps.left.length + buttonProps.center.length + buttonProps.right.length);    
    });

    it('should render the correct props', () => {
      expect(buttons[0].props.id).to.be(buttonProps.left[0].id);
      expect(buttons[1].props.id).to.be(buttonProps.center[0].id);
    });

    it('should pass through the onClick', () => {
      expect(buttons[0].props.onClick).to.be(spyFn);
    });
  });

  it('should have three columns (left, center, right), with the matching button props', () => {
    var buttonProps = {
      left:   [{ id: 'icon-src', icon: { link: 'http://google.com/image.jpg' } }],
      center: [],
      right:  [{ id: 'name', name: 'two' }]
    };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SimpleNav buttons={buttonProps} />);
    var button = shallowRenderer.getRenderOutput();
    expect(button.props.children.length).to.be(3);
    expect(button.props.children[0].props.buttons).to.be(buttonProps.left);
    expect(button.props.children[1].props.buttons).to.be(buttonProps.center);
    expect(button.props.children[2].props.buttons).to.be(buttonProps.right);
  });
});