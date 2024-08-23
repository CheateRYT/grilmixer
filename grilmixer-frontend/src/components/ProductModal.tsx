import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RingLoader } from 'react-spinners'
import { addToCart } from '../store/store' // Импортируйте действия
import { ExtraIngredient } from '../types/ExtraIngredient.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './ProductModal.module.css' // Импортируем стили

interface ProductModalProps {
	productId: number
	shopId: string
	price: string
	categoryTag: string
	onClose: () => void
	product: {
		name: string
		ingredients: string
		bzu: string
		imagePath: string
		weight: string
		category: string // Добавляем категорию продукта
	}
}

const ProductModal: React.FC<ProductModalProps> = ({
	productId,
	shopId,
	categoryTag,
	price,
	onClose,
	product,
}) => {
	const dispatch = useDispatch()
	const [additionalIngredients, setAdditionalIngredients] = useState<
		ExtraIngredient[]
	>([])
	const [loading, setLoading] = useState(true)
	const [quantity, setQuantity] = useState(1)
	const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]) // Хранение выбранных ингредиентов

	useEffect(() => {
		const fetchAdditionalIngredients = async () => {
			try {
				const response = await axios.get(
					`${backendApiUrl}admin/extraIngredients/${shopId}/${categoryTag}`
				)
				setAdditionalIngredients(response.data)
			} catch (error) {
				console.error(
					'Ошибка при получении дополнительных ингредиентов:',
					error
				)
			} finally {
				setLoading(false)
			}
		}
		fetchAdditionalIngredients()
	}, [shopId, categoryTag])

	if (loading) {
		return (
			<div className='ringloader'>
				<RingLoader color='#FF0000' loading={loading} size={150} />
			</div>
		)
	}

	const increaseQuantity = () => {
		setQuantity(quantity + 1)
	}

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	const handleAddToCart = () => {
		const extraIngredients = selectedIngredients
			.map(id => {
				const ingredient = additionalIngredients.find(ing => ing.id === id)
				return ingredient
					? {
							id: ingredient.id,
							name: ingredient.name,
							price: ingredient.price,
					  }
					: null
			})
			.filter(Boolean)

		const totalExtraIngredientsPrice = extraIngredients.reduce(
			(total, ingredient) => {
				return total + Number(ingredient.price)
			},
			0
		)

		const totalPrice = Number(price) + totalExtraIngredientsPrice
		dispatch(
			addToCart({
				productId,
				shopId, // Добавляем shopId
				quantity,
				name: product.name || 'Неизвестный продукт',
				price: totalPrice.toString(),
				extraIngredients: JSON.stringify(extraIngredients), // Сохраняем как JSON строку
			})
		)
		onClose() // Закрываем модальное окно после добавления в корзину
	}

	const handleIngredientChange = (id: number) => {
		setSelectedIngredients(prev =>
			prev.includes(id)
				? prev.filter(ingredientId => ingredientId !== id)
				: [...prev, id]
		)
	}

	// Рассчитываем общую стоимость дополнительных ингредиентов
	const totalExtraIngredientsPrice = selectedIngredients.reduce((total, id) => {
		const ingredient = additionalIngredients.find(ing => ing.id === id)
		return total + (ingredient ? Number(ingredient.price) : 0)
	}, 0)

	const totalPrice = (Number(price) + totalExtraIngredientsPrice) * quantity

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<button className={styles.closeButton} onClick={onClose}>
					✖
				</button>
				<div className={styles.productInfo}>
					<div
						className={styles.productImage}
						style={{ backgroundImage: `url(${product.imagePath})` }}
					></div>
					<div className={styles.productDetails}>
						<h2 className={styles.productName}>{product.name}</h2>
						{product.ingredients && product.ingredients.trim() !== '' && (
							<p className={styles.productIngredients}>
								Состав: {product.ingredients}
							</p>
						)}
						<p>
							{product.category === 'drinks' ? 'Объем: ' : 'Вес: '}
							{product.weight} {product.category === 'drinks' ? 'л' : 'гр'}
						</p>
						{product.bzu && (
							<>
								<p>Калорийность: {product.bzu.split(',')[0]}</p>
								<p>Белки: {product.bzu.split(',')[1]}</p>
								<p>Жиры: {product.bzu.split(',')[2]}</p>
								<p>Углеводы: {product.bzu.split(',')[3]}</p>
							</>
						)}
					</div>
				</div>
				{additionalIngredients.length > 0 && (
					<div className={styles.additionalIngredients}>
						<h3>Дополнительные ингредиенты</h3>
						{additionalIngredients.map(ingredient => (
							<label key={ingredient.id}>
								<input
									type='checkbox'
									value={ingredient.id}
									checked={selectedIngredients.includes(ingredient.id)}
									onChange={() => handleIngredientChange(ingredient.id)}
								/>
								{ingredient.name} (+{ingredient.price} ₽)
							</label>
						))}
					</div>
				)}
				<div className={styles.quantityContainer}>
					<p className={styles.productName}>{totalPrice} ₽</p>
					<button className={styles.quantityButton} onClick={decreaseQuantity}>
						-
					</button>
					<span className={styles.quantity}>{quantity}</span>
					<button className={styles.quantityButton} onClick={increaseQuantity}>
						+
					</button>
				</div>
				<button className={styles.addToCartButton} onClick={handleAddToCart}>
					В корзину
				</button>
			</div>
		</div>
	)
}

export default ProductModal
