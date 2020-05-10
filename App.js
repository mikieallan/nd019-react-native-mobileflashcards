import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { decks } from './reducers'
import { primary, secondary, white } from './utils/colours'
import Constants from 'expo-constants'

// Component
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'
import Decks from './components/Decks'
import Quiz from './components/Quiz'
import Success from './components/Success'

// Utils
import { clearLocalNotifications, setLocalNotification } from './utils/helpers'

const Stack = createStackNavigator()

function DeckScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={Decks} />
      <Stack.Screen name="DeckDetails" component={DeckDetails} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

export default class App extends Component {
  componentDidMount() {
    clearLocalNotifications()
      .then(setLocalNotification())
  }

  render() {
    const tintColor = Platform.OS === 'ios' ? primary : white
    const activeTintColor = Platform.OS === 'ios' ? white : primary  
    
    return (
      <Provider store={createStore(decks)}>
        
        <View style={{flex: 1, paddingBottom: 30}}>
          <NavigationContainer>
            <Tab.Navigator tabBarOptions={{
              style: {
                height: 56,
                backgroundColor: white,
                shadowOffset: {
                width: 0,
                height: 3
                },
                shawdowRadius: 6,
                shadowOpacity: 1
              }
            }}>
              <Tab.Screen 
                name="Decks" 
                component={DeckScreen} 
                options={{
                  tabBarIcon: ({tintcolor, size }) => (
                    <Ionicons name='ios-bookmarks' color={tintcolor} size={30}/>
                  ),
                  tabBarLabel: 'Decks',
                }}
              />
              <Tab.Screen 
                name="Add Deck" 
                component={AddDeck} 
                options={{
                  tabBarIcon: ({tintcolor, size }) => (
                    <FontAwesome name='plus-square' color={tintcolor} size={30}/>
                  ),
                  tabBarLabel: 'Add Deck',

                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}
