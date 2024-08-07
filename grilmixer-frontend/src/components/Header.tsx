import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Skeleton } from '@mui/material' // Импортируем Skeleton из Material-UI
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './Header.module.css'

interface HeaderProps {
	logo: string
	shopId: string
}

interface Category {
	name: string
	tag: string
	imagePath: string
}

export const Header: React.FC<HeaderProps> = ({ logo, shopId }) => {
	const navigate = useNavigate()
	const [categories, setCategories] = useState<Category[]>([])
	const [showModal, setShowModal] = useState(false)
	const [loading, setLoading] = useState(true) // Состояние загрузки

	useEffect(() => {
		axios
			.get(`${backendApiUrl}admin/getCategories/${shopId}`)
			.then(response => {
				setCategories(response.data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching categories:', error)
			})
	}, [shopId])

	const handleClickCategory = (categoryTag: string) => {
		navigate(`category/${categoryTag}`)
	}

	const handleShowModal = (e: Event) => {
		if (window.innerWidth >= 768) {
			setShowModal(true)
		} else {
			if (e.type === 'mousedown') {
				navigate('cart')
			}
		}
	}

	const handleHideModal = () => {
		setShowModal(false)
	}

	return (
		<div>
			<header className={styles.header}>
				<h1 className={styles.logo}>{logo}</h1>
			</header>
			<div className={styles.afterHeader}>
				<div className={styles.categoryRow}>
					{loading || !categories ? (
						<Skeleton
							variant='rounded'
							sx={{
								bgcolor: 'grey.900',
								width: '100%',
								height: 30,
							}}
							animation='wave'
						/>
					) : (
						categories.map((category, index) => (
							<p
								key={index}
								onClick={() => {
									handleClickCategory(category.tag)
								}}
							>
								{category.name}
							</p>
						))
					)}
				</div>
				<div
					className='flex space-x-2 cursor-pointer relative'
					onMouseEnter={e => handleShowModal(e)}
					onMouseDown={e => handleShowModal(e)}
					onMouseLeave={e => handleHideModal(e)}
				>
					<button className={styles.cartBtn}>
						<ShoppingCartIcon className={styles.cartIcon} />
						0Р
					</button>
					<div className={`cartModal ${showModal ? 'block' : 'hidden'}`}>
						<div className={styles.cartHeader}>
							<h3 className='cartHeaderTitle'>Товаров в корзине</h3>
							<TrashIcon className={styles.trashIcon} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
