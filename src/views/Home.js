import React, { useState, useEffect } from 'react';
import { appCss } from "../../assets/css/AppCss";
import { Image, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from "react-native";
import Button from '../components/Button';
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({navigation}) {
  const isFocused = useIsFocused();
  const [nomeSessao, setNomeSessao] = useState();
  const [pontoLeitura, setPontoLeitura] = useState();
  const [leituraQRCodes, setLeituraQRCodes] = useState({});

  const getDadosAcesso = async () => {
    try {
      const access = await AsyncStorage.getItem('ACCESS');
      if (access !== null) {
        const dadosAcesso = JSON.parse(access);
        setNomeSessao(dadosAcesso.nomeSessao);
        setPontoLeitura(dadosAcesso.pontoLeitura);
      }

      const leituras = await AsyncStorage.getItem('QRCODES');
      if (leituras !== null) {
        const QRCodes = JSON.parse(leituras);
        setLeituraQRCodes(QRCodes);
      } else {
        setLeituraQRCodes({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getDadosAcesso();
  }, [isFocused]);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('ACCESS');
      await AsyncStorage.removeItem('QRCODES');

      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{...appCss.container, alignItems: 'left', paddingLeft: 20, paddingRight: 20, justifyContent: 'left'}}>

      <ScrollView style={appCss.scrollView}>
        <Text style={appCss.buttonText}>Sessão ativa:</Text>      
        <View key='activeSession' style={{ ...appCss.leituraCard, marginTop: 5, marginBottom: 20}}>
          <Text style={appCss.leituraTextSecondary}>Nome: {nomeSessao}</Text>
          <Text style={appCss.leituraTextSecondary}>Ponto de Leitura: {pontoLeitura}</Text>
        </View>

        <Text style={appCss.buttonText}>Total Números Lidos:</Text>      
        <View key='qrCodesCount' style={{ ...appCss.leituraCard, marginTop: 5, marginBottom: 20}}>
          <Text style={appCss.leituraTextSecondary}>Qtde.: {leituraQRCodes.leituras ? leituraQRCodes.leituras.length : 0}</Text>
          <Text style={appCss.leituraDataSecondary}>Data: {moment().format('DD/MM/YYYY')}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={appCss.buttonQrCode}
        title='Ler QRCode'
        onPress={() => navigation.navigate('QRCodePage', {
            name: 'Ler QRCode',
            nomeSessao: nomeSessao,
            pontoLeitura: pontoLeitura
          }
        )}
      >
        <Image 
          style={appCss.buttonImage}
          source={require('../../assets/image/qr-code-icon.png')}
        />
        <Text style={appCss.buttonText}>Ler QRCode</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('FinalizarLeitura', {
            name: 'Finalizar Leitura',
            nomeSessao: nomeSessao,
            pontoLeitura: pontoLeitura
          }
        )}
      >
        Finalizar Leitura
      </Button>

      <Button mode="outlined" onPress={logOut}>
        Iniciar nova sessão
      </Button>
    </SafeAreaView>
  );
}