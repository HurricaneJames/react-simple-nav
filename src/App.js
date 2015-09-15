import React, { Component } from 'react';
import SimpleNav from './SimpleNav';

export default class App extends Component {
  onClick(name) {
    console.log('name: ', name);
  }

  render() {
    var buttons = {
      left: [
        {
          id: 'main',
          name: 'Creative Commons',
          icon: {
            link: 'https://creativecommons.org/images/deed/cc-logo.jpg',
            className: 'fi-info'
          }
        }
      ],
      center: [
        {
          id: 'center-main',
          name: 'Demo'
        }
      ],
      right: [
        {
          id: 'save',
          name: 'Save'
        },
        {
          id: 'cancel',
          name: 'Cancel'
        }
      ]
    }
    return (
      <SimpleNav buttons={buttons} onClick={this.onClick.bind(this)} />
    );
  }
}

App.displayName = 'SimpleNavDemo';
