import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminEvents = () => {
	interface Event {
		id: number
		shopId: number
		text: string
		imagePath: string
	}

	const [events, setEvents] = useState<Event[]>([])
	const [showModal, setShowModal] = useState(false)
	const [newEventData, setNewEventData] = useState({
		shopId: 1,
		text: '',
		imagePath: '',
	})
	const [selectedShopId, setSelectedShopId] = useState<number>(1)

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(
					`${backendApiUrl}events/${selectedShopId}`
				)
				setEvents(response.data)
			} catch (error) {
				console.error('Error fetching events:', error)
			}
		}
		fetchEvents()
	}, [selectedShopId])

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleShopIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedShopId(parseInt(e.target.value))
	}
	const handleDeleteEvent = async (eventId: number) => {
		try {
			const token = Cookies.get('admin-token')
			await axios.delete(`${backendApiUrl}admin/event/${eventId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId))
		} catch (error) {
			console.error('Error deleting event:', error)
		}
	}
	const handleCreateEvent = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.post(`${backendApiUrl}admin/event`, newEventData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			setShowModal(false)
			window.location.reload()
		} catch (error) {
			console.error('Ошибка при создании акции:', error)
		}
	}
	return (
		<div className='bg-slate-700'>
			<AdminMain />
			<div>
				<h2 className='text-xl font-bold mb-2 text-white'>Акции:</h2>
				<button
					onClick={handleOpenModal}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2'
				>
					Создать акцию
				</button>
				<p className='text-white'>Выбрать магазин</p>
				<select
					value={selectedShopId}
					onChange={handleShopIdChange}
					className='mb-4 px-4 py-2 rounded border'
				>
					<option value={1}>Гриль МикСер номер 1</option>
					<option value={2}>Фарш номер 2</option>
				</select>
				<table className='min-w-full divide-y divide-gray-200 bg-black text-white'>
					<thead className='bg-gray-800'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер Магазина
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Текст
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Путь к картинке
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Действие
							</th>
						</tr>
					</thead>
					<tbody className='bg-gray-900 divide-y divide-gray-200'>
						{events.map(event => (
							<tr key={event.id}>
								<td className='px-6 py-4 whitespace-nowrap'>{event.shopId}</td>
								<td className='px-6 py-4 whitespace-nowrap'>{event.text}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{event.imagePath}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => handleDeleteEvent(event.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									>
										Удалить
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{showModal && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
						<div className='bg-gray-800 p-4 rounded shadow-lg text-white'>
							<h3 className='text-lg font-bold mb-2'>Создать Акцию</h3>
							<select
								className=' bg-slate-700'
								name='shopId'
								onChange={e =>
									setNewEventData({
										...newEventData,
										shopId: Number(e.target.value),
									})
								}
							>
								<option value='1'>Гриль-МикСер 1</option>
								<option value='2'>Фарш 2</option>
							</select>
							<input
								type='text'
								name='text'
								value={newEventData.text}
								onChange={e =>
									setNewEventData({
										...newEventData,
										text: e.target.value,
									})
								}
								placeholder='Текст'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
							/>
							<input
								type='text'
								name='imagePath'
								value={newEventData.imagePath}
								onChange={e =>
									setNewEventData({
										...newEventData,
										imagePath: e.target.value,
									})
								}
								placeholder='Путь к картинке'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
							/>
							<button
								onClick={handleCreateEvent}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
							>
								Создать
							</button>
							<button
								onClick={handleCloseModal}
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2'
							>
								Отмена
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminEvents
