import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';
import { appCss } from '../../assets/css/AppCss';

export default function Header(props) {
  return <Text style={appCss.header} {...props} />
}