import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Screens/SplashScreen';
import Home from './Screens/HomeScreen';
import Login from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import Settings from './Screens/SettingsScreen';
import ForgetPassword from './Screens/ForgetPasswordScreen';
import AboutUsScreen from './Screens/AboutUsScreen';
import FeedbackScreen from './Screens/FeedbackScreen';
import FaqsScreen from './Screens/FaqsScreen';
import DeveloperContactScreen from './Screens/DeveloperContactScreen';
import SponsorsScreen from './Screens/SponsorsScreen';
import MainPostScreen from './Screens/MainPostScreen';
import MainPostScreen2 from './Screens/MainPostScreen2';
import SpecialistPostScreen from './Screens/SpecialistPostScreen';
import ArtofMusicScreen from './Screens/ArtofMusicScreen';
import CareerCounsellingScreen from './Screens/CareerCounsellingScreen';
import ClassScreen from './Screens/ClassScreen';
import FolkStoriesScreen from './Screens/FolkStoriesScreen';
import GeneralKnowledgeScreen from './Screens/GeneralKnowledgeScreen';
import LiteratureScreen from './Screens/LiteratureScreen';
import MentalHealthStabilityScreen from './Screens/MentalHealthStabilityScreen';
import MoralValuesScreen from './Screens/MoralValuesScreen';
import MotivationalSpeechesScreen from './Screens/MotivationalSpeechesScreen';
import ParentalCounsellingScreen from './Screens/ParentalCounsellingScreen';
import SpokenEnglishScreen from './Screens/SpokenEnglishScreen';

const Stack = createNativeStackNavigator();
export default function App({navigation}) {
 return(
  
   <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'
        screenOptions={{
          headerStyle:{
            backgroundColor:'black',
            borderColor:'black'
          }
      }}
      >
         <Stack.Screen name="HomeTab" component={Home} options={{
           headerShown:false
         }}>
         </Stack.Screen>
         <Stack.Screen  name="Splash" component={Splash} options={{
           headerShown:false
         }}>
         </Stack.Screen>
         <Stack.Screen  name="Login" component={Login} options={{
           headerShown:false
         }}>
         </Stack.Screen>
         <Stack.Screen  name="SignUp" component={SignUpScreen} options={{
           headerShown:false
         }}>
         </Stack.Screen>
         <Stack.Screen  name="Settings" component={Settings} options={{
           headerShown:false
         }}>
         </Stack.Screen>
         <Stack.Screen  name="ForgetPassword" component={ForgetPassword} options={{
           headerShown:false
         }}>
         </Stack.Screen>
         <Stack.Screen  name="AboutUsScreen" component={AboutUsScreen} options={{
           headerShown:true,
           headerTitle:"About Us",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen  name="FeedbackScreen" component={FeedbackScreen} options={{
           headerShown:true,
           headerTitle:"Feedback",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen  name="FaqsScreen" component={FaqsScreen} options={{
           headerShown:true,
           headerTitle:"FAQs",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen  name="DeveloperContactScreen" component={DeveloperContactScreen} options={{
           headerShown:true,
           headerTitle:"Developer Contact",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen  name="SponsorsScreen" component={SponsorsScreen} options={{
           headerShown:true,
           headerTitle:"Sponsors",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen  name="MainPostScreen" component={MainPostScreen2} options={{
           headerShown:true,
           headerTitle:"Bole Toh Pahadi",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen  name="SpecialistPostScreen" component={SpecialistPostScreen} options={{
           headerShown:true,
           headerTitle:"Bole Toh Pahadi",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}>
         </Stack.Screen>
         <Stack.Screen name="ArtofMusic" component={ArtofMusicScreen} options={{
            headerShown:true,
            headerTitle:"Art of Music",
            headerTitleStyle:{
              color:"white",
              fontWeight:'bold',
            },
            headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="CareerCounselling" component={CareerCounsellingScreen} options={{
            headerShown:true,
            headerTitle:"Career Counselling",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="ClassScreen" component={ClassScreen} options={{
            headerShown:true,
            headerTitle:"Class 6 - 12",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="FolkStories" component={FolkStoriesScreen} options={{
            headerShown:true,
            headerTitle:"Folk Stories",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="GeneralKnowledge" component={GeneralKnowledgeScreen} options={{
            headerShown:true,
            headerTitle:"General Knowledge",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="Literature" component={LiteratureScreen} options={{
            headerShown:true,
            headerTitle:"Literature",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="MentalHealthStability" component={MentalHealthStabilityScreen} options={{
            headerShown:true,
            headerTitle:"Mental Health Stability",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="MoralValues" component={MoralValuesScreen} options={{
            headerShown:true,
            headerTitle:"Moral Values",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="MotivationalSpeeches" component={MotivationalSpeechesScreen} options={{
            headerShown:true,
            headerTitle:"Motivational Speeches",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="ParentalCounselling" component={ParentalCounsellingScreen} options={{
            headerShown:true,
            headerTitle:"Parental Counselling",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
         <Stack.Screen name="SpokenEnglish" component={SpokenEnglishScreen} options={{
            headerShown:true,
            headerTitle:"Spoken English",
           headerTitleStyle:{
             color:"white",
             fontWeight:'bold',
           },
           headerBackImageSource:require('./assets/left.png')
         }}></Stack.Screen>
      </Stack.Navigator>
   </NavigationContainer>
 
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
