import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { LoginPage, HomePage, QRCodePage, ConfigurationPage } from './views';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name='LoginPage'
          component={LoginPage}
          options={{
            title: 'Leitor QRCode - Acesso',
            headerStyle: { backgroundColor: '#f68d40', height: 110 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen 
          name='HomePage'
          component={HomePage}
          options={{
            title: 'Leitor QRCode - Home',
            headerStyle: { backgroundColor: '#f68d40', height: 110 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen 
          name='QRCodePage'
          component={QRCodePage}
          options={{
            title: 'Ler QRCode',
            headerStyle: { backgroundColor: '#f68d40', height: 110 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen 
          name='ConfigurationPage'
          component={ConfigurationPage}
          options={{
            title: 'Configurações',
            headerStyle: { backgroundColor: '#f68d40', height: 110 },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', margin: 'auto' },
            headerTintColor: '#FFF',
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
