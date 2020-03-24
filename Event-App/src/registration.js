import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const { width, height } = Dimensions.get('window');

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uname:'',
      uemail: '',
      phoneNo:'',
      upassword: '',
      checkUvalidate:true,
      checkEvalidate:true,
      checkPNvalidate:true,
      checkPvalidate:true,
      emptyError:true,
    }
  }

  //validation
  validate = (text,type) =>
  {
    //console.warn(text);

    //**************************************************** */
    //accept numbers and characters /^[A-Za-z0-9]+$/
    //check for empty spaces /^[(\w+\S+)]+$/
    //accept only characters /^[a-zA-Z]+$/
    //accept only numbers /^[0-9]+$/
    
    //var alph=/^[A-Za-z0-9]+$/
    //var num=/^[0-9]+$/
    var alph=/^[A-Za-z0-9]+$/
    var em=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    var ph=/^(([\+]{1}[0-9]{1,3}[\ ]{1}[0-9]{1,2}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\-]{1}[0-9]{4}[\-]{1}[0-9]{4})|([\(]{1}[0]{1}[0-9]{1}[\)]{1}[\ ]{1}[0-9]{4}([\ ]|[\-]){1}[0-9]{4})|([0-9]{4}([\ ]|[\-])?[0-9]{4})|([0]{1}[0-9]{3}[\ ]{1}[0-9]{3}[\ ]{1}[0-9]{3})|([0]{1}[0-9]{9})|([\(]{1}[0-9]{3}[\)]{1}[\ ]{1}[0-9]{3}[\-]{1}[0-9]{4})|([0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[\-]?[0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[0-9]{9}[0-9]?)|([0-9]{3}[\.]{1}[0-9]{3}[\.]{1}[0-9]{4})|([\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\.]|[\-]){1}[0-9]{4}(([\ ]?(x|ext|extension)?)([\ ]?[0-9]{3,4}))?)|([1]{1}[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\-]){1}[0-9]{4})|([\+]{1}[1]{1}[\ ]{1}[0-9]{3}[\.]{1}[0-9]{3}[\-]{1}[0-9]{4})|([\+]{1}[1]{1}[\ ]?[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}[\-]{1}[0-9]{4}))$/
    var num=/^[(\w+\S+)]+$/
    if(type=='username')
     {
        if(alph.test(text))
        {
            this.setState({
                checkUvalidate:true,
            })
        }
        else{
            this.setState({
                checkUvalidate:false,
                emptyError:true,
            })
        }
    }
    if(type=='email')
    {
        if(em.test(text))
        {
            this.setState({
                checkEvalidate:true,
            })
        }
        else{
            this.setState({
                checkEvalidate:false,
                emptyError:true,
            })
        }
    }
    if(type=='phoneNo')
    {
        if(ph.test(text))
        {
            this.setState({
                checkPNvalidate:true,
            })
        }
        else{
            this.setState({
                checkPNvalidate:false,
                emptyError:true,
            })
        }
    }
    if(type=='password')
    {
        if(num.test(text))
        {
            this.setState({
                checkPvalidate:true,
            })
        }
        else{
            this.setState({
                checkPvalidate:false,
                emptyError:true,
            })
        }
    }
  }

    //registration function
    UserRegFunction = () =>{

      const { uname }  = this.state ;
      const { uemail }  = this.state ;
      const { phoneNo }  = this.state ;
      const { upassword }  = this.state ;
      //console.warn(uname,uemail,phoneNo,upassword);
      if(uname=='' || uemail=='' || phoneNo=='' || upassword=='' )
    {
        this.setState({
            emptyError:false,
            
        })
    }
    else{
        this.setState({
            emptyError:true,
        })
      
     fetch('http://192.168.1.10/OKEventAPI/api/User/UserRegistration', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
      
        user_Name: uname,
        email: uemail,
        phone_Number:parseInt(phoneNo),
        password: upassword,
      
       })
      
     }).then((response) => response.json())
           .then((responseJson) => {
            //Alert.alert(responseJson);
           if(responseJson == 'Account has been created successfully.')
           {
            Alert.alert('Registration succefull, Please Sign In !!!');
            this.props.navigation.navigate('login');
           }
           else{
            Alert.alert(responseJson);
           }
           }).catch((error) => {
             console.error(error);
           });
      
          }
       }

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
          
          <Text style={{fontSize: 26,color: '#fff',textAlign: 'center',marginBottom: 30,}}>
          Sign Up
        </Text>

        <View style={[styles.inputContainer, !this.state.checkUvalidate? styles.error:null]}>
            <TextInput style={styles.inputs}
                placeholder="Name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                //onChangeText={(uname) => this.setState({uname})}/>
                onChangeText={(uname) => {this.setState({uname});this.validate(uname,'username')}}/>
            <Image style={styles.inputIcon} source={require('../images/icons8-name-64.png')}/>
          </View>

          <View style={[styles.inputContainer, !this.state.checkEvalidate? styles.error:null]}>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                //onChangeText={(uemail) => this.setState({uemail})}/>
                onChangeText={(uemail) => {this.setState({uemail});this.validate(uemail,'email')}}/>
            <Image style={styles.inputIcon} source={require('../images/icons8-email-64.png')}/>
          </View>

          <View style={[styles.inputContainer, !this.state.checkPNvalidate? styles.error:null]}>
            <TextInput style={styles.inputs}
                placeholder="Phone Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                //onChangeText={(phoneNo) => this.setState({phoneNo})}/>
                onChangeText={(phoneNo) => {this.setState({phoneNo});this.validate(phoneNo,'phoneNo')}}/>
            <Image style={styles.inputIcon} source={require('../images/icons8-phone-bubble-64.png')}/>
          </View>
          
          <View style={[styles.inputContainer,, !this.state.checkPvalidate? styles.error:null]}>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                //onChangeText={(upassword) => this.setState({upassword})}/>
                onChangeText={(upassword) => {this.setState({upassword});this.validate(upassword,'password')}}/>
            <Image style={styles.inputIcon} source={require('../images/icons8-password-64.png')}/>
          </View>

          {/* <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Re Enter Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(rePassword) => this.setState({rePassword})}/>
            <Image style={styles.inputIcon} source={require('../images/key.png')}/>
          </View> */}

        {!this.state.checkUvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Accept only Letters & Numbers.</Text>}
        {!this.state.checkEvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Please enter valid email address.</Text>}
        {!this.state.checkPNvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Please enter valid Phone Number.</Text>}
        {!this.state.checkPvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Please enter valid password.</Text>}
        {!this.state.emptyError && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Fill All Fields !!!</Text>}
  
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserRegFunction}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>

          <View style={[styles.registerContainer]}>
            <Text style={{fontSize: hp('2%'),color: '#fff'}}>Already have an account?</Text>
          
            <TouchableOpacity style={styles.btnRegister} onPress={() => navigate('login')}>
              <Text style={styles.btnText1}>Sign In</Text>
            </TouchableOpacity>
          </View>
  
          

        </View>
      );
    }
  }
  
  const resizeMode = 'center';
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1d324d',
    },
    logo:{
      width:wp('20%'),
      height:hp('15%'),
        justifyContent: 'center',
        marginBottom:20,
      },
    inputContainer: {
      //borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      //borderBottomWidth: 1,
      width:wp('80%'),
      height:hp('5%'),
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
  
      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginRight:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      width:wp('80%'),
      height:hp('5%'),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      borderRadius:30,
      backgroundColor:'transparent'
    },
    registerContainer: {
      
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop:80,
      width:wp('50%'),   
      backgroundColor:'transparent'
    },
    btnRegister: {
      
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start', 
      marginTop:1.5,
      width:wp('50%'),
      backgroundColor:'transparent'
    },
    btnForgotPassword: {
      width:wp('80%'),
      height:hp('2%'),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom:10,
      backgroundColor:'transparent'
    },
    loginButton: {
      backgroundColor: "#ffff",
  
      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
  
      elevation: 19,
    },
    loginText: {
      color: '#1d324d',
      fontSize: hp('3%'),
    },
    bgImage:{
      flex: 1,
      resizeMode,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    btnText:{
      color:"white",
      fontWeight:'bold',
      fontSize: hp('2%'),
    },
    btnText1:{
      color:"white",
      fontWeight:'bold',
      fontSize: hp('2%'),
    },
    error:{
      borderWidth:1,
      borderColor:"red",
      borderRadius:30,
  }
  }); 