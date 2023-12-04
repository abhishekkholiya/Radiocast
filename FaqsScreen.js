import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Image} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class FaqsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            answer:'',
            boxopened:'',
            opened:false
        }
    }
    render(){
        return( 
                <View style={styles.mainview}>
                    <View style={styles.headerview}>               
                        <Text style={styles.header}>Questions? We have got instant answers!</Text>
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                        
                    <View style={styles.subview}>
                            <ScrollView>
                     
                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>Why is this app not available for IOS?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:'We are currently working on bringing IOS app for IOS users and will let you know once its available',boxopened:'box1',opened:!this.state.opened})}}>
                                            {this.state.boxopened === 'box1' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box1' && this.state.opened === true?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>

                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>What is this app for?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:"this is a podcast app that tries to add value to people's life by sharing great podcast for personality development and inspiration",boxopened:'box2',opened:!this.state.opened})}}>
                                        {this.state.boxopened === 'box2' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box2' && this.state.opened === true ?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>

                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>How can we support the ngo?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:"Every support counts! You can support us by using this app and sharing it with other friends and you can donate us from About Us page",boxopened:'box3',opened:!this.state.opened})}}>
                                        {this.state.boxopened === 'box3' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box3' && this.state.opened === true ?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>
                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>How to give feedback?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:"1> Press the back button on the top extreme left corner. 2> press on feedback button. 3> Enter your feedback. 4> Press on send button.",boxopened:'box4',opened:!this.state.opened})}}>
                                        {this.state.boxopened === 'box4' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box4' && this.state.opened === true ?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>

                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>How to logout?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:"1> Press the back button on the top extreme left corner. 2> press on logout button. Once you logout you can login in again with the same credentials",boxopened:'box5',opened:!this.state.opened})}}>
                                        {this.state.boxopened === 'box5' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box5' && this.state.opened === true ?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>


                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>How to change profile picture?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:"1> Press the back button on the top extreme left corner. 2> press on your profile picture. Once you select the image it will be added as your profile picture",boxopened:'box6',opened:!this.state.opened})}}>
                                        {this.state.boxopened === 'box6' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box6' && this.state.opened === true ?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>

                                <View style={styles.questionbox}>
                                    <View style={styles.subquestionbox}>
                                        <Text style={styles.questiontext}>How to contact for support?</Text>
                                        <TouchableOpacity style={styles.downarrowbutton} onPress={()=>{this.setState({answer:"You contact us to our email boletohpahadipodcast@gmail.com for support",boxopened:'box7',opened:!this.state.opened})}}>
                                        {this.state.boxopened === 'box7' && this.state.opened === true?
                                            <Image source={require('../assets/arrow-up.png')} style={{width:20,height:20}}/>
                                            :
                                            <Image source={require('../assets/arrow-down.png')} style={{width:20,height:20}}/>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {this.state.boxopened === 'box7' && this.state.opened === true ?
                                        <Text style={styles.answer}>{this.state.answer}</Text>:console.log()
                                    }
                                </View>
                            </ScrollView>
                    </View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    mainview:{
        flex:1,
        backgroundColor:'black',
        width:windowWidth,
        height:windowHeight
    },
    subview:{
        flex:3,
        marginTop:80,
        width:windowWidth,
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'100%'
    },
    headerview:{
        marginTop:10
    },
    header:{
        flex:1,
        color:'white',
        fontSize:36,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:10
    },
    questionbox:{
        marginTop:20,
        width:'90%',
        backgroundColor:'#E0E2E2',
        alignSelf:'center',
        borderRadius:10,
    },
    subquestionbox:{
        alignItems:'center',
        flexDirection:'row',
    },
    questiontext:{
        marginTop:10,
        color:'black',
        fontSize:24,
        fontWeight:'bold',
        marginLeft:5,
        marginBottom:10
    },
    downarrowbutton:{
        marginLeft:5,
        marginRight:5
    },
    answer:{
        marginTop:20,
        color:'black',
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        marginRight:5,
        marginLeft:5
    }
});