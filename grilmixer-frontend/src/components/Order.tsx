import axios from 'axios'
import React, { useState } from 'react'
import Cart from './Cart'
import styles from './Order.module.css'

const Order = ({ shopId, shopTag }: { shopId: string; shopTag: string }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [house, setHouse] = useState('')
	const [building, setBuilding] = useState('')
	const [comment, setComment] = useState('')
	const [personCount, setPersonCount] = useState<number>(1)
	const [email, setEmail] = useState('')
	const [deliveryMethod, setDeliveryMethod] = useState('')
	const [paymentMethod, setPaymentMethod] = useState('')
	const [deliveryDate, setDeliveryDate] = useState('')
	const [changeNeeded, setChangeNeeded] = useState(false)
	const [changeAmount, setChangeAmount] = useState('')

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		const orderData = {
			shopId,
			shopTag,
			name,
			phone,
			street,
			house,
			building,
			comment,
			personCount,
			email,
			deliveryMethod,
			paymentMethod,
			deliveryDate,
			changeNeeded,
			changeAmount,
		}
		try {
			const response = await axios.post('/api/orders', orderData)
			console.log('Order submitted:', response.data)
		} catch (error) {
			console.error('Error submitting order:', error)
		}
	}

	const handleDeliveryChange = (value: string) => {
		setDeliveryMethod(value)

		if (value === 'courier') {
			setChangeNeeded(false)
			setChangeAmount('')
			setPaymentMethod('')
		}
	}

	const handlePaymentChange = (value: string) => {
		setPaymentMethod(value)
		// Если выбраны наличные, то нужно сдачу
		if (value === 'cash') {
			setChangeNeeded(true)
		} else {
			setChangeNeeded(false)
			setChangeAmount('')
		}
	}

	return (
		<div className={styles.order}>
			<h1 className={styles.orderTitle}>Создание заказа</h1>
			<Cart isDeliveryPrice={true} shopTag={'foodcourt'} title='' />
			<form className={styles.orderForm} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label className={styles.label}>
						Имя <span className={styles.mustHave}>*</span>
					</label>
					<input
						className={styles.input}
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<label className={styles.label}>
						Телефон <span className={styles.mustHave}>*</span>
					</label>
					<input
						placeholder='+79999999999'
						className={styles.input}
						type='text'
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
					<label className={styles.label}>
						Эл. Почта <span className={styles.mustHave}>*</span>
					</label>
					<input
						placeholder='example@gmail.com'
						className={styles.input}
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className={styles.row}>
					<label className={styles.label}>
						Улица <span className={styles.mustHave}>*</span>
					</label>
					<input
						className={styles.input}
						type='text'
						value={street}
						onChange={e => setStreet(e.target.value)}
					/>
					<label className={styles.label}>
						Дом <span className={styles.mustHave}>*</span>
					</label>
					<input
						className={styles.input}
						type='text'
						value={house}
						onChange={e => setHouse(e.target.value)}
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
						onChange={e => setPersonCount(Number(e.target.value) || 1)}
					/>
				</div>
				<div className={styles.row}>
					<label className={styles.label}>
						Дата и время доставки/самовывоза *
					</label>
					<input
						className={styles.input}
						type='datetime-local'
						value={deliveryDate}
						onChange={e => setDeliveryDate(e.target.value)}
					/>
				</div>
				{/* Способы доставки */}
				<div className={styles.row}>
					<label className={styles.label}>
						Способы доставки <span className={styles.mustHave}>*</span>
					</label>
					<div className={styles.deliveryOptions}>
						<label
							className={`${styles.button} ${
								deliveryMethod === 'courier' ? styles.selected : ''
							}`}
						>
							<input
								type='radio'
								value='courier'
								checked={deliveryMethod === 'courier'}
								onChange={e => handleDeliveryChange(e.target.value)}
							/>
							Курьером
						</label>
						<label
							className={`${styles.button} ${
								deliveryMethod === 'pickup' ? styles.selected : ''
							}`}
						>
							<input
								type='radio'
								value='pickup'
								checked={deliveryMethod === 'pickup'}
								onChange={e => handleDeliveryChange(e.target.value)}
							/>
							Самовывоз
						</label>
					</div>
				</div>
				{/* Способ оплаты (появляется только при выборе самовывоза) */}
				{deliveryMethod === 'pickup' && (
					<div className={styles.row}>
						<label className={styles.label}>
							Способ оплаты <span className={styles.mustHave}>*</span>{' '}
						</label>
						<div className={styles.paymentOptions}>
							<label
								className={`${styles.button} ${
									paymentMethod === 'cash' ? styles.selected : ''
								}`}
							>
								<input
									type='radio'
									value='cash'
									checked={paymentMethod === 'cash'}
									onChange={e => handlePaymentChange(e.target.value)}
								/>
								Наличные
							</label>
							<label
								className={`${styles.button} ${
									paymentMethod === 'non-cash' ? styles.selected : ''
								}`}
							>
								<input
									type='radio'
									value='non-cash'
									checked={paymentMethod === 'non-cash'}
									onChange={e => handlePaymentChange(e.target.value)}
								/>
								Безналичная
							</label>
						</div>
					</div>
				)}
				{/* Поле для сдачи, если выбраны наличные */}
				{changeNeeded && paymentMethod === 'cash' && (
					<div className={styles.row}>
						<label className={styles.label}>Нужна сдача с</label>
						<input
							className={styles.input}
							type='number'
							value={changeAmount}
							onChange={e => setChangeAmount(e.target.value)}
							placeholder='Введите сумму'
						/>
					</div>
				)}
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
