import axios from 'axios'
import { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners' // Импортируем компонент загрузки
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './Thanks.module.css' // Импортируем CSS модули

const Thanks = ({ orderId }) => {
	const [orderData, setOrderData] = useState(null)
	const [isLoading, setIsLoading] = useState(false) // Состояние для отслеживания загрузки

	const fetchData = async () => {
		setIsLoading(true) // Устанавливаем состояние загрузки в true
		try {
			// Получаем IP-адрес
			const ipResponse = await axios.get('https://api.ipify.org?format=json')
			const ip = ipResponse.data.ip
			// Делаем запрос к вашему API с использованием полученного IP
			const response = await axios.get(
				`${backendApiUrl}admin/getOrderThanks/${orderId}`,
				{
					headers: {
						Authorization: `Bearer ${ip}`,
					},
				}
			)
			setOrderData(response.data)
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
		} finally {
			setIsLoading(false) // Устанавливаем состояние загрузки в false после завершения
		}
	}

	useEffect(() => {
		// Вызов функции для получения данных
		fetchData()
	}, [orderId]) // Добавляем orderId в зависимости
	useEffect(() => {
		// Вызов функции для получения данных
		fetchData()

		// Устанавливаем интервал для автообновления каждые 20 секунд
		const intervalId = setInterval(fetchData, 20000)

		// Очистка интервала при размонтировании компонента
		return () => clearInterval(intervalId)
	}, [orderId]) // Добавляем orderId в зависимости
	return (
		<div className={styles.thanksContainer}>
			{isLoading ? ( // Проверяем состояние загрузки
				<div className='ringloader'>
					<RingLoader color='#FF0000' loading={isLoading} size={150} />
				</div>
			) : (
				orderData && (
					<div>
						<h1 className={styles.thanksTitle}>Спасибо за ваш заказ!</h1>
						<div className={styles.orderDetails}>
							<h2 className={styles.orderSubtitle}>Детали заказа</h2>
							<p className={styles.orderP}>
								<strong>Номер заказа:</strong> {orderData.id}
							</p>
							<p className={styles.orderP}>
								<strong>Номер магазина:</strong> {orderData.shopId}
							</p>
							<p className={styles.orderP}>
								<strong>Стоимость:</strong> {orderData.amount}
							</p>
							<p className={styles.orderP}>
								<strong>Статус:</strong> {orderData.status}
							</p>
							<p className={styles.orderP}>
								<strong>Способ доставки:</strong>{' '}
								{orderData.type === 'Доставка' ? 'Курьером' : orderData.type}
							</p>
							<p className={styles.orderP}>
								<strong>Примерное время доставки:</strong>{' '}
								{orderData.deliveryAddress.includes('Доставить по готовности')
									? 'Как можно скорее'
									: new Date(orderData.createdTime).toLocaleString()}
							</p>
							<p className={styles.orderP}>
								<strong>Способ оплаты:</strong>{' '}
								{orderData.paymentType || 'Безналичная'}
							</p>
						</div>
					</div>
				)
			)}
		</div>
	)
}

export default Thanks
