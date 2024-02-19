import React, { useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { emptyTextValidator } from '../helpers/emptyTextValidator'

export default function LoginPage({ navigation }) {
  const [nomeSessao, setNomeSessao] = useState({ value: '', error: '' });
  const [pontoLeitura, setPontoLeitura] = useState({ value: '', error: '' });

  const onLoginPressed = () => {
    const nomeSessaoError = emptyTextValidator(nomeSessao.value, 'Nome da Sessão');
    const pontoLeituraError = emptyTextValidator(pontoLeitura.value, 'Ponto de Leitura');
    if (nomeSessaoError || pontoLeituraError) {
      setNomeSessao({ ...nomeSessao, error: nomeSessaoError });
      setPontoLeitura({ ...pontoLeitura, error: pontoLeituraError });
      return false;
    }
    navigation.navigate('HomePage', {
      nomeSessao: nomeSessao.value,
      pontoLeitura: pontoLeitura.value
    });
  }

  return (
    <Background>
      <Logo />
      <Header>Leitor QR-Code - Bem-vindo</Header>
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
      <Button mode="contained" onPress={onLoginPressed} >
        Acessar
      </Button>
    </Background>
  )
}