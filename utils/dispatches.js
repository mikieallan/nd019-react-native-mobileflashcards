import React from 'react'
import { getDecks, getDeck } from '../actions'
import { fetchAllDecks, fetchDeck } from './api'

export function loadDecks(dispatch){
	fetchAllDecks()
		.then((decks) => {
			dispatch(getDecks(decks))
		})
}

export function loadDeck (title, dispatch) {
	fetchDeck(title)
		.then((deck) => {
			dispatch(getDeck(deck))
		})
}