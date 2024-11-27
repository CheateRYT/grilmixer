import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminCategoryDiscount = () => {
	interface Category {
		id: number
		shopId: number
		name: string
		tag: string
		imagePath: string
	}

	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategoryTag, setSelectedCategoryTag] = useState<string>('')
	const [discountPercentage, setDiscountPercentage] = useState<number>(0)
	const [selectedShopId, setSelectedShopId] = useState<number>(1) // shopId по умолчанию
	const [shops] = useState([
		{ id: 1, name: 'Гриль МикСер номер 1' },
		{ id: 2, name: 'Фарш номер 2' },
	])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get<Category[]>(
					`${backendApiUrl}admin/getCategories/${selectedShopId}`
				)
				setCategories(response.data)
			} catch (error) {
				console.error('Ошибка при получении категорий:', error)
			}
		}
		fetchCategories()
	}, [selectedShopId])

	const handleApplyDiscount = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.post(
				`${backendApiUrl}admin/applyDiscount`,
				{ category: selectedCategoryTag, discountPercentage },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			window.location.reload() // Обновляем страницу после успешного применения скидки
		} catch (error) {
			console.error('Ошибка при применении скидки:', error)
		}
	}

	const handleRemoveDiscount = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.post(
				`${backendApiUrl}admin/removeDiscount`,
				{ category: selectedCategoryTag },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			window.location.reload() // Обновляем страницу после успешного удаления скидки
		} catch (error) {
			console.error('Ошибка при удалении скидки:', error)
		}
	}

	return (
		<div className='bg-slate-700 p-4'>
			<AdminMain />
			<h2 className='text-xl font-bold mb-4 text-white'>
				Изменение скидок для категорий:
			</h2>
			<div className='mb-4'>
				<label className='block text-white mb-2'>Выберите магазин:</label>
				<select
					value={selectedShopId}
					onChange={e => setSelectedShopId(Number(e.target.value))}
					className='mb-4 px-4 py-2 rounded border'
				>
					{shops.map(shop => (
						<option key={shop.id} value={shop.id}>
							{shop.name}
						</option>
					))}
				</select>
				<label className='block text-white mb-2'>Выберите категорию:</label>
				<select
					value={selectedCategoryTag}
					onChange={e => setSelectedCategoryTag(e.target.value)}
					className='mb-4 px-4 py-2 rounded border'
				>
					<option value='' disabled>
						-- Выберите категорию по тегу --
					</option>
					{categories.map(category => (
						<option key={category.id} value={category.tag}>
							{category.tag} - {category.name}
						</option>
					))}
				</select>
				<p className='text-3xl'>Выберите процент скидки %</p>
				<input
					type='number'
					onChange={e => setDiscountPercentage(Number(e.target.value))}
					placeholder='Процент скидки'
					className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-500 text-white p-3'
				/>
				<button
					onClick={handleApplyDiscount}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
				>
					Применить скидку
				</button>
				<button
					onClick={handleRemoveDiscount}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2'
				>
					Удалить скидку
				</button>
			</div>
		</div>
	)
}

export default AdminCategoryDiscount
