import * as React from 'react';
import {View,Text,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from './PostScreen';
import Notification  from './NotificationScreen';
import Settings from './SettingsScreen';
import ArtandCultureScreen from './ArtandCultureScreen';
const Tab = createBottomTabNavigator();
export default function Home(){
    return(
        <Tab.Navigator
                screenOptions={{
                    tabBarActiveBackgroundColor:'white',
                    tabBarInactiveBackgroundColor:'black',
                    headerStyle:{
                    backgroundColor:'black',
                }
            }}
        >
            <Tab.Screen name="Home" component={Post}  options={{
                tabBarShowLabel:false,
                headerTitleStyle: { color:'white',fontWeight:'bold'},  
                headerTitle:'Bole Toh Pahadi',
                tabBarIcon: ({ route,color }) => (
                    <Image
                    source={require('../assets/homeicon.png')}
                    style={{width: 26, height: 26, tintColor: 'pink'}}
                  />
          
                  ),
               
                
            }} />
             <Tab.Screen name="Art and Culture" component={ArtandCultureScreen}  options={{
                tabBarShowLabel:false,
                headerTitleStyle: { color:'white',fontWeight:'bold'},  
                headerTitle:'Art and Culture',
                tabBarIcon: ({ route,color }) => (
                    <Image
                    source={require('../assets/artandculture.png')}
                    style={{width: 26, height: 26, tintColor: 'pink'}}
                  />
          
                  ),
               
                
            }} />
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarShowLabel:false,
                headerTitleStyle: { color:'white',fontWeight:'bold'},   
                tabBarIcon: ({ color }) => (
                    <Image
                    source={require('../assets/notification.png')}
                    style={{width: 26, height: 26, tintColor: 'pink'}}
                  />
          
                  )
            }}
            />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarShowLabel:false,
                headerTitleStyle: { color:'white',fontWeight:'bold'},  
                tabBarIcon: ({ color }) => (
                    <Image
                    source={require('../assets/setting.png')}
                    style={{width: 26, height: 26, tintColor: 'pink'}}
                  />
          
                  ),
            }}
            />
        </Tab.Navigator>

    )
}