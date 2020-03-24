  import React, { Component } from 'react';
  import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, Left, Button, Body, Right, Title } from 'native-base';
  import ViewEvent from './EventTabs/ViewEvent';
  import Attendance from './EventTabs/Attendance';
  import { Image, TouchableOpacity  } from 'react-native';
  
  
  class EventView extends Component {
    
    option1Click = () => {
      this.props.navigation.navigate('tabContainer')
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
            <Left>
            <Button transparent onPress={() => this.option1Click()}>
              <Icon active name="arrow-back" />
            </Button>
            </Left>
            <Body >
                <Title color='white' >Event Details</Title>
            </Body>
            
            <Right>
              
            </Right>
            </Header>
                  <Tabs>
                    <Tab heading={ <TabHeading><Icon name="calendar" /><Text>View Event</Text></TabHeading>}>
                     <ViewEvent />
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="contact" /><Text>Attendance</Text></TabHeading>}>
                     <Attendance />
                    </Tab>
                   </Tabs>
              </Container>
           );
      }
  }
   
  export default EventView;