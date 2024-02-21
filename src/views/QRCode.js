import React, { useState, useEffect } from 'react';
import { appCss } from "../../assets/css/AppCss";
import { qrCodeCss } from '../../assets/css/QRCodeCss';
import { Text, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
import { theme } from '../core/theme';

export default function QRCodePage() {
  const route = useRoute();
  const nomeSessao = route.params?.nomeSessao;
  const pontoLeitura = route.params?.pontoLeitura;

  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [leituraQRCodes, setLeituraQRCodes] = useState({});
  const [scanned, setScanned] = useState(false);
  const [alertConfig, setAlertConfig ] = useState({
    displayAlert: false,
    title: null,
    message: null,
    type: null,
    confirmText: null,
    confirmButtonColor: null,
  });
  const [displayQR, setDisplayQR ] = useState('flex');

  const getQRCodes = async () => {
    try {
      const leituras = await AsyncStorage.getItem('QRCODES');
      if (leituras !== null) {
        const QRCodes = JSON.parse(leituras);
        setLeituraQRCodes(QRCodes);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    
    getBarCodeScannerPermissions();
    getQRCodes();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    // setDisplayQR('none');
    //appCss.qr__code(displayQR)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    try {
      let QRCodes = {};
      const leituras = await AsyncStorage.getItem('QRCODES');
      if ( leituras ) {
        QRCodes = JSON.parse(leituras);
        QRCodes.sessao = nomeSessao;
        QRCodes.ponto_leitura = pontoLeitura;
        QRCodes.leituras.push({
          texto: data,
          data_hora_leitura: moment().format('DD/MM/YYYY HH:mm:ss')
        });
      } else {
        QRCodes = {
          sessao: nomeSessao,
          ponto_leitura: pontoLeitura,
          leituras: [{
            texto: data,
            data_hora_leitura: moment().format('DD/MM/YYYY HH:mm:ss')
          }]
        };
      }

      await AsyncStorage.setItem('QRCODES', JSON.stringify(QRCodes));

      showAlert(
        'success',
        'QRCode salvo com sucesso', 
        '', 
        `Texto ${data}`
      );

      getQRCodes();
    } catch (error) {
      showAlert(
        'error', 
        'Erro ao salvar QRCode.', 
        `Erro ao salvar o Texto ${data}! Erro: ${error.message}`
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera</Text>;
  }

  const showAlert = (type, title, message) => {
    setAlertConfig({
      displayAlert: true,
      title: title,
      message: message,
      confirmText: 'OK',
      confirmButtonColor: (type == 'success' ? '#2c7be5' : '#e63757'),
    });
  };

  const hideAlert = () => {
    setAlertConfig({
      displayAlert: false,
      title: null,
      message: null,
      type: null,
      confirmText: null,
      confirmButtonColor: null,
    });
    setScanned(false);
  };

  return (
    <View style={{...appCss.container, backgroundColor: 'black'}}>
      {/* <Text style={appCss.buttonText}>Leitura QR Code</Text> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : value=>handleBarCodeScanned(value)}
        style={appCss.barCodeScanner}
      >
        <View style={qrCodeCss.layerTop} />
        <View style={qrCodeCss.layerCenter}>
          <View style={qrCodeCss.layerLeft} />
          <View style={qrCodeCss.focused} />
          <View style={qrCodeCss.layerRight} />
        </View>
        <View style={qrCodeCss.layerBottom} />
      </BarCodeScanner>

      {/*scanned && <Button title={'Ler novo Código'} style={appCss.buttonQrCode} onPress={() => setScanned(false)} />*/}

      <AwesomeAlert
        show={alertConfig.displayAlert}
        showProgress={false}
        title={alertConfig.title}
        message={alertConfig.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText={alertConfig.confirmText}
        confirmButtonColor={alertConfig.confirmButtonColor}
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          hideAlert();
        }}
      />

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', padding: 10, backgroundColor: theme.colors.surface }}>
        <Text style={{color: theme.colors.estounessa}}>
          {!isLoading ? 'Última leitura: ' + leituraQRCodes.leituras[leituraQRCodes.leituras.length - 1].texto : null}
          </Text>
        <Text style={{color: theme.colors.secondary}}>
          Sessão: {nomeSessao} | Ponto de Leitura: {pontoLeitura}
        </Text>
      </View>
    </View>

  );
}