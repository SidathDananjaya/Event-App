import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, Left, Button, Body, Right, Title } from 'native-base';
import Tab1 from './HomeTabs/tab1';
import Tab2 from './HomeTabs/tab2';
import Tab3 from './HomeTabs/tab3';

//import react in our code.
import { Image, TouchableOpacity  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item

class TabContainer extends Component {
  
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  option1Click = () => {
    this._menu.hide();
    //this.props.option1Click();
    this.props.navigation.navigate('EventView')
  };
  option2Click = () => {
    this._menu.hide();
    this.props.option2Click();
  };
  option3Click = () => {
    this._menu.hide();
    this.props.option3Click();
  };
  option4Click = () => {
    this._menu.hide();
    this.props.option4Click();
  };

    render() { 
      const {navigate} = this.props.navigation;
        return ( 

            <Container>
              {/* <Header hasTabs style={{backgroundColor:'#1d324d'}}> */}
              <Header hasTabs>

      {/*         <Left>
            <Button transparent  onPress={() => Actions.pop()}>
              <Icon active name="arrow-back" />
            </Button>
          </Left> */}
          <Body >
              <Title color='white' >Event App</Title>
          </Body>
          <Right>
            <Menu
              ref={this.setMenuRef}
                button={
                 <TouchableOpacity onPress={this.showMenu}>
                    <Image 
                       source={require('../images/menu_icon.png')} 
                       style={{width: 30, height: 30}} 
              
                    />
                 </TouchableOpacity>
            }>
            <MenuItem onPress={this.option1Click}>Home</MenuItem>
            <MenuItem onPress={this.option2Click}>Create Event</MenuItem>
            <MenuItem onPress={this.option3Click}>Create Group</MenuItem>
            <MenuItem onPress={this.option4Click}>Settings</MenuItem>
            
            {/* <MenuItem onPress={this.option3Click} disabled>
             Disabled option
            </MenuItem> */}
            <MenuDivider />
            <MenuItem onPress={this.option5Click}>
            Sign Out
            </MenuItem>
            </Menu>
          </Right>
          </Header>
                <Tabs>
                  <Tab heading={ <TabHeading><Icon name="calendar" /><Text>Event</Text></TabHeading>}>
                   <Tab1 />
                  </Tab>
                  <Tab heading={ <TabHeading><Icon name="contact" /><Text>Contact</Text></TabHeading>}>
                   <Tab2 />
                  </Tab>
                  <Tab heading={ <TabHeading><Icon name="contacts" /><Text>Groups</Text></TabHeading>}>
                   <Tab3 />
                  </Tab>
                 </Tabs>
            </Container>
         );
    }
}
 
export default TabContainer;