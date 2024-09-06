import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

interface Notification {
	id: number
	shopId: number
	orderId: number
	createdAt: string
}

const AdminNotifications: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([])

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const token = Cookies.get('admin-token')
				const response = await axios.get<Notification[]>(
					`${backendApiUrl}admin/notifications`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setNotifications(response.data)
			} catch (error) {
				console.error('Error fetching notifications:', error)
			}
		}
		fetchNotifications()
	}, [])

	const handleReadNotification = async (id: number) => {
		try {
			const token = Cookies.get('admin-token')
			await axios.delete(`${backendApiUrl}admin/notifications/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setNotifications(prevNotifications =>
				prevNotifications.filter(notification => notification.id !== id)
			)
		} catch (error) {
			console.error('Error deleting notification:', error)
		}
	}

	return (
		<div className='p-4  bg-slate-700'>
			<AdminMain />
			<div>
				<h2 className='text-xl font-bold mb-2 text-white'>Уведомления:</h2>
				<table className='min-w-full divide-y divide-gray-200 bg-black text-white'>
					<thead className='bg-gray-800'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер Магазина
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер Заказа
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Дата создания
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Действие
							</th>
						</tr>
					</thead>
					<tbody className='bg-gray-900 divide-y divide-gray-200'>
						{notifications.map(notification => (
							<tr key={notification.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{notification.shopId}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{notification.orderId}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{new Date(notification.createdAt).toLocaleString()}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => handleReadNotification(notification.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									>
										Прочитать
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminNotifications
