import { StyleSheet } from "react-native";

const appCss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPage: {
    backgroundColor: '#363636',
    padding: 20,
  },
  buttonQrCode: {
    margin: 'auto',
    alignItems: 'center',
  },
  textWhite: {
    color: '#FFF',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonImage: {
    maxWidth: 120,
    maxHeight: 120,
  },
  qr__code:(display='flex') => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    display: display,
  }),
});

export {appCss};