import { Skeleton } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './HomeCategory.module.css' // Импортируем стили

interface Category {
	id: number
	name: string
	imagePath: string
}

const HomeCategory: React.FC<{ shopId: number }> = ({ shopId }) => {
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const [imagesLoaded, setImagesLoaded] = useState(false)
	const navigate = useNavigate()
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					`${backendApiUrl}admin/getCategories/${shopId}`
				)
				setCategories(response.data) // Предполагается, что данные приходят в формате массива
			} catch (error) {
				console.error('Ошибка при получении категорий:', error)
			}
		}
		fetchCategories()
	}, [shopId])

	useEffect(() => {
		if (categories.length > 0) {
			let loadedImages = 0
			const totalImages = categories.length

			categories.forEach(category => {
				const img = new Image()
				img.src = category.imagePath
				img.onload = () => {
					loadedImages++
					if (loadedImages === totalImages) {
						setImagesLoaded(true)
						setLoading(false) // Убираем скелетон, когда все изображения загружены
					}
				}
			})
		}
	}, [categories])
	const handleSelectCategory = (categoryTag: string) => {
		navigate(`category/${categoryTag}`)
	}
	return (
		<div className={styles.cardContainer}>
			{loading || !imagesLoaded
				? // Если идет загрузка или изображения не загружены, отображаем 8 пустых карточек с помощью Skeleton
				  Array.from(new Array(8)).map((_, index) => (
						<div key={index} className={styles.card}>
							<Skeleton variant='rectangular' width='100%' height='100%' />
							<div className={styles.cardText}>
								<Skeleton variant='text' width='60%' />
							</div>
						</div>
				  ))
				: // Если загрузка завершена и изображения загружены, отображаем категории
				  categories.map(category => (
						<div
							onClick={() => handleSelectCategory(category.tag)}
							key={category.id}
							className={styles.card}
						>
							<div
								className={styles.cardImage}
								style={{ backgroundImage: `url(${category.imagePath})` }}
							></div>
							<div className={styles.cardText}>
								<p>{category.name}</p>
							</div>
						</div>
				  ))}
		</div>
	)
}

export default HomeCategory
