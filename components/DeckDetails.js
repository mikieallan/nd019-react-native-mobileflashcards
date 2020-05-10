import React, { Component } from 'react';
import { 
	Platform,
	Text, 
	View,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import { getDeck } from '../actions'
import { primary } from '../utils/colours'
import { styles } from '../utils/styles'
import { fetchDeck } from '../utils/api'
import { connect } from 'react-redux'

class DeckDetails extends Component {

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title: title
		}
	}

	state = {
		loading: false
	}

	componentDidMount() {
		this.loadDeck()
	}

	loadDeck = () => {
		this.setState({ loading: true })
		const { dispatch } = this.props
		fetchDeck(this.props.route.params.title)
			.then((deck) => {
				dispatch(getDeck(deck))
				this.setState({ loading: false })
			})
	}

	deckView = (deck) => {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, alignItems: 'center'}}>
					<Text style={styles.headerText}>{deck.title}</Text>
					<Text style={styles.mutedText}>{deck.questions.length} cards</Text>
				</View>
				<View style={{ flex: 2, justifyContent: 'flex-start' }}>
					<TouchableOpacity
						style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidBtn, {marginBottom: 10}]}
						onPress={() => {
							this.props.navigation.navigate('AddCard', { title: deck.title, refresh: this.loadDeck })
						}} >
						<Text style={styles.submitBtnText}>Add Card</Text>
					</TouchableOpacity>
					{deck.questions.length > 0 && 
						<TouchableOpacity 
							style={(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidBtn }
							disabled={deck.questions.length===0}
							onPress={() => {
								this.props.navigation.navigate('Quiz', { title: deck.title })
							}}
						>
							<Text style={styles.submitBtnText}>Start Quiz</Text> 
						</TouchableOpacity>
					}
				</View>
			</View>
		)
	}

	render() {
		const { deck } = this.props
		return (
			<View style={styles.container}>
				<ActivityIndicator animating = {this.state.loading} color={primary} />
				{this.deckView(deck)}
			</View>
		)
	}
}



function mapStateToProps (state) {
	return {
		deck: state.deck
	}
}

export default connect(mapStateToProps)(DeckDetails)