export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'

export function getDecks(decks) {
	return {
		type: GET_DECKS,
		decks
	}
}

export function getDeck(deck) {
	return {
		type: GET_DECK,
		deck
	}
}