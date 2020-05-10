import { GET_DECK, GET_DECKS } from '../actions'

const initState = {
	decks: [],
	deck: {
		title: '',
		questions: []
	}
}

export function decks (state = initState, action ) {
	switch (action.type) {
		case GET_DECKS:
			if (action.decks !== null && action.decks !== undefined) 
				return {
					...state,
					decks: Object.keys(action.decks).map(function(n) {return action.decks[n]})
				}
			return state

		case GET_DECK:
			return {
				...state,
				deck: action.deck
			}
		default:
			return state
	}
}