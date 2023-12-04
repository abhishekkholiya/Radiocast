import * as React from 'react';
import {View,Text,ScrollView,TouchableOpacity,Image,TextInput,Dimensions,StyleSheet,KeyboardAvoidingView,RefreshControl,Platform,FlatList,Alert,ActivityIndicator,ImageBackground} from 'react-native';
import db from '../tools/config';
import { collection, addDoc ,doc, getDocs,getDoc,limit,where,orderBy,query,startAfter,setDoc} from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL ,uploadBytes} from "firebase/storage";
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Sound } from 'expo-av/build/Audio';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
// let this.setState({audio_number:0});
export default class MainPostScreen2 extends React.Component {
  
 constructor(props){
     super(props);
     this.state = {
         loading:true,
         audios:[],
         show:false,
         currentlyplaying:'',
         currenturi:'',
         stop:false,
         i:'',
         showword:false,
         showtitle:'',
         showpodcasters:'',
         showuri:'',
         showthumbnail:'',
         limit:8,
         refreshing:false,
         lastVisible:null,
         showview:false,
         currentlyplayingpodcasters:'',
         currentlyplayingthumbnail:'',
         slider:0,
         playbackPosition:0,
         playbackDuration:0,
         previoustitle:'',
         duration:0,
         audiofiles:[],
         audioPlayer:new Sound(),
         listeners:0,
         uploadedsoon:false,
         audio_number:0
     }
     this.playAudio = async(title,index)=>{
        function SortArray(x, y){
            if (x.title < y.title) {return -1;}
            if (x.title > y.title) {return 1;}
            return 0;
        }
        var audiossorted = this.state.audiofiles.sort(SortArray);
        let previoustitle = this.state.previoustitle;
        this.setState({audio_number:0});
        if(previoustitle!== ''){
            await this.state.audioPlayer.setStatusAsync({shouldPlay:false});
            this.setState({audioPlayer:null});
                let soundbar = new Sound();
                await soundbar.loadAsync({    
                    uri:audiossorted[index].url
                },
                    {shouldPlay:true}
                )
                await soundbar.playAsync().then(()=>{   
                    this.calculateSeekbar(soundbar);
                    this.setState({
                        currenturi:audiossorted[index].url,
                        stop:false,
                        previoustitle:title          
                    });
                }).catch((err)=>{
                    console.log(err);
                });  
                var docRef2 = doc(db,"audios",`${title}`);
                var docSnap2 = await getDoc(docRef2);
                if(docSnap2.data().listeners){
                    await setDoc(doc(db,"audios",`${title}`),{
                        listeners:docSnap2.data().listeners + 1,
                    },{
                        merge:true
                    });
                }else{
                    await setDoc(doc(db,"audios",`${title}`),{
                        listeners:1,
                    },{
                        merge:true
                    });
                }
        }else{
            if(audiossorted[index].url){
                        await this.state.audioPlayer.loadAsync({    
                           uri:audiossorted[index].url
                        },
                            {shouldPlay:true}
                        );
                        await this.state.audioPlayer.playAsync().then(()=>{   
                            this.calculateSeekbar();
                            this.setState({
                                currenturi:audiossorted[index].url,
                                stop:false,
                                previoustitle:title
                            });
                        }).catch((err)=>{
                            console.log(err);
                        });  
                        var docRef2 = doc(db,"audios",`${title}`);
                        var docSnap2 = await getDoc(docRef2);
                        if(docSnap2.data().listeners){
                            await setDoc(doc(db,"audios",`${title}`),{
                                listeners:docSnap2.data().listeners + 1,
                            },{
                                merge:true
                            });
                        }else{
                            await setDoc(doc(db,"audios",`${title}`),{
                                listeners:1,
                            },{
                                merge:true
                            });
                        }
            }else{
                console.log('here 2');
                await this.state.audioPlayer.setStatusAsync({shouldPlay:false});
                        const storage = getStorage();
                        const storageRef = ref(storage,`${title}.mp3`);
                        getDownloadURL(storageRef)
                        .then(async (url) => {  
                            await this.state.audioPlayer.loadAsync({    
                                    uri:url
                                },
                                {shouldPlay:true}
                            );
                            await this.state.audioPlayer.playAsync().then(()=>{
                                this.calculateSeekbar();
                                this.setState({
                                    currenturi:audiossorted[index].url,
                                    stop:false,
                                    previoustitle:title
                                });
                            }).catch((err)=>{
                                console.log(err);
                            });  
                            var docRef2 = doc(db,"audios",`${title}`);
                            var docSnap2 = await getDoc(docRef2);
                            if(docSnap2.data().listeners){
                                await setDoc(doc(db,"audios",`${title}`),{
                                    listeners:docSnap2.data().listeners + 1,
                                },{
                                    merge:true
                                });
                            }else{
                                await setDoc(doc(db,"audios",`${title}`),{
                                    listeners:1
                                },{
                                    merge:true
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });

            }
        }
         
     }
     this.calculateSeekbar = async (soundobj)=>{
        if(soundobj){
            this.setState({
                audioPlayer:soundobj
            });
        }
        let status = this.state.audioPlayer.setOnPlaybackStatusUpdate((playbackStatus)=>{
            if(playbackStatus.isLoaded){    
                    if(this.state.duration !== playbackStatus.durationMillis && !isNaN(playbackStatus
                        .durationMillis)){
                        let millis = playbackStatus.durationMillis;
                        var minutes = Math.floor(millis / 60000);
                        var seconds = ((millis % 60000) / 1000).toFixed(0);
                        let text =  minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                        this.setState({
                            duration:text,
                            show:true
                        });
                    }
                    if(playbackStatus.didJustFinish){
                        let number = this.state.i + 1;
                        if(number < this.state.audios.length){
                            let uri = this.state.audios[number].file;
                            this.playAudio(this.state.audios[number].title,number);
                            this.setState({
                                currentlyplaying:this.state.audios[number].title,
                                currenturi:this.state.audios[number].file,
                                currentlyplayingpodcasters:this.state.audios[number].podcasters,
                                currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                i:number,
                                stop:false,
                                audio_number:0
                            });
                        }else{
                            number = 0;
                            let uri = this.state.audios[number].file;
                            this.playAudio(this.state.audios[number].title,number);
                            this.setState({
                                currentlyplaying:this.state.audios[number].title,
                                currenturi:this.state.audios[number].file,
                                currentlyplayingpodcasters:this.state.audios[number].podcasters,
                                currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                i:number,
                                stop:false,
                            });
                        }
                    }
                this.setState({slider:playbackStatus.positionMillis/playbackStatus.durationMillis,playbackPosition:playbackStatus.positionMillis,playbackDuration:playbackStatus.durationMillis,
                    audio_number:playbackStatus.positionMillis/playbackStatus.durationMillis
                
                });
                //return  audio_number = playbackStatus.positionMillis/playbackStatus.durationMillis;
            }else{
                return this.setState({audio_number:0});
            }
        });
    }
    this.downloadAudio  = async(audio)=>{
        let audiofiles = this.state.audiofiles;
        const storage = getStorage();
        const storageRef = ref(storage,`${audio}.mp3`);
        getDownloadURL(storageRef)
        .then(async (url) => {  
           let newData = {
                title:audio,
                url:url
           }
           audiofiles.push(newData);
           this.setState({
               audiofiles:audiofiles,
           });
        
        })
        .catch((error) => {
            console.log(error);
        });
    }
    this.getAudios = async()=>{
        let audios = [];
        let currentData = new Date();
        let initialQuery =  collection(db,'audios');
        const q =  query(initialQuery, orderBy("title"),where("category", "==",this.props.route.params.screename));
        const querySnapshot = await getDocs(q);
        if(querySnapshot){
            let documentData = querySnapshot.docs.map(document => document.data());
            let lastVisible;
            if(documentData.length>0){
             lastVisible = documentData[documentData.length - 1].title;
            }else{
               return this.setState({
                   loading:false,
                   uploadedsoon:true
               });
            }
            let documentData2 = querySnapshot.docs.forEach(document =>{ document.data()
                if(document.data()){
                    this.downloadAudio(document.data().title);
                    let newData = {
                        title:document.data().title,
                        podcasters:document.data().podcasters,
                        thumbnail:document.data().thumbnail,
                     
                    }
                    this.setState({listeners:this.state.listeners+document.data().listeners});
                    if(newData.thumbnail !== ''){
                        const storage = getStorage();
                        const storageRef = ref(storage,`audio_thumbnails/${newData.title}`);
                        getDownloadURL(storageRef)
                        .then((url) => {
                               newData.thumbnail = url
                        })
                        .catch((error) => {
                            console.log(error);
                            newData.thumbnail = '';
                        });
                    }
                    audios.push(newData);
                    this.setState({
                        audios:audios,
                        loading:false,
                        lastVisible:lastVisible,
                    });
                }
            });
        }else{
            this.setState({
                loading:false
            });
        }

    }


    this.stopAudio = async(audio)=>{
        try{
            if(this.state.audioPlayer._loaded === true){
                 await this.state.audioPlayer.pauseAsync();
            }
        }catch(err){
            console.log(err);
        }
    }
    this.resumeAudio = async(audio)=>{
        await this.state.audioPlayer.playAsync(audio);
    }
    this.searchText = async(word)=>{
        if(word && word !== ''){
            let itemdata;
            let newData = this.state.audios.filter((item,index)=>{
                if(item.title.toLowerCase().includes(word.toLowerCase())){
                    return this.setState({
                        showtitle:item.title,
                        showword:true,
                        showpodcasters:item.podcasters,
                        i:index,
                        showthumbnail:item.thumbnail
                    });
                }
            });
        }else{
            this.setState({
                showword:false
            });
        }
    }
    this.items = ({item,index})=>{
        return(
            <View  style={Styles.secondview}>
                    <View style={Styles.secondviewsubview1}>
                        <TouchableOpacity style={Styles.secondviewplaybutton} onPress={async ()=>{
                                try {
                                    this.playAudio(item.title,index);
                                } catch (e) {
                                    console.warn(e);
                                }
                                this.setState({
                                    show:false,
                                    currentlyplaying:`${item.title}`,
                                    i:index,
                                    currentlyplayingpodcasters:item.podcasters,
                                    currentlyplayingthumbnail:item.thumbnail
                                });
                            }}>
                            {item.thumbnail !== '' ?
                              <Image source={{uri:item.thumbnail}} style={Styles.secondviewplayimage}/>:
                              <Image source={require('../assets/musicfile2.png')} style={Styles.secondviewplayimage}/>
                            
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.secondviewsubview2}>
                        <Text style={Styles.secondviewpodcasterstext}>By {item.podcasters.substring(0,25)}</Text>
                        <Text style={Styles.secondviewpodcasttext}>{item.title.substring(0,25)}</Text>
                            
                    </View>               
            </View>

        )
    } 
    this.retrieveMore = async ()=>{
        try{
            let audios = this.state.audios;
            this.setState({
                refreshing:true
            });
            let additionalQuery = collection(db,"audios");
            const q = query(additionalQuery, limit(this.state.limit), orderBy('title'),where("category", "==",this.props.route.params.screename),startAfter(this.state.lastVisible));
            let querySnapshot  = await getDocs(q);
            let documentData = querySnapshot.docs.map(document => document.data());
            let lastVisible;
            if(documentData.length> 0){
             lastVisible = documentData[documentData.length - 1].title;
            }else{
                lastVisible = this.state.lastVisible;
            }
            let documentData2 = querySnapshot.docs.forEach(document =>{ document.data()
                if(document.data()){
                    this.downloadAudio(document.data().title);
                    let newData = {
                        title:document.data().title,
                        podcasters:document.data().podcasters,
                    }
                    this.setState({listeners:this.state.listeners+document.data().listeners});
                    if(newData.thumbnail !== ''){
                        const storage = getStorage();
                        const storageRef = ref(storage,`audio_thumbnails/${document.data().title}`);
                        getDownloadURL(storageRef)
                        .then((url) => {
                               newData.thumbnail = url
                        })
                        .catch((error) => {
                            console.log(error);
                            newData.thumbnail = '';
                        });
                    }
                    audios.push(newData);
                    this.setState({
                        audios:audios,
                        refreshing:false,
                        lastVisible:lastVisible
                    });
                }
                
            });
        }catch(err){
            console.log(err);
        }
    }
    this.renderFooter = () => {
        try {
          if (this.state.loading) {
            return (
              <View style={{alignSelf:'center',alignItems:'center'}}>
                   <ActivityIndicator size="large" color="white" style={{marginTop:10}}/>: 

              </View>
            )
          }else {
            return null;
          }
        }catch (error) {
          console.log(error);
        }
    };
    this.getAudios();
    

  
 }

 componentWillUnmount(){
     this.stopAudio();
 }
 render(){
    return(        
            <View style={Styles.mainview} >    
                  
                     <ImageBackground style={{width:windowWidth,height:170,alignItems:'center',justifyContent:'center',backgroundColor:'#A35BAE'}}>
                         <Text style={{color:'white',fontSize:24}}>{this.props.route.params.screename}</Text>
                         <Text style={{color:'white',fontSize:18,marginTop:10}}>{this.state.listeners} listeners</Text>
                     </ImageBackground>
                        
                <View style={Styles.submainview}>
                    <TextInput placeholder="Search here" style={Styles.searchbox} onChangeText={(word)=>{this.searchText(word) }}></TextInput>
                    {this.state.uploadedsoon?<Text style={{textAlign:'center',justifyContent:'center',color:'white',fontSize:20,marginTop:10}}>To be uploaded soon</Text>:console.log()}
                    {this.state.showword?
                            <View style={Styles.searchedwordview}>
                                    <View style={Styles.searchedwordsubview1}>
                                        <TouchableOpacity style={Styles.searchedwordplaybutton} onPress={async ()=>{
                                                try {
                                                    this.playAudio(this.state.showtitle,this.state.i);
                                                    } catch (e) {
                                                        console.warn(e);
                                                }
                                                this.setState({
                                                    currentlyplaying:this.state.showtitle,
                                                    currenturi:this.state.showuri,
                                                    stop:false,
                                                    currentlyplayingpodcasters:this.state.showpodcasters,
                                                    currentlyplayingthumbnail:this.state.showthumbnail
                                                });
                                            }}>
                                             {this.state.showthumbnail !== '' ?
                                                <Image source={{uri:this.state.showthumbnail}} style={Styles.secondviewplayimage}/>:
                                                <Image source={require('../assets/musicfile2.png')} style={Styles.secondviewplayimage}/>
                                             }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={Styles.searchedwordsubview2}>
                                        <Text style={Styles.searchedwordpodcasterstext}>By {this.state.showpodcasters}</Text>
                                        <Text style={Styles.searchedwordpodcasttext}>{this.state.showtitle}</Text>
                                    </View>
                           </View>:console.log()
                    }

                    {this.state.loading ?  
                          <ActivityIndicator size="large" color="white" style={{marginTop:10}}/>: 
                        <FlatList  
                            data={this.state.audios}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={(item)=>this.items(item)}
                            ListFooterComponent={this.renderFooter()}
                            // On End Reached (Takes a function)
                            onEndReached={this.retrieveMore}
                            // How Close To The End Of List Until Next Data Request Is Made
                            onEndReachedThreshold={0}
                            // Refreshing (Set To True When End Reached)
                            refreshing={this.state.refreshing}
                        >
                        </FlatList>  
                    }   
                </View>

                {this.state.show?
                        <View>
                                    {this.state.showview === false ?
                                      <View>
                                        <TouchableOpacity style={Styles.currentlyplayingview} onPress={()=>{this.setState({showview:true})}}>
                                           
                                                    <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'space-around'}}>
                                                        <TouchableOpacity onPress={()=>{this.setState({showview:true})}}>
                                                             <Image source={{uri:this.state.currentlyplayingthumbnail}} style={{width:45,height:45,borderRadius:10,marginLeft:5,alignSelf:'center'}}/>
                                                        </TouchableOpacity>
                                                        <View style={{marginLeft:10,flexDirection:'column',alignSelf:'center'}}>  
                                                            <Text style={Styles.currentlyplayingtext}>{this.state.currentlyplaying.substring(0,25)}</Text>  
                                                            <Text style={Styles.currentlyplayingtext}>{this.state.currentlyplayingpodcasters.substring(0,25)}</Text>  
                                                        </View>     
                                                    </View>
                                                          
                                                        <View style={{alignSelf:'center',flexDirection:'row',justifyContent:'space-around'}}>
                                                        <TouchableOpacity style={Styles.currentlyplayingbutton} onPress={()=>{this.setState({stop:!this.state.stop});
                                                                     try{
                                                                         if(this.state.stop === false){
                                                                         this.stopAudio(this.state.currenturi);
                                                                         }else{
                                                                         this.resumeAudio(this.state.currenturi);
                                                                         }
                                                                     }catch(err){
                                                                         console.log(err);
                                                                     }
                                                                 }}>
                                                                     <Image source={this.state.stop?require('../assets/playing.png'):require('../assets/pause.png')} style={Styles.currentlyplayingimage}/>
                                                         </TouchableOpacity>
                                                            <TouchableOpacity style={Styles.currentlyplayingbutton2} onPress={ async ()=>{
                                                                let number = this.state.i + 1;
                                                                if(number < this.state.audios.length){
                                                                    this.playAudio(this.state.audios[number].title,number);
                                                                    this.setState({
                                                                        currentlyplaying:this.state.audios[number].title,
                                                                        currenturi:this.state.audios[number].file,
                                                                        i:number,
                                                                        stop:false,
                                                                        currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                                                        currentlyplayingpodcasters:this.state.audios[number].podcasters

                                                                    });
                                                                //  await this.downloadImage(this.state.audios[number].title);
                                                                }else{
                                                                    number = 0;
                                                                    this.playAudio(this.state.audios[number].title,number);
                                                                    this.setState({
                                                                        currentlyplaying:this.state.audios[number].title,
                                                                        currenturi:this.state.audios[number].file,
                                                                        i:number,
                                                                        stop:false,
                                                                        currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                                                        currentlyplayingpodcasters:this.state.audios[number].podcasters
                                                                    });
                                                                //  await this.downloadImage(this.state.audios[number].title);
                                                                }
                                                            }}>
                                                            
                                                                <Image source={require('../assets/nextbutton.png')} style={Styles.nextbuttonimage}/>
                                                            </TouchableOpacity>
 
                                                        </View>
                                               
                                           
                                        </TouchableOpacity>
                                       
                                        </View>

                                    :
                                    <View style={{  width:windowWidth,
                                        height:windowHeight,
                                        backgroundColor:'#2D2A2C'}}>
                                             <View style={{flexDirection:"row",alignSelf:'center',width:windowWidth,alignItems:'center'}}>
                                                    <View style={{marginTop:15,marginLeft:15,alignSelf:'center'}}>
                                                            <TouchableOpacity onPress={()=>{this.setState({showview:false})}}>
                                                                    <Image source={require('../assets/down-chevron.png')} style={Styles.downbuttonimage}/>
                                                            </TouchableOpacity>  
                                                    </View>
                                            </View>
                                     <View style={Styles.currentlyplayingview2}>   
                                               
                                     
                                        <View style={{alignSelf:"center",alignItems:'center',marginTop:5,borderRadius:10}}>
                                        {this.state.currentlyplayingthumbnail !== '' ?
                                            <Image source= {{uri:this.state.currentlyplayingthumbnail}} style={{width:65*windowWidth/100 ,height:35*windowHeight/100,borderRadius:10}}/>
                                            :
                                            <Image source= {require('../assets/musicfile2.png')} style={{width:300 ,height:250}}/>

                                        }
                                        </View>   
                                        <View style={{alignSelf:'baseline',flexDirection:'row',width:windowWidth,alignItems:"stretch"}}>  
                                            <View style={{ alignSelf:"baseline",flexDirection:'column',marginTop:15,marginLeft:20}}>
                                                <Text style={{alignSelf:'flex-start',color:'white',fontSize:24,fontWeight:'bold'}}>{this.state.currentlyplaying.substring(0,25)}</Text>
                                                <Text style={{alignSelf:'flex-start',color:'white',fontSize:16}}>By {this.state.currentlyplayingpodcasters.substring(0,25)}</Text>
                                            </View> 
                                        </View>     
                                        <View>    
                                           
                                                <Slider
                                                    style={{width:296,height:40,alignSelf:'center'}}
                                                    minimumValue={0}
                                                    maximumValue={1}
                                                    minimumTrackTintColor="#FFFFFF"
                                                    step={0.0001}
                                                    value={this.state.audio_number}
                                                    onSlidingStart={async()=>{
                                                        this.stopAudio();
                                                    }}
                                                    onSlidingComplete={async(value)=>{
                                                        let val = value * 100;
                                                        this.setState({
                                                            stop:false
                                                        });
                                                        // if(this.state.audioPlayer.getStatusAsync().isPlaying){
                                                            console.log(this.state.previoustitle,this.state.currentlyplaying);
                                                            return this.state.audioPlayer.playFromPositionAsync(val * this.state.playbackDuration/100);
                                                        // }
                                                       
                                                    }}
                                                />  
                                                 <Text style={{color:"white",alignSelf:'flex-end'}}>{this.state.duration}</Text>
                                                                  
                                            <View style={{alignSelf:'baseline',flexDirection:"row",alignItems:'center',marginTop:5,marginBottom:40,justifyContent:'center'}}>
                                            <TouchableOpacity style={{alignSelf:'baseline'}}  onPress={async ()=>{
                                                  let number = this.state.i - 1;
                                                  if(number < this.state.audios.length && number >= 0){
                                                      this.playAudio(this.state.audios[number].title,number);
                                                      this.setState({
                                                          currentlyplaying:this.state.audios[number].title,
                                                          currenturi:this.state.audios[number].file,
                                                          currentlyplayingpodcasters:this.state.audios[number].podcasters,
                                                          currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                                          i:number,
                                                          stop:false
                                                      })
                                                      this.setState({audio_number:0});
                                                  }else{
                                                      number = this.state.audios.length -1;
                                                      this.playAudio(this.state.audios[number].title,number);
                                                      this.setState({
                                                          currentlyplaying:this.state.audios[number].title,
                                                          currenturi:this.state.audios[number].file,
                                                          currentlyplayingpodcasters:this.state.audios[number].podcasters,
                                                          currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                                          i:number,
                                                          stop:false,                                                      
                                                        })
                                                      this.setState({audio_number:0});
                                                  }
                                            }}>
                                                <Image source={require('../assets/mustard-previous.png')} style={{width:50,height:50}}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{alignSelf:'baseline',marginLeft:61,marginRight:61}} onPress={()=>{
                                                this.setState({stop:!this.state.stop});
                                                try{
                                                    if(this.state.stop === false){
                                                        this.stopAudio(this.state.currenturi);
                                                    }else{
                                                        this.resumeAudio(this.state.currenturi);
                                                    }
                                                }catch(err){
                                                    console.log(err);
                                                }
                                            }}>
                                                <Image source={this.state.stop?require('../assets/play-button.png'):require('../assets/pause-button.png')} style={{width:60,height:60}}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{alignSelf:'baseline'}} onPress={async ()=>{
                                                  this.setState({audio_number:0});
                                                  let number = this.state.i + 1;
                                                  if(number < this.state.audios.length){
                                                      this.playAudio(this.state.audios[number].title,number);
                                                      this.setState({
                                                          currentlyplaying:this.state.audios[number].title,
                                                          currenturi:this.state.audios[number].file,
                                                          currentlyplayingpodcasters:this.state.audios[number].podcasters,
                                                          currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                                          i:number,
                                                          stop:false,
                                                      })
                                                  }else{
                                                      number = 0;
                                                      this.playAudio(this.state.audios[number].title,number);
                                                      this.setState({
                                                          currentlyplaying:this.state.audios[number].title,
                                                          currenturi:this.state.audios[number].file,
                                                          currentlyplayingpodcasters:this.state.audios[number].podcasters,
                                                          currentlyplayingthumbnail:this.state.audios[number].thumbnail,
                                                          i:number,
                                                          stop:false,
                                                      });
                                                  }
                                            }}>
                                                <Image source={require('../assets/mustard-next.png')} style={{width:50,height:50}}/>
                                            </TouchableOpacity>

                                        </View>     
                                        </View>
                                     </View>
                                     </View>
                                     }
                        </View>:console.log()
                }
            </View>

        )
    }
    

}
//#fff3f2
/*position:'relative',
        width:326,
        height:65,
        backgroundColor:'#2D2A2C',
        alignSelf:'center',
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,*/
const Styles = StyleSheet.create({
    mainview:{
        flex:1,
        backgroundColor:'black'
    },
    secondview:{
        flex:3,
        marginTop:10,
        backgroundColor:'#2D2A2C',
        alignSelf:'center',
        borderRadius:10,
        flexDirection: 'row',
        width:80*windowWidth/100,
        borderWidth:2,
        alignItems:'center'

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
        backgroundColor:'black',
        flex:3,
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
        alignItems:'center'
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
});