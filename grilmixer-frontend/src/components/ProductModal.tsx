import axios from 'axios'
import { useEffect, useState } from 'react'
import { ExtraIngredient } from '../types/ExtraIngredient.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './ProductModal.module.css' // Импортируем стили

interface ProductModalProps {
	productId: number
	shopId: string
	categoryTag: string
	onClose: () => void
	product: {
		name: string
		ingredients: string
		bzu: string
		imagePath: string
		weight: string
	}
}

const ProductModal: React.FC<ProductModalProps> = ({
	productId,
	shopId,
	categoryTag,
	onClose,
	product,
}) => {
	const [additionalIngredients, setAdditionalIngredients] = useState<
		ExtraIngredient[]
	>([]) // Хранит дополнительные ингредиенты
	const [loading, setLoading] = useState(true)
	const [quantity, setQuantity] = useState(1) // Хранит количество товара

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
		return <div>Загрузка...</div> // Можно добавить лоадер
	}

	const increaseQuantity = () => {
		setQuantity(quantity + 1)
	}

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

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
						<p className={styles.productIngredients}>
							Состав: {product.ingredients}
						</p>
						<p>Вес: {product.weight} гр</p>
						<p>Калорийность: {product.bzu.split(',')[0]}</p>
						<p>Белки: {product.bzu.split(',')[1]}</p>
						<p>Жиры: {product.bzu.split(',')[2]}</p>
						<p>Углеводы: {product.bzu.split(',')[3]}</p>
					</div>
				</div>
				<div className={styles.additionalIngredients}>
					<h3>Дополнительные ингредиенты</h3>
					{additionalIngredients.map(ingredient => (
						<label key={ingredient.id}>
							<input type='checkbox' value={ingredient.id} />
							{ingredient.name} (+{ingredient.price} ₽)
						</label>
					))}
				</div>
				<div className={styles.quantityContainer}>
					<button className={styles.quantityButton} onClick={decreaseQuantity}>
						-
					</button>
					<span className={styles.quantity}>{quantity}</span>
					<button className={styles.quantityButton} onClick={increaseQuantity}>
						+
					</button>
				</div>
				<button className={styles.addToCartButton}>В корзину</button>
			</div>
		</div>
	)
}

export default ProductModal
