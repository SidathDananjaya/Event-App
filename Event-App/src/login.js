import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//splash screen6
class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: '#1d5242' }];
    const textStyles = {
      color: 'white',
      fontSize: hp('5%'),
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
        <StatusBar hidden={true} />
        <Image 
            source={require('../images/calendar.png')} 
            style={{width: 100, height: 100}} 
              
        />
        <Text style={textStyles}>
          Welcome to Event App
        </Text>
      </View>
    );
  }
}

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uname:'',
      upassword: '',
      checkvalidate: true,
      checkPvalidate: true,
      emptyError: true,
      isLoading: true
    };
  }

  //validations 

  validate = (text,type) =>
      {
        //**************************************************** */
        //accept numbers and characters /^[A-Za-z0-9]+$/
        //check for empty spaces /^[(\w+\S+)]+$/
        //accept only characters /^[a-zA-Z]+$/
        //accept only numbers /^[0-9]+$/
        
        //var alph=/^[A-Za-z0-9]+$/
        //var num=/^[0-9]+$/
        var alph=/^[A-Za-z0-9]+$/
        var num=/^[(\w+\S+)]+$/
        if(type=='username')
         {
            if(alph.test(text))
            {
                this.setState({
                    checkvalidate:true,
                })
            }
            else{
                this.setState({
                    checkvalidate:false,
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


    //start of splash
    performTimeConsumingTask = async () => {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve('result');
        }, 5000),
      );
    };

    async componentDidMount() {
      // Preload data from an external API
      // Preload data using AsyncStorage
      const data = await this.performTimeConsumingTask();
  
      if (data !== null) {
        this.setState({ isLoading: false });
      }
    }
    //end of splash
  
    //login function
  UserLoginFunction = () =>{
 
    const { uname }  = this.state ;
    const { upassword }  = this.state ;

    if(uname=='' || upassword=='')
    {
        this.setState({
            emptyError:false,
            
        })
    }
    else{
        this.setState({
            emptyError:true,
        })
        // fetch('http://192.168.1.110/OKEventAPI/api/User/userLogin', {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       user_Name: uname,
        //       password: upassword,
        //     }),
        //   })
        //     .then(response => response.json())
        //     .then(responseJson => {
        //       //Alert.alert(responseJson);
        //       if (responseJson == 'Successfully Login.') {
        //         //Alert.alert('Can redirect to the page.');
        //         this.props.navigation.navigate('tabContainer');
        //       } else {
        //         Alert.alert(responseJson);
        //       }
        //     })
        //     .catch(error => {
        //       console.error(error);
        //     });   
        this.props.navigation.navigate('tabContainer');
    }
  }
  
    render() {

      const {navigate} = this.props.navigation;
      if (this.state.isLoading) {
        return <SplashScreen />;
      }
        
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Image style={styles.logo} source={require('../images/icons8-event-64.png')}/>

          <View style={[styles.inputContainer, !this.state.checkvalidate? styles.error:null]}>
          <TextInput
            style={styles.inputs}
            placeholder="User Name"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            //onChangeText={(username) => this.setState({username})}
            onChangeText={(uname) => {this.setState({uname});this.validate(uname,'username')}}
            //to go to next text input field
            returnKeyType = { "done" }
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}/>
          <Image
            style={styles.inputIcon}
            source={require('../images/icons8-email-64.png')}
          />
        </View>

        <View style={[styles.inputContainer, !this.state.checkPvalidate? styles.error:null]}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            //onChangeText={(password) => this.setState({password})}
            onChangeText={(upassword) =>  {this.setState({upassword});this.validate(upassword,'password')}}
            // onSubmitEditing={() => console.warn('onSubmitEditing triggered')}/>
            onSubmitEditing={() => this.UserLoginFunction()}
            ref={(input) => { this.secondTextInput = input; }}/>
          <Image
            style={styles.inputIcon}
            source={require('../images/icons8-password-64.png')}
          />
        </View>

        {/* <TouchableOpacity style={styles.btnForgotPassword} onPress={() => this.onClickListener('restore_password')}>
                      <Text style={styles.btnText}>Forgot your password?</Text>
                  </TouchableOpacity> */}

        {!this.state.checkvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Accept only Letters & Numbers.</Text>}
        {!this.state.checkPvalidate && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Please enter valid password.</Text>}
        {!this.state.emptyError && <Text style={{fontSize:12,color: 'red',marginBottom: 30,}}>Please enter username & password!!!</Text>}

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.UserLoginFunction}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
          

  
          <View style={[styles.registerContainer]}>
                    <Text style={{fontSize: hp('2%'),color: '#fff'}}>Don't have an account?</Text>
                  
                    <TouchableOpacity style={styles.btnRegister} onPress={() => navigate('registration')}>
                      <Text style={styles.btnText1}>Sign Up</Text>
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
  logo: {
    width: wp('20%'),
    height: hp('15%'),
    justifyContent: 'center',
    marginBottom: 25,
  },
  inputContainer: {
   // borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
   // borderBottomWidth: 1,
    width: wp('80%'),
    height: hp('5%'),
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: wp('80%'),
    height: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 80,
    width: wp('50%'),
    backgroundColor: 'transparent',
  },
  btnRegister: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 1.5,
    width: wp('50%'),
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    width: wp('80%'),
    height: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#ffff',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: '#1d324d',
    fontSize: hp('3%'),
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  btnText1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2%'),

    //textDecorationLine: 'underline',
  },
    error:{
        borderWidth:1,
        borderColor:"red",
        borderRadius:30,
    }
});

