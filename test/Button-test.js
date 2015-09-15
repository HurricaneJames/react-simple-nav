import expect from 'expect.js';
import sinon from 'sinon';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Button from '../src/Button';

describe('Button', () => {
  it('should not crash with no props', () => {
    var sandbox = sinon.sandbox.create();
    sandbox.stub(console, 'log');
    sandbox.stub(console, 'warn');
    sandbox.stub(console, 'error');
    expect(() => TestUtils.renderIntoDocument(<Button />)).not.to.throwException();
    sandbox.restore();
  });

  const SAMPLE_IMAGE = 'http://google.com/image.jpg';
  const SAMPLE_CLASS = 'my-class';
  const SAMPLE_NAME  = 'My Name';
  it('should display the image if provided', () => {
    var button = TestUtils.renderIntoDocument(<Button id="1" icon={{link: SAMPLE_IMAGE}} />);
    var image = TestUtils.findRenderedDOMComponentWithTag(button, 'img');
    expect(image.src).to.be(SAMPLE_IMAGE);
  });
  it('should display a span with the icon.className if provided', () => {
    var button = TestUtils.renderIntoDocument(<Button id="1" icon={{className: SAMPLE_CLASS}} />);
    var buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(button, 'span');
    expect(buttonComponents.length).to.be(1);
    expect(buttonComponents[0].className).to.be(SAMPLE_CLASS);
    expect(buttonComponents[0].textContent).to.be('\xa0');
  });
  it('should display a span with the name if provided', () => {
    var button = TestUtils.renderIntoDocument(<Button id="1" name={SAMPLE_NAME} />);
    var buttonComponents = TestUtils.scryRenderedDOMComponentsWithTag(button, 'span');
    expect(buttonComponents.length).to.be(1);
    expect(buttonComponents[0].textContent).to.be(SAMPLE_NAME);
  });
  it('should display image -> icon -> name', () => {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <Button id="1" name={SAMPLE_NAME} icon={{ link: SAMPLE_IMAGE, className: SAMPLE_CLASS }} />
    );
    var button = shallowRenderer.getRenderOutput();
    expect(button.props.children.length).to.be(3);

    // 1. image link
    expect(button.props.children[0].type).to.be('img');
    expect(button.props.children[0].props.src).to.be(SAMPLE_IMAGE);
    
    // 2. the span with className (for font icons)
    expect(button.props.children[1].type).to.be('span');
    expect(button.props.children[1].props.className).to.be(SAMPLE_CLASS);

    // 3. span with name as text
    expect(button.props.children[2].type).to.be('span');
    expect(button.props.children[2].props.children).to.be(SAMPLE_NAME);
  });
  it('should call the onClick callback with the `id` of the button that was clicked', () => {
    var spyFn = sinon.spy();
    var id = 'one';
    var button = TestUtils.renderIntoDocument(<Button id={id} name="a" onClick={spyFn} />);
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, 'a'));
    expect(spyFn.callCount).to.be(1);
    expect(spyFn.args[0][0]).to.be(id);
  });

  it('should apply small styling when given the small prop');
});