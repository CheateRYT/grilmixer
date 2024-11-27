// @ts-nocheck
import {
	Button,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { ExtraIngredient } from '../types/ExtraIngredient.interface'
import { Order } from '../types/Order.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminOrders: React.FC = () => {
	const orderStatuses = [
		'Новый',
		'Оплачен',
		'Принят',
		'Готовится',
		'Приготовлен',
		'В пути',
		'Доставлен',
	]
	const [orders, setOrders] = useState<Order[]>([])
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [updatedOrderData, setUpdatedOrderData] = useState<Partial<Order>>({})
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [totalOrders, setTotalOrders] = useState(0)
	const [productsData, setProductsData] = useState<{ [key: number]: string }>(
		{}
	)

	const fetchOrders = async () => {
		try {
			const token = Cookies.get('admin-token')
			const response = await axios.get<{
				orders: Order[]
				totalOrders: number
			}>(`${backendApiUrl}admin/getOrders/${page + 1}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setOrders(response.data.orders)
			console.log(response.data.orders)
			setTotalOrders(response.data.totalOrders)
			await fetchProductsData(response.data.orders)
		} catch (error) {
			console.error('Error fetching orders:', error)
		}
	}

	const getNextStatus = (currentStatus: string) => {
		const currentIndex = orderStatuses.indexOf(currentStatus)
		if (currentIndex < orderStatuses.length - 1) {
			return orderStatuses[currentIndex + 1]
		}
		return currentStatus // Если это последний статус, возвращаем текущий
	}

	const fetchProductsData = async (orders: Order[]) => {
		const productsData = await Promise.all(
			orders.map(async order => {
				const counts = order.productsCount
					.split(',')
					.map(count => parseInt(count, 10))
				const productsWithExtraIngredients = await Promise.all(
					order.products.map(async (product, index) => {
						const extraIngredientsNames = await fetchExtraIngredientsNames(
							order.extraIngredientsOrder,
							product.id
						)
						return `${index + 1}) ${product.name}: ${counts[index]} шт${
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

	const fetchExtraIngredientsNames = async (
		extraIngredientsOrder: [],
		productId: number
	) => {
		const extraIngredientsIds = extraIngredientsOrder
			.filter(orderItem => orderItem.productId === productId)
			.flatMap(orderItem =>
				orderItem.extraIngredients.split(',').map(id => parseInt(id, 10))
			)

		const extraIngredientsNames = await Promise.all(
			extraIngredientsIds.map(id => fetchExtraIngredient(id))
		)
		return extraIngredientsNames.filter(name => name).join(', ')
	}

	const handleNextStatus = async (orderId: number) => {
		const order = orders.find(o => o.id === orderId)
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

	useEffect(() => {
		fetchOrders()
	}, [page])

	const handleEditOrder = (order: Order) => {
		setSelectedOrder(order)
		setShowModal(true)
	}

	const handleCancelUpdate = () => {
		setShowModal(false)
		setUpdatedOrderData({})
	}

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

	const handleChangePage = (newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const fetchExtraIngredient = async (id: number) => {
		if (!id) return '' // Если нет категории, возвращаем текст
		try {
			const response = await axios.get<ExtraIngredient>(
				`${backendApiUrl}admin/extraIngredient/${id}`
			)

			return response.data.name // Возвращаем имя дополнительного ингредиента
		} catch (error) {
			console.error('Ошибка при получении дополнительного ингридиента:', error)
			return ''
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

	return (
		<div>
			<AdminMain />
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
						{orders.map(order => (
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
				<TablePagination
					rowsPerPageOptions={[10]}
					component='div'
					count={totalOrders}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
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
										updatedOrderData.clientName || selectedOrder.clientName
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
									value={updatedOrderData.amount || selectedOrder.amount}
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

export default AdminOrders
