import React,{useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    Image
} from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { ThemeProvider } from '@react-navigation/native';
import firebase from "firebase/compat/app";
import db from '../tools/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions, StackActions } from '@react-navigation/bottom-tabs';


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

//import * as firebase from 'firebase';
class Login extends React.Component{
 
     constructor(){
         super()
         this.state={
             email:'',
             Password:'',
             check_textInputChange:false, 
             secureTextEntry:true,
             passwordicon : 'eye-off',
             validateEmail : false
         }
         
     }
   
    
   
  
render(){
   const updateSecureTextEntery = ()=>{
       this.setState({
           secureTextEntry: !this.state.secureTextEntry
       })
       alert('Working')
   }
   
    return(
        <View style={styles.container} behavior={"padding"} >
           <View style={styles.header}>
                 <Text style={styles.text_header}>Welcome Back!</Text>
           </View>

           <View style={styles.footer}>
             <Text style={styles.text_footer}>Email</Text>

             <View style={styles.action}>

                <Image  source={require('../assets/email.png')} style={{width:24,height:24}}/>

               <TextInput placeholder="Your Email" style={styles.textInput} 
                autoCapitalize="none" 
                onChangeText={(email)=>this.setState({
                  email:email
                })} 
               ></TextInput>

              {this.state.email?
               <Feather name="check-circle" size={20} color="green" />
              :
              <Feather name="check-circle" size={20} color="black" />

            }

             </View>
 
            <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
             <View style={styles.action}>

               <FontAwesome name="lock" size={24} color="black" />
               <TextInput placeholder="Your Password" 
               style={styles.textInput} 
               secureTextEntry={this.state.secureTextEntry ? true : false}
                autoCapitalize="none"
                onChangeText={(Password)=>{
                    this.setState({
                       Password:Password
                    })
                }}
               ></TextInput>
          
                     
          <TouchableOpacity onPress={()=>{
              this.setState({
               secureTextEntry: !this.state.secureTextEntry
              })
            
              
             }}>
             {this.state.secureTextEntry ?
                <Feather name={'eye-off'} size={20} color="grey" /> :
                <Feather name={'eye'} size={20} color="green" />
             
             }
          
              
             </TouchableOpacity>
              
             </View>

             <View style={styles.button}>
                
                      <TouchableOpacity onPress={()=>{
                                
                                if(this.state.email!= null && this.state.email != '' && this.state.Password != null && this.state.Password != ''  ){
                                signInWithEmailAndPassword(auth,this.state.email, this.state.Password)
                                  .then(async () => {
                                    alert('You are logged in sucessfully')
                                         await AsyncStorage.setItem('userdata',this.state.email);
                                         this.props.navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'HomeTab' }]
                                         });
                                    
                                  })
                                  .catch((error) => {
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    return alert(errorMessage);
                                  });
                                  }else{
                                    alert('kindly fill all the fields')
                                  }
                           
                        }} style={{width:'60%',height:40,borderRadius:10,backgroundColor:'black',alignItems:'center'}}>
                          <Text style={{fontWeight:'bold',marginTop:10,color:'white'}}>Log In </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}}style={{marginTop:30,width:'60%',height:40,borderRadius:10,borderColor:'black',alignItems:'center',borderWidth:1,}}>
                          <Text style={{fontWeight:'bold',marginTop:10}}>Sign Up </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{
                       this.props.navigation.navigate('ForgetPassword');
                      }} style={{marginTop:20,marginBottom:10}}>
                          <Text style={{color:'blue',fontWeight:'bold'}}>Forget Password?</Text>
                      </TouchableOpacity>

              
             </View>
              
             
            </View>
      </View>
    )
}
}
export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    header:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:20,
        paddingBottom:50
    },
    footer:{
        flex:3,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft:10,
        color:'#05375a'
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    }
});