import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, minusValue, plusValue } from '../store/store'
import styles from './CartModal.module.css'

const CartModal = ({
	setClose,
	setAmount,
}: {
	setClose: () => void
	setAmount: (amount: number) => void
}) => {
	const dispatch = useDispatch()
	const cartItems = useSelector((state: RootState) => state.cart.items)

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
		const totalAmount = calculateTotalAmount()
		setAmount(totalAmount)
	}, [cartItems, setAmount])

	return (
		<div className={styles.cartModal}>
			<div className={styles.cartHeader}>
				<h2 className={styles.cartTitle}>Товаров в корзине</h2>
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
									onClick={() =>
										dispatch(minusValue({ productId: item.productId, index }))
									}
								>
									-
								</button>
								<span>{item.quantity}</span>
								<button
									onClick={() =>
										dispatch(plusValue({ productId: item.productId, index }))
									}
								>
									+
								</button>
							</div>
							<span>Стоимость: {Number(item.price) * item.quantity} ₽</span>
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

export default CartModal
