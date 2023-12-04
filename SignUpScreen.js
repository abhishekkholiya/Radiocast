import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Platform,TextInput,KeyboardAvoidingView,Image,ScrollView,Dimension} from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons'; 
import db from '../tools/config';
import firebase from "firebase/compat/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc,setDoc ,doc} from "firebase/firestore"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const auth = getAuth();
const windowHeight = Dimensions.get('window').height;
class SignUpScreen extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            password:'',
            check_textInputChange:false,
            secureTextEntry:true,
            passwordicon : 'eye-off',
            phonenumber:0
        }
    }
    render(){
        return(
           <View style={styles.container}>
               <View style={styles.header}>
                   <Text style={styles.text_header}>Register Now</Text>
               </View>
              <View style={styles.footer}>
                   <Text style={styles.text_footer}>Username</Text>
                   <View style={styles.action}>
                   <FontAwesome name="user-o" size={24} color="black" />

                        <TextInput placeholder="Enter Username" style={[styles.textInput,{height:35}]}
                         autoCapitalize="none"
                         onChangeText={(name)=>{
                             this.setState({
                                 name:name
                             })
                         }}
                        ></TextInput>
                   </View>

                   <Text style={[styles.text_footer,{marginTop:15}]}>Email</Text>
                   <View style={styles.action}>
                       <Image  source={require('../assets/email.png')} style={{width:24,height:24}}/>

                    <TextInput placeholder="Your Email" style={styles.textInput} 
                     autoCapitalize="none"
                     onChangeText={(email)=>{this.setState({
                        email:email
                      })}}
                     ></TextInput>

                     {this.state.email ?
                        <Feather name="check-circle" size={20} color="green" />

                      :<Feather name="check-circle" size={20} color="black" />}
                    </View>

                    <Text style={[styles.text_footer,{marginTop:15}]}>Password</Text>
                    <View style={styles.action}>
                      <FontAwesome style={{marginBottom:5,marginRight:5}} name="lock" size={24} color="black" />
                      <TextInput placeholder="Your Password" 
                        style={[styles.textInput]} 
                        secureTextEntry={this.state.secureTextEntry ? true : false}
                        autoCapitalize="none"
                        onChangeText={(password)=>{
                            this.setState({
                                password:password
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
                    <Text style={[styles.text_footer,{marginTop:15}]}>Phone number</Text>
                    <View style={styles.action}>
                      <Image source={require('../assets/smartphone.png')} style={{marginRight:5,marginTop:5,width:24,height:24}}/>
                      <TextInput placeholder="Phone number (optional)" 
                        style={[styles.textInput]} 
                        autoCapitalize="none"
                        keyboardType='numeric'
                        maxLength={10}
                        onChangeText={(number)=>{
                            this.setState({
                              phonenumber:number
                            })
                         }}
                      ></TextInput>
                    </View>
                    <View style={[styles.button]}>
                
                    <TouchableOpacity  onPress={()=>{
                       if(this.state.name != null && this.state.name != '' && this.state.password != null && this.state.password != ' ' && this.state.email != null && this.state.email !='' ){
                            if(this.state.phonenumber.length === 10){
                                createUserWithEmailAndPassword(auth,this.state.email, this.state.password)
                                .then(async (userCredential) => {
                                const user = userCredential.user;
                                    const usersRef = collection(db, "users");

                                    await setDoc(doc(usersRef, this.state.email), {
                                        email:this.state.email,
                                        firstname:this.state.name,
                                        uid:user.uid,
                                        phonenumber:this.state.phonenumber
                            
                                    });
                                    await AsyncStorage.setItem('userdata',this.state.email);
                                    
                                    this.props.navigation.navigate('HomeTab');
                        
                                })
                                .catch((error) => {
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    return alert(errorMessage);
                                });
                            }else if(this.state.phonenumber.length >= 1 && this.state.phonenumber.lenght < 10){
                                alert('enter a valid phone number');
                            }else{
                                createUserWithEmailAndPassword(auth,this.state.email, this.state.password)
                                .then(async (userCredential) => {
                                const user = userCredential.user;
                                console.log(user);
                                auth().onAuthStateChanged(function (user) {
                                   if(user){
                                       console.log(user);
                                   }
                                });
                                    const usersRef = collection(db, "users");

                                    await setDoc(doc(usersRef, this.state.email), {
                                        email:this.state.email,
                                        firstname:this.state.name,
                                        uid:user.uid
                                    });
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
                            }
                                
                      }else{
                        alert('kindly fill all the fields')
                      }
                     }}style={{width:200,height:45,borderRadius:10,backgroundColor:'black',alignItems:'center'}}>
                     <Text style={{fontWeight:'bold',marginTop:10,color:'white'}}> REGISTER </Text>
                    </TouchableOpacity>

                   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}style={{marginTop:30,width:200,height:45,borderRadius:10,borderColor:'black',alignItems:'center',borderWidth:1,}}>
                    <Text style={{fontWeight:'bold',marginTop:10,color:'black'}}>Sign In </Text>
                   </TouchableOpacity>

        
                   </View>
           
                    

              </View>
           </View>
        )
    }
    
}
export default SignUpScreen

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
        paddingVertical:30,
        height:60*windowHeight/100
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
        marginTop:20
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