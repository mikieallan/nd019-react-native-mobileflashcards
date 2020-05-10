import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

export const DECK_STORAGE_KEY = 'MobileFlashCards:decks'
const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function clearLocalNotifications() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
	return {
		title: "Take a quiz!",
		body: "Don/'t forget to complete a quiz today!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

async function getPermissions(){
	const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
	return status
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if( data === null ) {
				const status = getPermissions()
					.then((status) => {
						console.log(status)
						if(status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()
							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(14)
							tomorrow.setMinutes(0)
							console.log(tomorrow)
							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)
							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
		.catch((err) => {
			console.log(err)
		})
}