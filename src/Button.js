import React from 'react';
import * as Styles from './Styles';

var Button = React.createClass({
  displayName: 'Button',
  propTypes: {
    id:  React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    icon: React.PropTypes.shape({
      link: React.PropTypes.string,
      className: React.PropTypes.string
    }),
    small: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },
  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.props.onClick) { this.props.onClick(this.props.id); }
  },
  render: function() {
    var style = this.props.small ? Styles.button.small : Styles.button.large;
    return (
      <a href='#' onClick={this.onClick}>
      {
        this.props.icon && this.props.icon.link &&
        <img src={this.props.icon.link} style={style.img} />
      }
      {
        this.props.icon && this.props.icon.className &&
        <span className={this.props.icon.className}>&nbsp;</span>
      }
      {
        this.props.name &&
        <span>{this.props.name}</span>
      }
      </a>
    );
  }

});

module.exports = Button;