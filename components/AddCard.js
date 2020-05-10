import React, { Component } from 'react';
import { 
	Text, 
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	Alert
} from 'react-native';
import { primary, white, danger } from '../utils/colours'
import { addDeck } from '../actions'
import { addCardToDeck } from '../utils/api'
import { styles } from '../utils/styles'
import { connect } from 'react-redux'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
		valid: true
	}

	static navigationOptions = ({ navigation }) => {
		return { 
			title: 'Add a new card'
		}
	}

	addCard = () => {
		if(this.state.question && this.state.answer) {
			addCardToDeck(this.props.route.params.title, this.state)
			this.props.navigation.navigate('Success', { title: 'Success' })
		}
		else this.setState({ valid: false })
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ marginBottom: 10 }}>
					<TextInput
						style={[styles.input, (!this.state.valid) ? styles.errorInput : '']}
						ref="question"
						onChangeText={(question) => this.setState({question})}
						placeholderTextColor={(!this.state.valid) ? danger : '#ddd'}
						placeholder="Enter a question"
					/>
				</View>
				<View style={{ marginBottom: 10 }}>
					<TextInput
						style={[styles.input, (!this.state.valid) ? styles.errorInput : '']}
						ref="answer"
						onChangeText={(answer) => this.setState({answer})}
						placeholderTextColor={(!this.state.valid) ? danger : '#ddd'}
						placeholder="Enter the answer"
					/>
				</View>
				<View style={{ marginTop: 10 }}>
					<TouchableOpacity
						style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
						onPress={this.addCard}
					>
						<Text style={styles.submitBtnText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default AddCard