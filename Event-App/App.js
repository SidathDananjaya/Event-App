
import React, { Component } from 'react';

import IntroSlider from './src/introSlider';
import Login from './src/login';
import Registration from './src/registration';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import TabContainer from './src/tabContainer';

import MyEvents from './src/FooterPages/MyEvents';
import JoinEvents from './src/FooterPages/JoinEvents';
import CreateEvent from './src/FooterPages/CreateEvent';

import Settings from './src/Settings';
import Home from './src/Home';

import Tab2 from './src/HomeTabs/Contacts'
import EventView from './src/EventView'


/* const MainNavigator = createStackNavigator({
  introSlider: {screen: IntroSlider},
  login: {screen: Login},
  registration: {screen: Registration},
  
});

const App  = createAppContainer(MainNavigator); */
 
/* 
class App extends Component {
  state = {  }
  render() { 
    return (  
      <IntroSlider/>
    );
  }
}

export default App;
 */
  
const App = createStackNavigator({
  //introSlider: {screen: IntroSlider,navigationOptions:{header:null}},
  login: {screen: Login,navigationOptions:{headerShown: false}},
  registration: {screen: Registration,navigationOptions:{headerShown: false}},
  tabContainer: {screen: TabContainer,navigationOptions:{headerShown: false}},
  myEvents: {screen: MyEvents,navigationOptions:{headerShown: false}},
  joinEvents: {screen: JoinEvents,navigationOptions:{headerShown: false}},
  Tab2: {screen: Tab2,navigationOptions:{headerShown: false}},
  EventView: {screen: EventView,navigationOptions:{headerShown: false}},
  },
  {
    initialRouteName: 'login',
  }
);
export default createAppContainer(App);