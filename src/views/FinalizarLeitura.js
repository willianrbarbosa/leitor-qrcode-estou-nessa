import React, { useState, useEffect } from 'react';
import { appCss } from "../../assets/css/AppCss";
import { Text, View, ScrollView, SafeAreaView } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useRoute } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Background from "../components/Background";
import moment from "moment";
import { theme } from '../core/theme';
import Button from '../components/Button';

export default function FinalizarLeitura() {
  const route = useRoute();
  const nomeSessao = route.params?.nomeSessao;
  const pontoLeitura = route.params?.pontoLeitura;

  const [isLoading, setLoading] = useState(true);
  const [leituraQRCodes, setLeituraQRCodes] = useState({});
  const [alertConfig, setAlertConfig ] = useState({
    displayAlert: false,
    title: null,
    message: null,
    type: null,
    confirmText: null,
    confirmButtonColor: null,
  });

  useEffect(() => {
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

    getQRCodes();
  }, []);

  const enviaLeituraAdmin = async () => {
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': '*/*',
    };
    const params = {
      franquia_codigo: '05',
      franquia_cnpj: '09.520.987/0001-40',
      qrcodes: leituraQRCodes,
    };

    let response = await axios
    .post(`https://estounessa.com.br/admin/app/Model/Admin/LeituraQRCodeAPP.php`, params, { headers })
    .then((response) => {
      const responseData = response.data;
      showAlert(
        (responseData.return ? 'success' : 'error'),
        (responseData.return ? 'QRCodes Enviados com sucesso' : 'Erro ao enviar QRCodes.'), 
        '', 
        `${responseData.message}`
      );
      return responseData.return;
    })
    .catch((error) => {
      showAlert(
        'error', 
        'Erro ao enviar QRCode.', 
        `Erro ao enviar os QRCodes para o portal Estou Nessa! Erro: ${error.message}`
      );
    });
  };

  const showQRCodes = async () => {
    try {
      if (leituraQRCodes !== null) {
        if ( leituraQRCodes.leituras.length ) {
          const aLeituras = leituraQRCodes.leituras;
          aLeituras.map((qrcode, idx) => {
            return (
              <View key={idx}>
                <Text>{qrcode.data_hora_leitura}: {qrcode.texto}</Text>
              </View>
            );
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <SafeAreaView style={{...appCss.container, alignItems: 'left', paddingLeft: 20, paddingRight: 20, justifyContent: 'left'}}>
      <Text style={{...appCss.header, borderBottomWidth: 2, borderBottomColor: theme.colors.secondary, marginBottom: 20}}>
        Leituras de QRCode Sessão: ({nomeSessao})
      </Text>

      <ScrollView style={appCss.scrollView}>
        { isLoading ? 
          <Text>Carregando leituras...</Text> :
          leituraQRCodes.leituras.map((qrcode, idx) => {
            return (
              <View key={idx} style={appCss.leituraCard}>
                <Text style={appCss.leituraText}>No.: {qrcode.texto}</Text>
                <Text style={appCss.leituraData}>{qrcode.data_hora_leitura}</Text>
              </View>
            );
          })
        }
      </ScrollView>

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

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: theme.colors.secondary }}>
        <Button
          mode="contained"
          onPress={enviaLeituraAdmin}
        >
          Finalizar Leitura
        </Button>
      </View>
    </SafeAreaView>
  );
}