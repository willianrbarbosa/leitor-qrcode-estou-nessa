import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { emptyTextValidator } from '../helpers/emptyTextValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
  const [nomeSessao, setNomeSessao] = useState({ value: null, error: '' });
  const [pontoLeitura, setPontoLeitura] = useState({ value: null, error: '' });

  const getDadosAcesso = async () => {
    try {
      const access = await AsyncStorage.getItem('ACCESS');
      if (access !== null) {
        const dadosAcesso = JSON.parse(access);
        
        setNomeSessao({ value: dadosAcesso.nomeSessao, error: '' });
        setPontoLeitura({ value: dadosAcesso.pontoLeitura, error: '' });
      
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePage' }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ( !nomeSessao.value ) {
      getDadosAcesso();
    }
  }, []);

  const onLoginPressed = async () => {
    const nomeSessaoError = emptyTextValidator(nomeSessao.value, 'Nome da Sessão');
    const pontoLeituraError = emptyTextValidator(pontoLeitura.value, 'Ponto de Leitura');
    if (nomeSessaoError || pontoLeituraError) {
      setNomeSessao({ ...nomeSessao, error: nomeSessaoError });
      setPontoLeitura({ ...pontoLeitura, error: pontoLeituraError });
      return false;
    }

    try {
      const dadosAcesso = {
        nomeSessao: nomeSessao.value,
        pontoLeitura: pontoLeitura.value
      };
      await AsyncStorage.setItem('ACCESS', JSON.stringify(dadosAcesso));

      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      });
    } catch (error) {
      console.log(error.message);
    }
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