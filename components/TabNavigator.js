import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { primary, secondary, white } from '../utils/colours'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import Decks from './Decks'
import AddDeck from './AddDeck'

const Tab = createBottomTabNavigator()

export default class TabNavigator extends Component {
	render() {
		return (
			
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
                component={Decks} 
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
	          
		)
	}
}