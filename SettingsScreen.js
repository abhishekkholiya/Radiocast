import * as React from 'react';
import {View,Text,Dimensions,Image,StyleSheet,TextInput,Platform,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import db from '../tools/config';
import { collection, addDoc ,doc, getDocs,getDoc} from "firebase/firestore"; 
import { getAuth, signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getStorage, ref, getDownloadURL ,uploadBytes} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default class Settings extends React.Component{
    constructor(){
        super();
        this.state={
            loading:true,
            email:'',
            podcasts:0,
            notifications:0,
            username:'',
            avatar:null,
            uid:''
        }

        this.handlePickAvatar = async ()=>{
            const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
            if(!cancelled){
                this.uploadImage(uri ,this.state.uid)
            }
        }
        this.uploadImage = async(uri,imageName)=>{
            const response = await fetch(uri)
            const blob = await response.blob()
            const storage = getStorage();
            const storageRef = ref(storage, `user_profile/${imageName}`);
            uploadBytes(storageRef, blob).then(async (snapshot) => {
                alert('Uploaded Successfully;')
                this.setState({
                    avatar:uri
                });
            });
        }

      
            this.getData = async()=>{
                   await  AsyncStorage.getItem('userdata').then(async value=>{
                        if(value !== null){
                            const docRef = doc(db, "users", value);
                            const docSnap = await getDoc(docRef);   
                            if(docSnap.data()){    
                                this.setState({
                                    username:docSnap.data().firstname,
                                    email:value,
                                    loading:false,
                                    uid:docSnap.data().uid
                                });
                                this.getPicture(docSnap.data().uid);
                            }
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })   
                }
            
            
        
        
        this.getPicture = async(imageName)=>{
            const storage = getStorage();
            const storageRef = ref(storage,`user_profile/${this.state.uid}`);
            getDownloadURL(storageRef)
            .then((url) => {
               
                    this.setState({
                        avatar:url,
                    });
            })
            .catch((error) => {
                // Handle any errors
                console.log(error);
                this.setState({
                    avatar:null,
                })
            });
        }
        this.logout = async()=>{

            const auth = getAuth();
            signOut(auth).then( async () => {
                await AsyncStorage.removeItem('userdata').then(()=>{
                    this.props.navigation.navigate('Login');
                }).catch((err)=>console.log(err));
            }).catch((error) => {
            // An error happened.
            });

        }

    }
    componentDidMount(){
        this.getData();
       

    }
    render(){
        return(
            <View style={styles.mainview}>
                {this.state.loading?
                 <ActivityIndicator size="large" color="white" style={{marginTop:10}}/>
                    :
                 
                        <View style={styles.mainview}> 
                            <TouchableOpacity onPress={()=>{this.handlePickAvatar()}}>
                             { this.state.avatar === null ?
                            
                            <View style={styles.imageview}>
                            <Image source={require('../assets/user.png')} style={styles.userimage}/>
                            </View>
                                :  
                                 <View style={styles.imageview}>
                                 <Image source={{uri:this.state.avatar}} style={styles.userimage}/>
                             </View>
                             }
                            </TouchableOpacity>
                            <Text style={styles.usernametext}>{this.state.username}</Text>
                            <View style={{alignSelf:'center',alignItems:'center',marginTop:10,borderRadius:10}}>
                               
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AboutUsScreen')}}>
                                        <View style={{width:windowWidth-32,height:50,backgroundColor:"#2D2A2C",flexDirection:'row',alignItems:'center',borderRadius:10,marginTop:10}}>
                                            <Image style={{justifyContent:'center',width:40,height:40,alignSelf:'center',marginLeft:10 }} source={require('../assets/aboutus.png')}/>
                                            <Text style={{fontSize:24,color:'white',marginLeft:10,fontWeight:'bold'}}>About Us</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FeedbackScreen')}}>
                                        <View style={{width:windowWidth-32,height:50,backgroundColor:"#2D2A2C",flexDirection:'row',alignItems:'center',borderRadius:10,marginTop:10}}>
                                            <Image style={{justifyContent:'center',width:40,height:40,alignSelf:'center',marginLeft:10 }} source={require('../assets/feedback.png')}/>
                                            <Text style={{fontSize:24,color:'white',marginLeft:10,fontWeight:'bold'}}>Feedback</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FaqsScreen')}}>
                                        <View style={{width:windowWidth-32,height:50,backgroundColor:"#2D2A2C",flexDirection:'row',alignItems:'center',borderRadius:10,marginTop:10}}>
                                            <Image style={{marginLeft:10,justifyContent:'center',width:40,height:40,alignSelf:'center'}} source={require('../assets/faqs.png')}/>
                                            <Text style={{fontSize:24,color:'white',marginLeft:10,fontWeight:'bold'}}>FAQs</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DeveloperContactScreen')}}>
                                        <View style={{width:windowWidth-32,height:50,backgroundColor:"#2D2A2C",flexDirection:'row',alignItems:'center',borderRadius:10,marginTop:10}}>
                                            <Image style={{marginLeft:10,justifyContent:'center',width:40,height:40,alignSelf:'center'}} source={require('../assets/developer.png')}/>
                                            <Text style={{fontSize:24,color:'white',marginLeft:10,fontWeight:'bold'}}>Developer Contact</Text>
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SponsorsScreen')}}>
                                        <View style={{width:windowWidth-32,height:50,backgroundColor:"#2D2A2C",flexDirection:'row',alignItems:'center',borderRadius:10,marginTop:10}}>
                                            <Image style={{marginLeft:10,justifyContent:'center',width:40,height:40,alignSelf:'center'}} source={require('../assets/sponsors.png')}/>
                                            <Text style={{fontSize:24,color:'white',marginLeft:10,fontWeight:'bold'}}>Sponsors</Text>
                                        </View>
                                    </TouchableOpacity>
                                

                            </View>
                           
                        </View>
                    
                }
                 <TouchableOpacity style={styles.uploadbutton} onPress={()=>{this.logout()}}>
                                <Image source={require('../assets/logout.png')} style={styles.logoutimage}/>
                                <Text style={styles.logouttext}>Log out</Text>
                 </TouchableOpacity>
         </View>
        )
    }
}
const styles = StyleSheet.create({
    mainview:{
     
        backgroundColor:'black',
        width:windowWidth,
        height:windowHeight,
        flex:1,
        position:'relative'
    },
    footer:{
        backgroundColor:'#1B2744',
        marginTop:10,
        borderWidth:2,
        borderColor:'white',
        borderRadius:10,
        width:'95%',
        alignSelf:'center',
        height:'20%',
        flexDirection:'row',
        alignItems:'center'
    },
    textInput:{
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft:10,
        color:'#05375a'
    },
    uploadbutton:{
        width:143,
        height:63,
        backgroundColor:'#2D2A2C',
        marginBottom:30,
        borderRadius:10,
        justifyContent:'center',
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        alignItems:"center",
        marginLeft:10
    },
    logouttext:{
        color:'white',
        justifyContent:'center',
        fontWeight:'bold',
        fontSize:18,
    },
    logoutimage:{
        width:34,
        height:30,
    },
    imageview:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    addpicturebutton:{
        width:24,
        height:24
    },
    userimage:{
        width:150,
        height:150,
        alignSelf:'center',
        borderRadius:100
    },
    usernametext:{
        fontSize:28,
        justifyContent:'center',
        color:'white',
        textAlign:'center',
        marginTop:10,
        fontWeight:'bold'
    },
    loadingtext:{
        justifyContent:'center',
        color:'white',
        fontSize:18,
        textAlign:'center'
    },
    subview1:{
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:15,
    }
})