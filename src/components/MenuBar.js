import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { LoginPage, HomePage, QRCodePage, FinalizarLeitura } from '../views';
import drawerItens from '../../constants/drawerItens';
import { theme } from '../core/theme';

const Drawer = createDrawerNavigator();

export default function MenuBar() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="HomePage"
        drawerContentOptions={{
          activeTintColor: theme.colors.estounessa,
          itemStyle: { marginVertical: 10 },
        }}
      >
        {
          DrawerItems.map(drawer => <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              drawerIcon:({focused})=>              
                <FontAwesome5
                  name={drawer.iconName}
                  size={24}
                  color={focused ? "#e91e63" : "black"}
                />
            }}
            component={
              drawer.component==='home' ? HomePage
                : drawer.component==='qrcode' ? QRCodePage
                  : drawer.component==='encerrarleitura' ? FinalizarLeitura
                    : LoginPage
            }
            />
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  )
}