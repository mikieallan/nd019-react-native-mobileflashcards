import React, { Component } from 'react';
import { 
	Text, 
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	Alert,
	KeyboardAvoidingView,
	Keyboard,
	YellowBox
} from 'react-native';
import { primary, white, danger } from '../utils/colours'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { styles } from '../utils/styles'
import { loadDecks } from '../utils/dispatches'
import { connect } from 'react-redux'

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

class AddDeck extends Component {
	state = {
		title: '',
		valid: true
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container, {flex: 1, justifyContent: 'center'}} behavior="padding">
				<View style={[styles.center]}>
					<Text style={[styles.labelText, (!this.state.valid) ? styles.errorText: '']}>
						What is the name of your new deck?
					</Text>
				</View>
				<View>
					<TextInput
						ref="title"
						style={[styles.input, (!this.state.valid) ? styles.errorInput : '']}
						value={this.state.title}
						onChangeText={(title) => this.setState({title})}
						placeholderTextColor={(!this.state.valid) ? danger : '#333'}
						placeholder="Enter a deck title"
					/>
				</View>
				<View>
					<TouchableOpacity 
						style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {marginTop: 10}]}
						onPress={this.newDeck}
					>
						<Text style={styles.submitBtnText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>		
		);
	} 
	newDeck = () => {
		const { dispatch } = this.props
		if (this.state.title) {
			saveDeckTitle(this.state.title)
			this.refs['title'].setNativeProps({text: ''})
			this.props.navigation.navigate('DeckDetails', { title: this.state.title})
			this.setState({valid: true, title: ''})
			loadDecks(this.props.dispatch)
		}
		else {
			this.setState({ valid: false })
		}
	}
}

function mapStateToProps (state) {
	return { 
		decks: state.decks
	}
}

export default connect(mapStateToProps)(AddDeck)