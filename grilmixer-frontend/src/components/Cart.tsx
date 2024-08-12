import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, minusValue, plusValue } from '../store/store'
import styles from './Cart.module.css'

const Cart = () => {
	const dispatch = useDispatch()
	const cartItems = useSelector((state: RootState) => state.cart.items)
	const [totalAmount, setTotalAmount] = useState<number>(0)
	const handleOrder = () => {
		console.log('Заказ сделан')
	}

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

	return (
		<div className={styles.cartModal}>
			<h1>Корзина</h1>
			<div className={styles.cartHeader}>
				<h2 className={styles.cartTitle}>Товаров в корзине</h2>
				<h2 className={styles.cartAmount}>Стоимость: {totalAmount} ₽</h2>
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
			{cartItems.length > 0 && (
				<button className={styles.orderButton} onClick={handleOrder}>
					Заказать
				</button>
			)}
		</div>
	)
}

export default Cart
