import { StyleSheet } from "react-native";

const opacity = 'rgba(0, 0, 0, .6)';
const qrCodeCss = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: opacity,
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 5,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});

export {qrCodeCss};