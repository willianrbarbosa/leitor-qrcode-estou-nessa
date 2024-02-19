import React from "react";
import { appCss } from "../../assets/css/AppCss";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Background from '../components/Background';
import Button from '../components/Button';
import { useRoute } from "@react-navigation/native"
import Footer from "../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({navigation}) {
  const route = useRoute();
  const nomeSessao = route.params?.nomeSessao;
  const pontoLeitura = route.params?.pontoLeitura;

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('QRCODES');
    } catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginPage' }],
    })
  }

  return (
    <Background>
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

      <Footer nomeSessao={nomeSessao} pontoLeitura={pontoLeitura}/>
    </Background>
  );
}