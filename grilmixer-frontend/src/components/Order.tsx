import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { clearCart, RootState } from '../store/store'
import { backendApiUrl } from '../utils/BackendUrl'
import Cart from './Cart'
import styles from './Order.module.css'

const Order = ({
	shopId,
	shopTag,
	shopName,
}: {
	shopId: string
	shopTag: string
	shopName: string
}) => {
	const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [house, setHouse] = useState('')
	const [building, setBuilding] = useState('')
	const [entrance, setEntrance] = useState('')
	const [room, setRoom] = useState('')
	const [comment, setComment] = useState('')
	const [personCount, setPersonCount] = useState<number>(1)
	const [email, setEmail] = useState('')
	const [deliveryMethod, setDeliveryMethod] = useState('Доставка')
	const [paymentMethod, setPaymentMethod] = useState('')
	const [selectedTime, setSelectedTime] = useState('')
	const [changeNeeded, setChangeNeeded] = useState(false)
	const [changeAmount, setChangeAmount] = useState('')
	const [ipAddress, setIpAddress] = useState('')
	const cartItems = useSelector((state: RootState) => state.cart.items[shopId])
	const [isLoading, setIsLoading] = useState(false) // Состояние загрузки
	const navigate = useNavigate()

	const [fastDelivery, setFastDelivery] = useState<string>('')

	const dispatch = useDispatch()

	useEffect(() => {
		// Получение IP-адреса
		const fetchIpAddress = async () => {
			try {
				const response = await axios.get('https://api.ipify.org?format=json')
				setIpAddress(response.data.ip)
			} catch (error) {
				console.error('Error fetching IP address:', error)
			}
		}
		fetchIpAddress()
	}, [])

	const generateTimeOptions = () => {
		const options = []
		const now = new Date()

		// Функция для округления времени
		const roundToNearestHalfHour = date => {
			const minutes = date.getMinutes()
			const roundedMinutes = Math.round(minutes / 30) * 30
			date.setMinutes(roundedMinutes)
			date.setSeconds(0)
			date.setMilliseconds(0)
			return date
		}

		// Генерация времени на сегодня
		for (let i = 0; i < 48; i++) {
			const date = new Date(now)
			date.setMinutes(now.getMinutes() + i * 30)
			const roundedDate = roundToNearestHalfHour(date)
			const day = String(roundedDate.getDate()).padStart(2, '0')
			const month = String(roundedDate.getMonth() + 1).padStart(2, '0')
			const hours = String(roundedDate.getHours()).padStart(2, '0')
			const minutes = String(roundedDate.getMinutes()).padStart(2, '0')
			options.push(`${day}.${month} - ${hours}:${minutes}`)
		}

		// Генерация времени на завтра
		now.setDate(now.getDate() + 1)
		for (let i = 0; i < 48; i++) {
			const date = new Date(now)
			date.setMinutes(now.getMinutes() + i * 30)
			const roundedDate = roundToNearestHalfHour(date)
			const day = String(roundedDate.getDate()).padStart(2, '0')
			const month = String(roundedDate.getMonth() + 1).padStart(2, '0')
			const hours = String(roundedDate.getHours()).padStart(2, '0')
			const minutes = String(roundedDate.getMinutes()).padStart(2, '0')
			options.push(`${day}.${month} - ${hours}:${minutes}`)
		}

		return options
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		if (cartItems.length === 0) {
			alert('Корзина пуста. Добавьте товары для заказа.')
			return
		}

		const newErrors: { [key: string]: boolean } = {}
		// Проверка обязательных полей
		if (!deliveryMethod) {
			alert('Выберите способ доставки')
			return
		}

		if (!name) {
			newErrors.name = true
			alert('Не заполнено обязательное поле - Имя')
		}
		if (deliveryMethod === 'Доставка') {
			if (!street) {
				newErrors.street = true
				alert('Не заполнено обязательное поле - Улица')
			}
			if (!house) {
				newErrors.house = true
				alert('Не заполнено обязательное поле - Дом')
			}
		}
		if (!selectedTime) {
			newErrors.name = true
			alert('Не заполнено обязательное поле - Дата и время доставки/самовывоза')
		}
		if (!email) {
			newErrors.name = true
			alert('Не заполнено обязательное поле - Почта')
		}
		if (!phone) {
			newErrors.phone = true
			alert('Не заполнено обязательное поле - Телефон')
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return // Прекращаем выполнение, если есть ошибки
		}
		let createdTime = ''
		if (selectedTime === 'fastDelivery') {
			createdTime = new Date().toISOString()
		} else {
			const [dayMonth, time] = selectedTime.split(' - ')
			const [day, month] = dayMonth.split('.')
			const [hours, minutes] = time.split(':')
			const deliveryDate = new Date()
			deliveryDate.setDate(
				deliveryDate.getDate() + (new Date().getDate() > parseInt(day) ? 1 : 0)
			)
			deliveryDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
			createdTime = deliveryDate.toISOString()
		}
		// Объект для хранения уникальных продуктов и их количества
		const productMap: { [key: number]: number } = {}
		const extraIngredientsOrder: {
			productId: number
			extraIngredients: string // Здесь будет строка
			productCount: number
		}[] = []
		cartItems.forEach(item => {
			const productId = item.productId
			const extraIngredientsArray = JSON.parse(item.extraIngredients || '[]')
			// Увеличиваем количество в productMap
			if (productMap[productId]) {
				productMap[productId] += item.quantity // Увеличиваем количество
			} else {
				productMap[productId] = item.quantity // Устанавливаем количество
			}
			// Добавляем в extraIngredientsOrder
			const ingredientIds = extraIngredientsArray
				.map(ingredient => ingredient.id)
				.join(',') // Извлекаем ID и формируем строку
			extraIngredientsOrder.push({
				productId: productId,
				extraIngredients: ingredientIds, // Здесь оставляем строку с ID
				productCount: item.quantity,
			})
		})
		// Преобразуем объект в массивы
		const products = Object.keys(productMap).map(id => parseInt(id))
		const productsCount = Object.values(productMap).map(count => count)
		// Формирование данных заказа
		const orderData = {
			phoneNumber: phone,
			shopId: parseInt(shopId),
			deliveryAddress: `ул ${street}, д ${house}, подьезд ${entrance}, строение ${building}, кв ${room}. Комментарий - ${fastDelivery} . ${comment}`,
			type: deliveryMethod === 'Самовывоз' ? 'Самовывоз' : 'Доставка',
			paymentType: paymentMethod,
			email: email,
			clientName: name,
			products,
			createdTime,
			shopTag,
			personCount: personCount,
			changeFrom: changeAmount,
			ip: ipAddress,
			shopName: shopName,
			extraIngredientsOrder: extraIngredientsOrder.map(order => ({
				productId: order.productId,
				extraIngredients: order.extraIngredients,
				productCount: order.productCount,
			})),
			productsCount,
		}
		setIsLoading(true) // Устанавливаем состояние загрузки в true
		try {
			const response = await axios.post(
				`${backendApiUrl}order/createOrder`,
				orderData
			)
			dispatch(clearCart(shopId))
			console.log(response)
			if (response.data.order.paymentType === 'Наличные') {
				console.log('Наличка')
				navigate(`/${shopTag}/thanks/${response.data.order.id}`)
			} else {
				window.open(response.data.order[1].confirmation.confirmation_url)
			}
		} catch (error) {
			console.error('Error submitting order:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDeliveryChange = (value: string) => {
		setDeliveryMethod(value)
		if (value === 'Доставка') {
			setChangeNeeded(false)
			setChangeAmount('')
			setPaymentMethod('')
		}
		if (value === 'Самовывоз') {
			setPaymentMethod('')
		}
	}

	// const handlePaymentChange = (value: string) => {
	// 	setPaymentMethod(value)
	// 	if (value === 'Наличные') {
	// 		setChangeNeeded(true)
	// 	} else {
	// 		setChangeNeeded(false)
	// 		setChangeAmount('')
	// 	}
	// }

	const setSelectedTimeCustom = (time: string) => {
		if (time === 'fastDelivery') {
			setFastDelivery('Доставить по готовности')
		}
		setSelectedTime(time)
	}

	return (
		<div className={styles.order}>
			<h1 className={styles.orderTitle}>Создание заказа</h1>
			<Cart
				shopId={shopId}
				isDeliveryPrice={true}
				shopTag={shopTag}
				title=''
				deliveryMethod={deliveryMethod} // передаем выбранный способ доставки
			/>
			{isLoading && (
				<div className='ringloader'>
					<RingLoader color='#FF0000' loading={isLoading} size={150} />
				</div>
			)}
			<form className={styles.orderForm} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label className={styles.label}>
						Имя <span className={styles.mustHave}>*</span>
					</label>
					<input
						className={`${styles.input} ${errors.name ? 'error' : ''}`}
						type='text'
						value={name}
						onChange={e => {
							setName(e.target.value)
							setErrors(prev => ({ ...prev, name: false }))
						}}
					/>
					<label className={styles.label}>
						Телефон <span className={styles.mustHave}>*</span>
					</label>
					<input
						placeholder='+79999999999'
						className={`${styles.input} ${errors.phone ? 'error' : ''}`}
						type='text'
						value={phone}
						onChange={e => {
							setPhone(e.target.value)
							setErrors(prev => ({ ...prev, phone: false }))
						}}
					/>
					<label className={styles.label}>
						Эл. Почта для чека <span className={styles.mustHave}>*</span>
					</label>
					<input
						placeholder='example@gmail.com'
						className={styles.input}
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				{/* Поля для адреса отображаются только при выборе доставки */}
				{deliveryMethod === 'Доставка' && (
					<>
						<div className={styles.row}>
							<label className={styles.label}>
								Улица <span className={styles.mustHave}>*</span>
							</label>
							<input
								className={`${styles.input} ${errors.street ? 'error' : ''}`}
								type='text'
								value={street}
								onChange={e => {
									setStreet(e.target.value)
									setErrors(prev => ({ ...prev, street: false }))
								}}
							/>
							<label className={styles.label}>
								Дом <span className={styles.mustHave}>*</span>
							</label>
							<input
								className={`${styles.input} ${errors.house ? 'error' : ''}`}
								type='text'
								value={house}
								onChange={e => {
									setHouse(e.target.value)
									setErrors(prev => ({ ...prev, house: false }))
								}}
							/>
							<label className={styles.label}>Строение/Корпус</label>
							<input
								className={styles.input}
								type='text'
								value={building}
								onChange={e => setBuilding(e.target.value)}
							/>
						</div>
						<div className={styles.row}>
							<label className={styles.label}>Подьезд</label>
							<input
								className={styles.input}
								type='text'
								value={entrance}
								onChange={e => setEntrance(e.target.value)}
							/>
							<label className={styles.label}>Квартира</label>
							<input
								className={styles.input}
								type='text'
								value={room}
								onChange={e => setRoom(e.target.value)}
							/>
						</div>
					</>
				)}
				<div className={styles.row}>
					<label className={styles.label}>Комментарий</label>
					<input
						className={styles.input}
						type='text'
						value={comment}
						onChange={e => setComment(e.target.value)}
					/>
				</div>
				<div className={styles.row}>
					<label className={styles.label}>Количество персон</label>
					<input
						className={styles.input}
						type='number'
						value={personCount}
						onChange={e =>
							setPersonCount(Math.floor(Number(e.target.value)) || 1)
						}
					/>
				</div>
				<div className={styles.row}>
					<label className={styles.label}>
						Дата и время доставки/самовывоза{' '}
						<span className={styles.mustHave}>*</span>
					</label>
					<select
						className={`${styles.input} ${styles.select}`}
						value={selectedTime}
						onChange={e => setSelectedTimeCustom(e.target.value)}
					>
						<option className={styles.selectedTimeOption} value='' disabled>
							Выберите время
						</option>
						<option className={styles.selectedTimeOption} value='fastDelivery'>
							Доставить по готовности
						</option>
						{generateTimeOptions().map((time, index) => (
							<option
								className={styles.selectedTimeOption}
								key={index}
								value={time}
							>
								{time}
							</option>
						))}
					</select>
				</div>
				{/* Способы доставки */}
				<div className={styles.row}>
					<label className={styles.label}>
						Способы доставки (Курьером по городу - 300р, Самовывоз - бесплатно){' '}
						<span className={styles.mustHave}>*</span>
					</label>
					<div className={styles.deliveryOptions}>
						<label
							className={`${styles.button} ${
								deliveryMethod === 'Доставка' ? styles.selected : ''
							}`}
						>
							<input
								type='radio'
								value='Доставка'
								checked={deliveryMethod === 'Доставка'}
								onChange={e => handleDeliveryChange(e.target.value)}
							/>
							Курьером
						</label>
						<label
							className={`${styles.button} ${
								deliveryMethod === 'Самовывоз' ? styles.selected : ''
							}`}
						>
							<input
								type='radio'
								value='Самовывоз'
								checked={deliveryMethod === 'Самовывоз'}
								onChange={e => handleDeliveryChange(e.target.value)}
							/>
							Самовывоз
						</label>
					</div>
				</div>
				<div className={styles.row}>
					<label className={styles.labelRow}>* - Обязательное поле</label>
				</div>
				<button type='submit' className={styles.submitButton}>
					Заказать
				</button>
			</form>
		</div>
	)
}

export default Order
