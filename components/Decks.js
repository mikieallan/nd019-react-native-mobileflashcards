import React, { Component } from 'react';
import { 
	Text, 
	View,
	TouchableOpacity,
	Animated,
	Easing,
	Platform,
	FlatList,
	Alert
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import { getDecks } from '../actions'
import { primary, white, action } from '../utils/colours'
import { styles } from '../utils/styles'
import { fetchAllDecks } from '../utils/api'
import { loadDecks } from '../utils/dispatches'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { NavigationEvents } from 'react-navigation'

class Decks extends Component {
	state = {
		refreshing: false,
		filter: '',
		search: '',
		decksToShow: this.props.decks,
		initialized: false
	}

	componentDidMount() {
		loadDecks(this.props.dispatch)
	}

	_renderItem = ({item}) => {
		let size = new Animated.Value(0)
		const textSize = size.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [20, 25, 20]
		})

		return (
			<TouchableOpacity 
				onPress={() => {
					
					Animated.timing(
						size,
						{
							toValue: 1,
							duration: 250,
							easing: Easing.linear,
						})
						.start(() => {
							this.props.navigation.navigate('DeckDetails', { title: item.title })
							size.setValue(0)
						})
				}}
			underlayColor={primary}
			>
				<View style={styles.listItem}>
					<View style={{ flex: 2, marginLeft: 10, alignItems: 'flex-start'}}>
						<Animated.Text style={[styles.headerText, { fontSize: textSize }]}>
							{item.title}
						</Animated.Text>
						<Text style={styles.mutedText}>
							{item.questions.length} cards
						</Text>
					</View>
					<View style={{ flex: 2, alignItems: 'flex-end', marginRight: 10 }}>
						<Ionicons name="ios-arrow-forward" color={primary} size={30} />
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	_renderSeparator = () => {
		return (
			<View
				style={{
					flex: 1,
					height: 1,
					backgroundColor: primary
				}}
			/>
		)
	}

	_keyExtractor = (item, index) => {
		return index.toString()
	}

	_renderHeader = () => {
		return (
			<SearchBar
				placeholder = { "Type a deck name here..." }
				onChangeText = {(e) => this.searchText(this.props.decks, e)}
				value = {this.state.search}
				lightTheme = {true}
				containerStyle = {{ backgroundColor: primary, borderColor: primary }}
				inputContainerStyle = {{ backgroundColor: white }}
			/>
			
		)
	}

	searchText = (data, input) => {
		this.setState({ search: input })
		var lowerInput = input.toLowerCase()
		const result = data.filter((deck) => deck.title.toLowerCase().indexOf(lowerInput) > -1)
		console.log(result)
		this.setState({ decksToShow: result, initialized: true })
	}

	handleRefresh = () => {
		this.setState({
			refreshing: true
		},
		() => {
			loadDecks(this.props.dispatch)
			this.setState({ 
				refreshing: false,
				initialized: false
			})
		})
	}

	render() {
		const { decks } = this.props
		var { decksToShow } = this.state
		const noData = {

		}

		if ((decksToShow.length === 0 || decksToShow === undefined) && !this.state.initialized ) {
			decksToShow = decks
		}

		return ( 
			<View style={{ flex: 1, backgroundColor: white }}>
				
				{
					((decks !== null || decks !== undefined) && decks.length > 0)
					?  <FlatList
							data={decksToShow}
							renderItem={this._renderItem}
							ItemSeparatorComponent={this._renderSeparator}
							keyExtractor={this._keyExtractor}
							extraData={this.props}
							ListHeaderComponent={this._renderHeader}
							refreshing={this.state.refreshing}
							onRefresh={this.handleRefresh}
							ListEmptyComponent={
								<View style={{alignItems: 'center', marginTop: 30}}>
									<FontAwesome name='exclamation' size={50} color={primary}/>
									<Text style={styles.headerText}>No results found. </Text>
									<Text>Please search something else.</Text>
								</View>
							}
						/> 
						
					: <View style={{ flex: 1, padding: 10, alignItems: 'center'}}>
						<Text style={styles.headerText}>No Decks Found</Text>
						<Text style={styles.mutedText}>Please select the "Add Deck" tab to continue.</Text>
					</View>
				}
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		decks: state.decks
	}
}

export default connect(mapStateToProps)(Decks)