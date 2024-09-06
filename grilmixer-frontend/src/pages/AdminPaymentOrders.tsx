import {
	Button,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Order } from '../types/Order.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const orderStatuses = [
	'Новый',
	'Оплачен',
	'Принят',
	'Готовится',
	'Приготовлен',
	'В доставке',
	'Доставлен',
]

const AdminPaymentOrders = () => {
	const [paymentOrders, setPaymentOrders] = useState<Order[]>([])
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({})

	useEffect(() => {
		const fetchPaymentOrders = async () => {
			try {
				const token = Cookies.get('admin-token')
				const response = await axios.get(
					`${backendApiUrl}admin/getPaymentOrders/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setPaymentOrders(response.data)
			} catch (error) {
				console.error('Error fetching payment orders:', error)
			}
		}
		fetchPaymentOrders()
	}, [])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')
		return `${day}.${month}.${year} ${hours}:${minutes}`
	}

	const handleEditOrder = (order: Order) => {
		setSelectedOrder(order)
		setShowModal(true)
	}

	const handleCancelUpdate = () => {
		setShowModal(false)
		setUpdatedOrderData({})
	}

	const handleUpdateOrder = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.put(
				`${backendApiUrl}admin/updateOrder/${selectedOrder?.id}`,
				updatedOrderData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setShowModal(false)
			window.location.reload()
		} catch (error) {
			console.error('Error updating order:', error)
		}
	}

	const handleModalInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		if (name === 'isStopList' || name === 'isAvailable') {
			setUpdatedOrderData(prevData => ({
				...prevData,
				[name]: value === 'true',
			}))
		} else {
			setUpdatedOrderData(prevData => ({ ...prevData, [name]: value }))
		}
	}

	const handleNextStatus = async (orderId: number) => {
		const order = paymentOrders.find(o => o.id === orderId)
		if (order) {
			const currentIndex = orderStatuses.indexOf(order.status)
			if (currentIndex < orderStatuses.length - 1) {
				const nextStatus = orderStatuses[currentIndex + 1]
				try {
					const token = Cookies.get('admin-token')
					await axios.put(
						`${backendApiUrl}admin/updateOrder/${orderId}`,
						{ status: nextStatus },
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					window.location.reload() // Обновляем страницу после изменения статуса
				} catch (error) {
					console.error('Error updating order status:', error)
				}
			}
		}
	}

	return (
		<div>
			<AdminMain />
			<h2>Оплаченные заказы</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Номер</TableCell>
							<TableCell>Номер магазина</TableCell>
							<TableCell>Стоимость</TableCell>
							<TableCell>Сдача с</TableCell>
							<TableCell>Тип</TableCell>
							<TableCell>Персон</TableCell>
							<TableCell>Телефон</TableCell>
							<TableCell>Адрес</TableCell>
							<TableCell>Почта</TableCell>
							<TableCell>Имя клиента</TableCell>
							<TableCell>Время</TableCell>
							<TableCell>Время окончания</TableCell>
							<TableCell>Статус</TableCell>
							<TableCell>Номера продуктов</TableCell>
							<TableCell>Названия продуктов</TableCell>
							<TableCell>Количество продуктов</TableCell>
							<TableCell>Доп.Ингредиенты</TableCell>
							<TableCell>Действие</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paymentOrders
							.filter(order => order.status !== 'Доставлен') // Фильтрация заказов
							.map(order => (
								<TableRow key={order.id}>
									<TableCell>{order.id}</TableCell>
									<TableCell>{order.shopId}</TableCell>
									<TableCell>{order.amount}</TableCell>
									<TableCell>{order.changeFrom}</TableCell>
									<TableCell>{`${order.type} - ${order.paymentType}`}</TableCell>
									<TableCell>{order.personCount}</TableCell>
									<TableCell>{order.phoneNumber}</TableCell>
									<TableCell>{order.deliveryAddress}</TableCell>
									<TableCell>{order.email}</TableCell>
									<TableCell>{order.clientName}</TableCell>
									<TableCell>{formatDate(order.createdTime)}</TableCell>
									<TableCell>
										{order.completedTime
											? formatDate(order.completedTime)
											: 'Не завершен'}
									</TableCell>
									<TableCell>{order.status}</TableCell>
									<TableCell>
										{order.products.map(product => product.id).join(',')}
									</TableCell>
									<TableCell>
										{order.products.map(product => product.name).join(',')}
									</TableCell>
									<TableCell>{order.productsCount}</TableCell>
									<TableCell>
										{order.extraIngredientsOrder &&
											order.extraIngredientsOrder
												.map(
													extra =>
														`Товар  -  ${extra.productId}: ${extra.productCount} шт., ингредиенты: ${extra.extraIngredients}`
												)
												.join('; ')}
									</TableCell>
									<TableCell>
										<Button
											variant='contained'
											color='primary'
											onClick={() => handleEditOrder(order)}
										>
											Редактировать
										</Button>
										<Button
											variant='contained'
											color='secondary'
											onClick={() => handleNextStatus(order.id)}
											className='ml-2'
										>
											След. статус
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			{showModal && selectedOrder && (
				<Modal open={showModal} onClose={handleCancelUpdate}>
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
						<div className='bg-gray-800 p-4 rounded shadow-lg text-white'>
							<h3 className='text-lg font-bold mb-2'>Редактировать заказ</h3>
							<label>
								Имя клиента:
								<input
									type='text'
									name='clientName'
									value={
										updatedOrderData.clientName !== undefined
											? updatedOrderData.clientName
											: selectedOrder.clientName
									}
									onChange={handleModalInputChange}
									className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
								/>
							</label>
							<label>
								Стоимость:
								<input
									type='text'
									name='amount'
									value={
										updatedOrderData.amount !== undefined
											? updatedOrderData.amount
											: selectedOrder.amount
									}
									onChange={handleModalInputChange}
									className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
								/>
							</label>
							<label>
								Статус:
								<select
									name='status'
									value={
										updatedOrderData.status !== undefined
											? updatedOrderData.status
											: selectedOrder.status
									}
									onChange={handleModalInputChange}
									className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
								>
									{orderStatuses.map(status => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</label>
							<Button
								variant='contained'
								color='error'
								onClick={handleCancelUpdate}
								className='mt-2 mr-2'
							>
								Отмена
							</Button>
							<Button
								variant='contained'
								color='primary'
								onClick={handleUpdateOrder}
								className='mt-2'
							>
								Сохранить изменения
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default AdminPaymentOrders
