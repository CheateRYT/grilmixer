import { Skeleton } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Product } from '../types/Product.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './ProductList.module.css'
import ProductModal from './ProductModal' // Импортируем модальное окно

const ProductList = ({
	shopId,
	categoryTag,
}: {
	shopId: string
	categoryTag: string
}) => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null) // Храним выбранный продукт для модального окна

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					`${backendApiUrl}admin/getProductsByCategory/${shopId}/${categoryTag}`
				)
				setProducts(response.data)
			} catch (error) {
				console.error('Ошибка при получении продуктов:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
	}, [shopId, categoryTag])

	const handleAddToCart = (product: Product) => {
		setSelectedProduct(product) // Устанавливаем выбранный продукт
	}

	const closeModal = () => {
		setSelectedProduct(null) // Закрываем модальное окно
	}

	return (
		<div className={styles.cardContainer}>
			{loading
				? Array.from(new Array(8)).map((_, index) => (
						<div key={index} className={styles.card}>
							<Skeleton variant='rectangular' width='100%' height='206px' />
							<div className={styles.cardText}>
								<Skeleton variant='text' width='60%' />
								<Skeleton variant='text' width='80%' />
								<Skeleton variant='text' width='40%' />
							</div>
						</div>
				  ))
				: products.map(product => (
						<div key={product.id} className={styles.card}>
							<div
								className={styles.cardImage}
								style={{ backgroundImage: `url(${product.imagePath})` }}
							></div>
							<div className={styles.cardText}>
								<p className={styles.productName}>{product.name}</p>
								<p className={styles.ingridients}>
									<span className={styles.ingridientsSpan}>Состав: </span>
									{product.ingredients}
								</p>
								<div className={styles.priceContainer}>
									<span>{product.price} ₽</span>
									<button
										className={styles.addToCartButton}
										onClick={() => handleAddToCart(product)}
									>
										В корзину
									</button>
								</div>
							</div>
						</div>
				  ))}
			{selectedProduct && (
				<ProductModal
					productId={selectedProduct.id}
					shopId={shopId}
					categoryTag={categoryTag}
					onClose={closeModal}
					product={selectedProduct} // Передаем данные о продукте
				/>
			)}
		</div>
	)
}

export default ProductList
