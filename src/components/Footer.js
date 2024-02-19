import { Text, View } from "react-native";

export default function Footer(props) {
  return (
    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
      <Text style={{color: props.textColor}}>
        Sessão: {props.nomeSessao} | Ponto de Leitura: {props.pontoLeitura}
      </Text>
    </View>
  )
}