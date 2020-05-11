import React, { Component } from 'react';
import { 
	Text, 
	View,
	Animated,
	Easing,
	TextInput,
	TouchableOpacity,
	Platform,
	Alert
} from 'react-native';
import { connect } from 'react-redux'
import { primary, white, success, danger } from '../utils/colours'
import { getDeck } from '../actions'
import { fetchDeck } from '../utils/api'
import { styles } from '../utils/styles'
import { loadDeck } from '../utils/dispatches'
import { setLocalNotification, clearLocalNotifications } from '../utils/helpers'

class Quiz extends Component {
	state = {
		showAnswer: false,
		correct: 0,
		index: 0,
		animate: new Animated.Value(0)
	}

	static navigationOptions = ({ route }) => {
		const { title } = route.params.title
		return {
			title: `${title} Quiz`
		}
	}

	componentDidMount() {
		loadDeck(this.props.route.params.title, this.props.dispatch)
	}

	nextQuestion = () => {
		const { questions } = this.props.deck
		if(this.state.index < questions.length - 1) {
			this.setState({ 
				index: this.state.index + 1,
				showAnswer: false
			})
		}
		else {
			clearLocalNotifications()
				.then(setLocalNotification)

			Alert.alert(
				'Score: ' + Math.round((this.state.correct / questions.length) * 100) + '%',
				`You correctly answered ${this.state.correct} our of ${questions.length} questions. Would you like to try again?`,
				[
					{
						text: 'Restart Quiz',
						onPress: () => { this.setState({ correct: 0, index: 0, showAnswer: false }) }
					},
					{
						text: 'Back to Deck',
						onPress: () => { this.props.navigation.goBack() }
					},
				],
				{ cancelable: false }
			)
		}
	}

	showQuizButtons = (questions) => {
		const { correct } = this.state
		return (
			<View>
				<TouchableOpacity
					style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidBtn, { marginBottom: 10, backgroundColor: success}]}
					onPress={() => { 
						this.setState({ correct: correct + 1}, this.nextQuestion)
					}}
				>
					<Text style={styles.submitBtnText}>Correct</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidBtn, { backgroundColor: danger}]}
					onPress={() => { this.nextQuestion() }}	
				>
					<Text style={styles.submitBtnText}>Incorrect</Text>
				</TouchableOpacity>
			</View>
		)
	}

	showAnswer = (questions) => {
		return(
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={styles.headerText}>{questions[this.state.index].answer}</Text>
				<View style={{ padding: 20 }}>
					<TouchableOpacity onPress={() => { this.flipCard() }}>
						<Text style={{color: danger, fontWeight: '600'}}>Show Question</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	showQuestion = (questions) => {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={styles.headerText}>{questions[this.state.index].question}</Text>
				<View style={{ padding: 20 }}>
					<TouchableOpacity onPress={() => this.flipCard()}>
						<Text style={{ color: danger, fontWeight: '600' }}>Show Answer</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	flipCard = () => {
		this.setState({
			showAnswer: !this.state.showAnswer
		})
	}

	render() {
		const { questions } = this.props.deck

		return (
			<View style={styles.container}>
				{ questions.length > 0 ?
					<View>
						<View>
							<Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.correct}/{questions.length}</Text>
						</View>
						<Animated.View style={{ flex: 1 }}>
							{(this.state.showAnswer) ? this.showAnswer(questions) : this.showQuestion(questions)}
						</Animated.View>
						{this.showQuizButtons(questions)}
					</View>
					
					: <View style={styles.container, {flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{ fontSize: 48, textAlign: 'center' }}>No questions entered</Text>
					</View>
				}
			</View>
		)
	}
}

function mapStateToProps (state) {
	return {
		deck: state.deck
	}
}

export default connect(mapStateToProps)(Quiz)