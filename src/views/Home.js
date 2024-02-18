import React from "react";
import { appCss } from "../../assets/css/AppCss";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function HomePage({navigation}) {
  return (
    <View style={appCss.container}>
      <TouchableOpacity
        style={appCss.buttonQrCode}
        title='Ler QRCode'
        onPress={() => navigation.navigate('QRCodePage', {
            name: 'Ler QRCode',
          }
        )}
      >
        <Image 
          style={appCss.buttonImage}
          source={require('../assets/image/qr-code-icon.png')}
        />
        <Text style={appCss.buttonText}>Ler QRCode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={appCss.buttonQrCode}
        title='Configurações'
        onPress={() => navigation.navigate('ConfigurationPage', {
            name: 'Configurações',
          }
        )}
      >
        <Image 
          style={appCss.buttonImage}
          source={require('../assets/image/config-icon.png')}
        />
        <Text style={appCss.buttonText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}