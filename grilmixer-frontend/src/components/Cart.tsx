import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, minusValue, plusValue } from '../store/store'
import styles from './Cart.module.css'

const Cart = ({
	shopTag,
	title,
	isDeliveryPrice,
}: {
	shopTag: string
	title: string
	isDeliveryPrice: boolean
}) => {
	const dispatch = useDispatch()
	const cartItems = useSelector((state: RootState) => state.cart.items)
	const [totalAmount, setTotalAmount] = useState<number>(0)
	const navigate = useNavigate()
	const handleOrder = () => {
		navigate(`/${shopTag}/order`)
	}
	const deliveryPrice = 300
	// Функция для подсчета общей стоимости
	const calculateTotalAmount = () => {
		return cartItems.reduce((total, item) => {
			return total + Number(item.price) * item.quantity
		}, 0)
	}

	// Используем useEffect для обновления общей стоимости при изменении cartItems
	useEffect(() => {
		setTotalAmount(calculateTotalAmount())
	}, [cartItems])
	const totalWithDelivery = isDeliveryPrice
		? totalAmount + deliveryPrice
		: totalAmount
	return (
		<div className={styles.cartModal}>
			<h1>{title}</h1>
			<div className={styles.cartHeader}>
				<h2 className={styles.cartTitle}>Товаров в корзине</h2>
				<div className={styles.cartPrice}>
					<h2 className={styles.cartAmount}>Стоимость: {totalAmount} ₽</h2>
					{isDeliveryPrice && cartItems.length > 0 && (
						<div>
							<p className={styles.cartDeliveryPrice}>Доставка: 300 ₽</p>
							<p className={styles.cartItogo}>Итого: {totalWithDelivery} ₽</p>
						</div>
					)}
				</div>
			</div>
			<div className={styles.cartItems}>
				{cartItems.length === 0 ? (
					<p>Корзина пуста</p>
				) : (
					cartItems.map((item, index) => (
						<div
							key={`${item.productId}-${item.extraIngredients}`}
							className={styles.cartItem}
						>
							<div>
								<span className={styles.itemName}>{item.name}</span>
								{JSON.parse(item.extraIngredients).length > 0 && (
									<ul className={styles.extraIngredientsList}>
										{JSON.parse(item.extraIngredients).map(ing => (
											<li key={ing.id}>{ing.name}</li>
										))}
									</ul>
								)}
							</div>
							<div className={styles.quantityControls}>
								<button
									className={styles.quantityControl}
									onClick={() =>
										dispatch(minusValue({ productId: item.productId, index }))
									}
								>
									-
								</button>
								<span className={styles.quantity}>{item.quantity}</span>
								<button
									className={styles.quantityControl}
									onClick={() =>
										dispatch(plusValue({ productId: item.productId, index }))
									}
								>
									+
								</button>
							</div>
							<span>
								Цена:{' '}
								<span className={styles.amount}>
									{Number(item.price) * item.quantity} ₽
								</span>
							</span>
						</div>
					))
				)}
			</div>
			{cartItems.length > 0 && !isDeliveryPrice && (
				<button className={styles.orderButton} onClick={handleOrder}>
					Заказать
				</button>
			)}
		</div>
	)
}

export default Cart
