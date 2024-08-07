import axios from 'axios'
import Cookies from 'js-cookie'
import { Dispatch, SetStateAction } from 'react'
import { backendApiUrl } from './BackendUrl'

export const fetchUnreadNotifications = async (
	setUnreadNotifications: Dispatch<SetStateAction<number>>
) => {
	try {
		const token = Cookies.get('admin-token')
		const response = await axios.get(
			`${backendApiUrl}admin/notifications/count`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		setUnreadNotifications(response.data)
	} catch (error) {
		console.error('Error fetching unread notifications count:', error)
	}
}
