import React, { Component } from 'react';   
//import { Text, View } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';


class Tab1 extends Component {
    state = {  }
    render() { 
        return ( 
            <Container>
        
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>My Events</Text>
            </Button>
            <Button vertical>
              <Icon name="paper" />
              <Text>Join Events</Text>
            </Button>
            <Button vertical>
              <Icon name="add" />
              <Text>Create Event</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
         );
    }
}
 
export default Tab1;