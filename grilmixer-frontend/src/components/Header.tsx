// Header.tsx
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Skeleton } from '@mui/material' // Импортируем Skeleton из Material-UI
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendApiUrl } from '../utils/BackendUrl'
import CartModal from './CartModal' // Импортируем новый компонент
import styles from './Header.module.css'

interface HeaderProps {
	logo: string
	shopId: string
	shopTag: string
}

interface Category {
	name: string
	tag: string
	imagePath: string
}

export const Header: React.FC<HeaderProps> = ({ logo, shopId, shopTag }) => {
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
		navigate(`/${shopTag}/category/${categoryTag}`)
	}

	const handleNavigateMain = () => {
		navigate('/')
	}

	const handleShowModal = () => {
		if (window.innerWidth > 1000) {
			setShowModal(true)
		}
	}
	const handleMobileCart = () => {
		if (window.innerWidth < 1000) {
			navigate(`/${shopTag}/cart`)
		}
	}
	const handleHideModal = () => {
		if (window.innerWidth > 1000) {
			setShowModal(false)
		}
	}

	return (
		<div>
			<header className={styles.header}>
				<h1 onClick={handleNavigateMain} className={styles.logo}>
					{logo}
				</h1>
			</header>
			<div className={styles.afterHeader}>
				<div className={styles.categoryRow}>
					{loading || !categories.length ? (
						<Skeleton
							variant='rounded'
							sx={{
								bgcolor: 'grey.900',
								width: '100%',
								height: 30,
							}}
							animation='pulse'
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
				<div className='flex space-x-2 cursor-pointer relative'>
					<button
						className={styles.cartBtn}
						onMouseEnter={handleShowModal}
						onClick={handleMobileCart}
					>
						<ShoppingCartIcon className={styles.cartIcon} />
					</button>
					{showModal && (
						<CartModal
							shopId={shopId}
							setClose={handleHideModal}
							shopTag={shopTag}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
