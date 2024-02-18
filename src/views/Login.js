import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'

export default function LoginPage({ navigation }) {
  const [nomeSessao, setNomeSessao] = useState({ value: '', error: '' })
  const [pontoLeitura, setPontoLeitura] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const nomeSessaoError = nameValidator(nomeSessao.value)
    const pontoLeituraError = nameValidator(pontoLeitura.value)
    if (nomeSessaoError || pontoLeituraError) {
      setNomeSessao({ ...nomeSessao, error: nomeSessaoError })
      setPontoLeitura({ ...pontoLeitura, error: pontoLeituraError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomePage' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bem-vindo</Header>
      <TextInput
        label="Nome da Sessão"
        returnKeyType="next"
        value={nomeSessao.value}
        onChangeText={(text) => setNomeSessao({ value: text, error: '' })}
        error={!!nomeSessao.error}
        errorText={nomeSessao.error}
      />
      <TextInput
        label="Ponto de Leitura"
        returnKeyType="next"
        value={pontoLeitura.value}
        onChangeText={(text) => setPontoLeitura({ value: text, error: '' })}
        error={!!pontoLeitura.error}
        errorText={pontoLeitura.error}
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Acessar
      </Button>
    </Background>
  )
}