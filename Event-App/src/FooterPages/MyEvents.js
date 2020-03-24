
import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Text, Icon, Body,Card,CardItem,Right} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class MyEvents extends React.Component {

  constructor(props) {
    super(props);
    
  }
  
  option1Click = () => {
    //alert('Press Option1')
    // this.props.navigation.navigate('EventView')
    this.props.navigation.push('EventView')
  };

  render() {
     const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

<Card primary>
{/* <CardItem header bordered style={{ backgroundColor: 'lightgray' }}> */}
    <CardItem header bordered>
      <Text>Event Name</Text>
    </CardItem>
    <CardItem bordered>
      <Body>
        <Text>
          NativeBase is a free and open source framework that enable
          developers to build
          high-quality mobile apps using React Native iOS and Android
          apps
          with a fusion of ES6.
        </Text>
      </Body>
    </CardItem>
    <CardItem footer bordered footer button onPress={() => this.option1Click()}>
        <Text>View</Text>
        <Right>
                <Icon name="arrow-forward" />
        </Right>
      </CardItem>
  </Card>
  <Card>
    <CardItem header bordered>
      <Text>Event Name</Text>
    </CardItem>
    <CardItem bordered>
      <Body>
        <Text>
          NativeBase is a free and open source framework that enable
          developers to build
          high-quality mobile apps using React Native iOS and Android
          apps
          with a fusion of ES6.
        </Text>
      </Body>
    </CardItem>
    <CardItem footer bordered footer button onPress={() => alert("This is Card Footer")}>
        <Text>View</Text>
        <Right>
                <Icon name="arrow-forward" />
        </Right>
      </CardItem>
  </Card>
  <Card>
    <CardItem header bordered>
      <Text>Event Name</Text>
    </CardItem>
    <CardItem bordered>
      <Body>
        <Text>
          NativeBase is a free and open source framework that enable
          developers to build
          high-quality mobile apps using React Native iOS and Android
          apps
          with a fusion of ES6.
        </Text>
      </Body>
    </CardItem>
    <CardItem footer bordered footer button onPress={() => alert("This is Card Footer")}>
        <Text>View</Text>
        <Right>
                <Icon name="arrow-forward" />
        </Right>
      </CardItem>
  </Card>
  <Card>
    <CardItem header bordered>
      <Text>Event Name</Text>
    </CardItem>
    <CardItem bordered>
      <Body>
        <Text>
          NativeBase is a free and open source framework that enable
          developers to build
          high-quality mobile apps using React Native iOS and Android
          apps
          with a fusion of ES6.
        </Text>
      </Body>
    </CardItem>
    <CardItem footer bordered footer button onPress={() => alert("This is Card Footer")}>
        <Text>View</Text>
        <Right>
                <Icon name="arrow-forward" />
        </Right>
      </CardItem>
  </Card>



      </View>
    );
  }
}

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo:{
    width:wp('20%'),
    height:hp('15%'),
      justifyContent: 'center',
      marginBottom:20,
    },
  inputContainer: {
   // borderBottomColor: '#F5FCFF',
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