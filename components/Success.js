import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { success, primary, white } from '../utils/colours'
import { styles } from '../utils/styles'

class Success extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<FontAwesome name='check' size={100} color={success}/>
					<Text style={styles.headerText}>You've successfully added a new card!</Text>
				</View>


				<View>
					<TouchableOpacity
						style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidBtn, { borderWidth: 1, borderColor: primary, backgroundColor: primary, marginBottom: 10}]}
						onPress={() => { 
							this.props.navigation.navigate('Decks', { title: 'Decks' })
						}}
					>
						<Text style={{color: white, fontSize: 20, textAlign: 'center'}}>Go Home</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidBtn, { borderWidth: 1, borderColor: primary, backgroundColor: white, marginBottom: 10}]}
						onPress={() => { 
							console.log(this.props)
							this.props.navigation.goBack()
						}}	
					>
						<Text style={{color: primary, fontSize: 20, textAlign: 'center'}}>Add another card</Text>
					</TouchableOpacity>
				</View>

			</View>
		)
	}
}

export default Success