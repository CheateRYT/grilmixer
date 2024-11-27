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
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [isMobile, setIsMobile] = useState<boolean>(false)

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

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 1400)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	}, [])

	const handleAddToCart = (product: Product) => {
		setSelectedProduct(product)
	}

	const closeModal = () => {
		setSelectedProduct(null)
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
				: products.map(product => {
						const priceAfterDiscount =
							Number(product.price) - Number(product.discount)
						const discountPercentage =
							(Number(product.discount) / Number(product.price)) * 100

						return (
							<div key={product.id} className={styles.card}>
								<div
									onClick={() => handleAddToCart(product)}
									className={styles.cardImage}
									style={{ backgroundImage: `url(${product.imagePath})` }}
								>
									{Number(product.discount) > 0 && (
										<div className={styles.discountBadge}>
											-{discountPercentage.toFixed(0)}%
										</div>
									)}
								</div>
								<div className={styles.cardText}>
									<p className={styles.productName}>{product.name}</p>
									{!isMobile && product.ingredients ? (
										<p className={styles.ingridients}>
											<span className={styles.ingridientsSpan}>Состав: </span>
											{product.ingredients}
										</p>
									) : null}
									<div className={styles.priceContainer}>
										<span>{priceAfterDiscount.toFixed(2)} ₽</span>

										<button
											className={styles.addToCartButton}
											onClick={() => handleAddToCart(product)}
										>
											В корзину
										</button>
									</div>
								</div>
							</div>
						)
				  })}
			{selectedProduct && (
				<ProductModal
					productId={selectedProduct.id}
					shopId={shopId}
					categoryTag={categoryTag}
					onClose={closeModal}
					price={priceAfterDiscount.toFixed(2)}
					product={selectedProduct}
				/>
			)}
		</div>
	)
}

export default ProductList
