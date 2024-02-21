import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { LoginPage, HomePage, QRCodePage, FinalizarLeitura } from './src/views';
import { theme } from './src/core/theme';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name='LoginPage' component={LoginPage} 
          options={{
            headerShown: false
          }}/>
        <Stack.Screen 
          name='HomePage'
          component={HomePage}
          options={{
            title: 'Leitor QRCode - Menu',
            headerStyle: { backgroundColor: theme.colors.secondary, height: 60 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: theme.colors.surface,
          }}
        />
        <Stack.Screen 
          name='QRCodePage'
          component={QRCodePage}
          options={{
            title: 'Ler QRCode',
            headerStyle: { backgroundColor: theme.colors.secondary, height: 60 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: theme.colors.surface,
          }}
        />
        <Stack.Screen 
          name='FinalizarLeitura'
          component={FinalizarLeitura}
          options={{
            title: 'Finalizar Leitura',
            headerStyle: { backgroundColor: theme.colors.secondary, height: 60 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: theme.colors.surface,
          }}
        />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
