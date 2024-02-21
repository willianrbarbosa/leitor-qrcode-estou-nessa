import { StyleSheet } from "react-native";
import { theme } from "../../src/core/theme";

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
  header: {
    fontSize: 21,
    color: theme.colors.estounessa,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  textPage: {
    backgroundColor: '#363636',
    padding: 20,
  },
  buttonQrCode: {
    margin: 'auto',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 120,
    borderWidth: 2,
    borderColor: theme.colors.estounessa,
    borderRadius: 20,
  },
  textWhite: {
    color: '#FFF',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.estounessa,
  },
  buttonTextOutlined: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.surface,
  },
  buttonTextSecondary: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.secondary,
  },
  buttonImage: {
    maxWidth: 120,
    maxHeight: 80,
  },
  barCodeScanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 80,
  },
  qr__code:(display='flex') => ({
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    display: display,
  }),
  leituraCard: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.estounessa,
    backgroundColor: theme.colors.surface,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.64,
    elevation: 6,
    marginBottom: 8,
  },
  leituraText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.estounessa,
  },
  leituraData: {
    fontWeight: 'light',
    fontSize: 12,
    color: theme.colors.estounessa,
  },
  leituraTextSecondary: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.secondary,
  },
  leituraDataSecondary: {
    fontWeight: 'light',
    fontSize: 12,
    color: theme.colors.secondary,
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 80,
  },
});

export {appCss};