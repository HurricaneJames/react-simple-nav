import React from 'react';

import Button from './Button';


var ButtonGroup = React.createClass({
  displayName: 'ButtonGroup',
  propTypes: {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      id:  React.PropTypes.string.isRequired,
    })),
    onClick: React.PropTypes.func
  },
  render: function() {
    return (
      <ul>
      {
        this.props.buttons &&
        this.props.buttons.map((button) => {
          return (
            <li key={button.id}>
              <Button {...button} onClick={this.props.onClick} small />
            </li>
          );
        })
      }
      </ul>
    );
  }
})

var SimpleNav = React.createClass({
  displayName: 'SimpleNav',
  propTypes: {
    sticky: React.PropTypes.bool,
    buttons: React.PropTypes.shape({
      left:   React.PropTypes.array,
      center: React.PropTypes.array,
      right:  React.PropTypes.array
    }),
    onClick: React.PropTypes.func
  },
  render: function() {
    var leftButtons   = this.props.buttons && this.props.buttons.left   || [];
    var centerButtons = this.props.buttons && this.props.buttons.center || [];
    var rightButtons  = this.props.buttons && this.props.buttons.right  || [];
    return (
      <div>
        <ButtonGroup buttons={leftButtons}   onClick={this.props.onClick} />
        <ButtonGroup buttons={centerButtons} onClick={this.props.onClick} />
        <ButtonGroup buttons={rightButtons}  onClick={this.props.onClick} />
      </div>
    );
  }
});

module.exports = SimpleNav;