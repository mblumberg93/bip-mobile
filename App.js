import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { PUBNUB_PUBLISH_KEY, PUBNUB_SUBSCRIBE_KEY } from './secrets';
import { WelcomeScreen } from './views/WelcomeScreen';
import { CreatorScreen } from './views/CreatorScreen';

const Stack = createStackNavigator();
const pubnub = new PubNub({
  subscribeKey: PUBNUB_SUBSCRIBE_KEY,
  publishKey: PUBNUB_PUBLISH_KEY
});

class App extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      //TODO
    };
  }
  
  render() {
    return (
      <NavigationContainer>
        <PubNubProvider client={pubnub}>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" 
                          component={WelcomeScreen} 
                          options={{ title: 'Welcome To BIP' }} />
            <Stack.Screen name="Creator" 
                          component={CreatorScreen} 
                          options={{ title: 'Game Code' }} />
          </Stack.Navigator>
        </PubNubProvider>
      </NavigationContainer>
    );
  }
}

export default App;