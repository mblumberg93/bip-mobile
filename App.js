import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './views/WelcomeScreen';
import { CreatorScreen } from './views/CreatorScreen';
import { StartScreen } from './views/StartScreen';
import { YourTurnScreen } from './views/YourTurnScreen';
import { OpponentsTurnScreen } from './views/OpponentsTurnScreen';
import { RerackScreen } from './views/RerackScreen';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {  
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" 
                          component={WelcomeScreen} 
                          options={{ title: 'Welcome To BIP' }} />
            <Stack.Screen name="Creator" 
                          component={CreatorScreen} 
                          options={{ title: 'Game Code' }} />
            <Stack.Screen name="Start"
                          component={StartScreen} 
                          options={{ title: 'Choose Start' }} />
            <Stack.Screen name="Your Turn"
                          component={YourTurnScreen} 
                          options={{ title: 'Your Turn', headerLeft: null }} />
            <Stack.Screen name="Opponents Turn"
                          component={OpponentsTurnScreen} 
                          options={{ title: "Opponent's Turn", headerLeft: null }} />
            <Stack.Screen name="Rerack"
                          component={RerackScreen} 
                          options={{ title: "Choose Rack", headerLeft: null }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;