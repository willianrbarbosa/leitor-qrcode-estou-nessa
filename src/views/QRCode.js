import React, { useState, useEffect } from 'react';
import { appCss } from "../../assets/css/AppCss";
import { qrCodeCss } from '../../assets/css/QRCodeCss';
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

export default function QRCodePage(props) {
  const [hasPermission, setHasPermission] = useState(null);
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

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    // setDisplayQR('none');
    //appCss.qr__code(displayQR)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const headers = { 
      'Content-Type': 'application/json',
      'Accept': '*/*',
    };
    const params = {
      franquia_codigo: '05',
      franquia_cnpj: '09.520.987/0001-40',
      texto_qrcode: data,
    };
    let response = await axios
    .post(`https://estounessa.com.br/admin/app/Model/Admin/LeituraQRCodeAPP.php`, params, { headers })
    .then((response) => {
      const responseData = response.data;
      showAlert(
        (responseData.return ? 'success' : 'error'),
        (responseData.return ? 'QRCode Enviado com sucesso' : 'Erro ao enviar QRCode.'), 
        '', 
        `Texto ${data}: ${responseData.message}`
      );
      return responseData.return;
    })
    .catch((error) => {
      showAlert(
        'error', 
        'Erro ao enviar QRCode.', 
        `Erro ao enviar o Texto ${data} para o portal Estou Nessa! Erro: ${error.message}`
      );
    });
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
    <View style={appCss.container}>
      {/* <Text style={appCss.buttonText}>Leitura QR Code</Text> */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : value=>handleBarCodeScanned(value)}
        style={StyleSheet.absoluteFillObject}
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
    </View>
  );
}