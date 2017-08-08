/**
 * @Nick: Timo.Dev
 * @Name: Nông Văn Thân
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainComponent from './components/MainComponent'

export default class BinhAnStore extends Component {
  render() {
    return (
      <MainComponent/>
    );
  }
}

AppRegistry.registerComponent('BinhAnStore', () => BinhAnStore);
