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
import { ExtraIngredient } from '../types/ExtraIngredient.interface'
import { Order } from '../types/Order.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const orderStatuses = [
	'Новый',
	'Оплачен',
	'Принят',
	'Готовится',
	'Приготовлен',
	'В пути',
	'Скрыто',
]

const AdminPaymentOrders = () => {
	const [paymentOrders, setPaymentOrders] = useState<Order[]>([])
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({})
	const [productsData, setProductsData] = useState<{ [key: number]: string }>(
		{}
	)
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
			await fetchProductsData(response.data)
		} catch (error) {
			console.error('Error fetching payment orders:', error)
		}
	}
	useEffect(() => {
		fetchPaymentOrders()
	}, [])

	const formatDate = (dateString: string, comment: string) => {
		if (comment.includes('Доставить по готовности')) {
			return 'По готовности'
		}
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

	const fetchExtraIngredientsByCategory = async (
		selectedShopId: number,
		category: string | null
	) => {
		if (!category) return [] // Если нет категории, возвращаем пустой массив
		try {
			const response = await axios.get<ExtraIngredient[]>(
				`${backendApiUrl}admin/extraIngredients/${selectedShopId}/${category}`
			)
			return response.data
		} catch (error) {
			console.error('Ошибка при получении дополнительных ингредиентов:', error)
			return []
		}
	}

	const fetchProductCategory = async (productId: number) => {
		try {
			const response = await axios.get(
				`${backendApiUrl}admin/getProducts/${productId}`
			)
			return response.data.category // Предполагается, что категория находится в этом поле
		} catch (error) {
			console.error('Ошибка при получении категории продукта:', error)
			return null
		}
	}

	const fetchProductsData = async (orders: Order[]) => {
		const productsData = await Promise.all(
			orders.map(async order => {
				const counts = order.productsCount
					.split(',')
					.map(count => parseInt(count, 10))
				const productsWithExtraIngredients = await Promise.all(
					order.products.map(async (product, index) => {
						const category = await fetchProductCategory(product.id)
						const extraIngredients = await fetchExtraIngredientsByCategory(
							order.shopId,
							category
						)
						const extraIngredientsNames = extraIngredients
							.map(extra => extra.name)
							.join(', ')
						const count = counts[index] !== undefined ? counts[index] : 0
						return `${index + 1}) ${product.name}: ${count} шт${
							extraIngredientsNames
								? ' - Доп.ингредиенты: ' + extraIngredientsNames
								: ''
						}`
					})
				)
				return productsWithExtraIngredients.join('\n')
			})
		)
		const productsMap = orders.reduce((acc, order, index) => {
			acc[order.id] = productsData[index]
			return acc
		}, {} as { [key: number]: string })
		setProductsData(productsMap)
	}
	const getNextStatus = (currentStatus: string) => {
		const currentIndex = orderStatuses.indexOf(currentStatus)
		if (currentIndex < orderStatuses.length - 1) {
			return orderStatuses[currentIndex + 1]
		}
		return currentStatus // Возвращаем текущий статус, если это последний статус
	}
	return (
		<div>
			<AdminMain refreshFunction={fetchPaymentOrders} />
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Номер</TableCell>
							<TableCell>Название магазина</TableCell>
							<TableCell>Имя клиента</TableCell>
							<TableCell>Телефон</TableCell>
							<TableCell>Адрес</TableCell>

							<TableCell>Стоимость</TableCell>
							<TableCell>Тип</TableCell>
							<TableCell>Персон</TableCell>
							<TableCell>Время</TableCell>

							<TableCell className='border-2 border-red-700'>Статус</TableCell>
							<TableCell>Товары</TableCell>
							<TableCell>Действие</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paymentOrders
							.filter(
								order =>
									order.status !== 'Доставлен' && order.status !== 'Скрыто'
							) // Фильтрация заказов
							.map(order => (
								<TableRow key={order.id}>
									<TableCell>{order.id}</TableCell>
									<TableCell>
										{order.shopId === 1
											? 'ГрильМикСер'
											: order.shopId === 2
											? 'Фарш'
											: order.shopId}
									</TableCell>
									<TableCell>{order.clientName}</TableCell>
									<TableCell>{order.phoneNumber}</TableCell>
									<TableCell>{order.deliveryAddress}</TableCell>

									<TableCell>{order.amount}</TableCell>
									<TableCell>{`${order.type} - ${order.paymentType}`}</TableCell>
									<TableCell>{order.personCount}</TableCell>
									<TableCell>
										{formatDate(order.createdTime, order.deliveryAddress)}{' '}
										{/* Передаем комментарий */}
									</TableCell>
									<TableCell className='border-2 border-red-700'>
										{order.status}
									</TableCell>
									<TableCell>
										<pre className='whitespace-normal break-words'>
											{productsData[order.id] || 'Пусто'}
										</pre>
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
											{getNextStatus(order.status)}{' '}
											{/* Отображаем следующий статус */}
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
