import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { theme } from '../core/theme';

export default function Logo() {
  return (
    <View style={styles.background}>
      <Image source={require('../../assets/image/en-app-logo.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 110,
  },
  background: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
  },
})