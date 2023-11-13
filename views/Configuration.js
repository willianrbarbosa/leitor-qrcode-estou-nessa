import React from "react";
import { appCss } from "../assets/css/AppCss";
import { Text, View } from "react-native";

export default function ConfigurationPage(props) {
  return (
    <View style={appCss.containerRow}>
      <Text style={appCss.buttonText}>Configurações (em breve)</Text>
    </View>
  );
}