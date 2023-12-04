import React from 'react';
import {View,Text,TouchableOpacity,Image,Dimensions,StyleSheet,ActivityIndicator,ImageBackground,ScrollView,FlatList} from 'react-native';
import db from '../tools/config';
import { collection, addDoc ,doc, getDocs,getDoc,limit,where,orderBy,query,startAfter,setDoc} from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL ,uploadBytes} from "firebase/storage";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import {audioContext} from '../Screens/MainPostScreen';
export default class Post extends React.Component{
    constructor(){
        super();
        this.state={
            loading:true,
            username:'',
            uid:'',
            email:'',
            avatar:'',
            show:false,
            limit:5,
            specialistarray:[]
        }
        this.getData = async ()=>{
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
            }); 
        }
        this.getSpecialists = async ()=>{
            let specialists = [];
            let initialQuery =  collection(db,'specialist users');
            const q =  query(initialQuery, orderBy("listeners"),limit(this.state.limit));
            const querySnapshot = await getDocs(q);
            if(querySnapshot){
                let documentData = querySnapshot.docs.map(document => document.data());
                let lastVisible;
                if(documentData.length>0){
                 lastVisible = documentData[documentData.length - 1].title;
                }else{
                   return this.setState({
                       loading:false,
                   });
                }
                let documentData2 = querySnapshot.docs.forEach(document =>{ document.data()
                    if(document.data()){
                        let newData = {
                           firstname:document.data().firstname,
                           email:document.data().email,
                           profilepicture:document.data().profilepicture
                        }
                        if(newData.profilepicture !== ''){
                            const storage = getStorage();
                            const storageRef = ref(storage,`specialist/${newData.firstname}`);
                            getDownloadURL(storageRef)
                            .then((url) => {
                                   newData.profilepicture = url
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        }
                        specialists.push(newData);
                     
                            this.setState({
                                specialistarray:specialists,
                            });
                       
                    }
                });
            }else{
                this.setState({
                    loading:false
                });
            }
        }
        this.getPicture = async(imageName)=>{
            const storage = getStorage();
            const storageRef = ref(storage,`user_profile/${this.state.uid}`);
            getDownloadURL(storageRef)
            .then((url) => {
                    this.setState({
                        avatar:url,
                        loading:false
                    });
            })
            .catch((error) => {
                // Handle any errors
                console.log(error);
                this.setState({
                    avatar:null,
                    loading:false
                    
                })
            });
        }
        this.items=({item,index})=>{
            return(
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SpecialistPostScreen',{imagename:item.profilepicture,screename:item.firstname})}} style={{marginLeft:5}}>
                            
                {this.state.avatar !== null && this.state.avatar !== '' ?
                    <Image source={{uri:item.profilepicture}} style={Styles.specialistspicture}/>:
                    <Image source={require('../assets/user.png')} style={Styles.specialistspicture}/>
                }
                <Text style={{marginTop:5,textAlign:'center'}}>{item.firstname}</Text>
            
                 </TouchableOpacity>

            )
        }
        this.getSpecialists();
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        return(
            <View style={Styles.mainview}>
                {this.state.loading=== false?
                    <TouchableOpacity style={Styles.headerview} disabled={true}>
                        <ImageBackground source={require('../assets/headerimage.jpeg')} style={{flex:1,paddingLeft:20,flexDirection:'row',alignItems:'center'}}>
                        {this.state.avatar !== null && this.state.avatar !== '' ?
                            <Image source={{uri:this.state.avatar}} style={Styles.userpicture}/>:
                            <Image source={require('../assets/user.png')} style={Styles.userpicture}/>
                        }
                        <Text style={{color:'white',fontSize:18,marginLeft:10,fontWeight:'bold'}}>{this.state.username}</Text>
                        </ImageBackground>
                       
                    </TouchableOpacity>:
                    <ActivityIndicator size="large" color="white" style={{marginTop:10}}/>
                }
                <View style={Styles.footerview}>
                    <ScrollView>
                        <View style={{marginTop:10,backgroundColor:'black',width:windowWidth,height:1}}></View>
                        <Text style={{color:'black',fontWeight:'bold',marginTop:5,marginLeft:10,fontSize:20}}>Our Specialists</Text>
                        <View style={{width:windowWidth,flexDirection:'row',paddingLeft:10,marginTop:5}}>
                        {this.state.avatar !== null ?
                            <FlatList  
                                data={this.state.specialistarray}
                                keyExtractor={(item,index)=>index.toString()}
                                renderItem={(item)=>this.items(item)}
                                horizontal={true}
                            >
                            </FlatList>
                                
                            :console.log()
                            }
                        </View>
                        <View style={{marginTop:20,width:windowWidth,flexDirection: 'row',justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Literature',{imagename:'../assets/literature.jpeg',screename:'Literature'})}} style={{width:'45%',height:180,backgroundColor:'black',marginLeft:10,marginRight:10}}>
                                <ImageBackground source={require('../assets/literature.jpeg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',color:'white',fontSize:28}}>Literature</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MotivationalSpeeches',{imagename:'../assets/motivationalspeeches.jpeg',screename:'Motivational Speeches'})}} style={{width:'45%',height:180,backgroundColor:'black',marginRight:10}}>
                                <ImageBackground source={require('../assets/motivationalspeeches.jpeg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',color:'white',fontSize:28}}>Motivational</Text>
                                    <Text style={{textAlign:'center',color:'white',fontSize:28}}>Speeches</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:10,width:windowWidth,flexDirection: 'row',justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SpokenEnglish',{imagename:'../assets/spokenenglish.jpg',screename:'Spoken English'})}} style={{width:'45%',height:180,backgroundColor:'black',marginLeft:10,marginRight:10}}>
                                <ImageBackground source={require('../assets/spokenenglish.jpg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',color:'white',fontSize:28}}>Spoken</Text>
                                    <Text style={{textAlign:'center',color:'white',fontSize:28}}>English</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'45%',height:180,backgroundColor:'black',marginRight:10}} onPress={()=>{this.props.navigation.navigate('Art and Culture')}}>
                                <ImageBackground source={require('../assets/more2.jpeg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',color:'white',fontSize:28}}>More..</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>

                </View>
            </View> 
        )
    }

}
const Styles = StyleSheet.create({
    mainview:{
        flex:1,
        backgroundColor:'black'
    },
    headerview:{
       flex:1
    },
    userpicture:{
        width:60,
        height:60,
        borderRadius:50
    },
    specialistspicture:{
        width:60,
        height:60,
        borderRadius:50
    },
    footerview:{
        flex:3,
        backgroundColor:'white',
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    secondview:{
        flex:1,
        position:'relative',
        width:326,
        height:65,
        backgroundColor:'#121212',
        alignSelf:'center',
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'baseline',
        marginBottom:10

    },
    uploadbutton:{
        width:windowWidth-23,
        height:63,
        backgroundColor:'#303134',
        alignSelf:'center',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'center',
        bottom:0,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    submainview:{
        backgroundColor:'#fff3f2',
        height:windowHeight,
        width:windowWidth,
        flex:1,
        position:'relative',
    },
    searchbox:{
        width:90*windowWidth/100,
        height:65,
        borderWidth:1,
        borderColor:'black',
        paddingLeft:25,
        backgroundColor:'#353535',
        borderRadius:10,
        alignSelf:'center',
        width:326,
        height:42,
        marginTop:15,
        color:'white',
        borderColor:'white'
    },
    searchedwordview:{
        position:'relative',
        width:326,
        height:60,
        backgroundColor:'#121212',
        alignSelf:'center',
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'baseline',
        marginBottom:20
    },
    searchedwordsubview1:{
        alignSelf:'center'
    },
    searchedwordplaybutton:{
        justifyContent:'center',
        marginLeft:5,
        width:46,
        height:45,
        alignSelf:'center'
    },
    playimage:{
        width:50,
        height:50
    },
    searchedwordsubview2:{
        alignSelf:"baseline",
        flexDirection:'column-reverse'
    },
    searchedwordpodcasterstext:{
        marginLeft:15,
        color:'white',
        fontSize:18,
        bottom:0,
        paddingBottom:10
    },
    searchedwordpodcasttext:{
        marginLeft:15,
        color:'white',
        fontSize:18,
        top:0,
        fontWeight:'bold'
    },
    loadingtext:{
        color:'white',
        textAlign:'center'
    },
    currentlyplayingview:{
        height:65,
        backgroundColor:'#2D2A2C',
        alignSelf:'center',
        borderRadius:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:90*windowWidth/100,
        marginBottom:10,
        borderWidth:2,
        borderBottomColor:'white',
    },
    currentlyplayingview2:{
        width:windowWidth,
        height:windowHeight,
        backgroundColor:'#2D2A2C',
        alignSelf:'baseline',
        flexDirection:'column',
        alignItems:'center'
    },
    currentlyplayingbutton:{
        marginLeft:5,
        justifyContent:'space-between',
        width:45,
        height:45,
        alignItems:'baseline',
        alignSelf:'center'
    },
    currentlyplayingimage:{
        width:46,
        height:45
    },
    currentlyplayingtext:{
        alignItems:'baseline',
        justifyContent: 'space-between',
        color:'white',
        fontSize:18,
        position:'relative',
        top:0,
        fontSize:14,
        fontWeight:'bold',
    },
    currentlyplayingbutton2:{
        justifyContent: 'space-between',
        width:45,
        height:45,
        alignItems:'baseline',
        alignSelf:'center',
        marginRight:5,
        marginLeft:10
    },
    nextbuttonimage:{
        width:46,
        height:45
    },
    secondviewsubview1:{
        alignSelf:'center'
    },
    secondviewplaybutton:{
        justifyContent:'center',
        marginLeft:5,
        width:46,
        height:50,
        alignSelf:'center'
    },
    secondviewplayimage:{
        width:46,
        height:45
    },
    secondviewsubview2:{
        alignSelf:"baseline",
        flexDirection:'column-reverse'
    },
    secondviewpodcasterstext:{
        marginLeft:15,
        color:'white',
        fontSize:18,
        bottom:0,
        paddingBottom:10
    },
    secondviewpodcasttext:{
        marginLeft:15,
        color:'white',
        fontSize:18,
        top:0,
        fontWeight:'bold'
    },
    currentlyplayingsubview1:{
      
        marginTop:15,
       
    },
    currentlyplayingsubview1text:{
        color:'white',
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center'
    },
    downbuttonimage:{
        width:25,
        height:25,
        alignSelf:'flex-start'
    },
    slider: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
})