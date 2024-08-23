import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminCategory = () => {
	interface Category {
		id: number
		shopId: number
		name: string
		tag: string
		imagePath: string
	}

	const [categories, setCategories] = useState<Category[]>([])
	const [showModal, setShowModal] = useState(false)
	const [selectedShopId, setSelectedShopId] = useState<number>(1) // Default shopId
	const [newCategoryData, setNewCategoryData] = useState({
		shopId: 1, // Default shopId
		name: '',
		tag: '',
		imagePath: '',
	})
	const handleShopIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedShopId(parseInt(e.target.value))
	}
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

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleCreateCategory = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.post(
				`${backendApiUrl}admin/createCategory`,
				newCategoryData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setShowModal(false)
			window.location.reload()
		} catch (error) {
			console.error('Ошибка при создании категории:', error)
		}
	}
	const handleDeleteCategory = async (id: number) => {
		try {
			const token = Cookies.get('admin-token')
			await axios.delete(`${backendApiUrl}admin/deleteCategory/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setCategories(prevNotifications =>
				prevNotifications.filter(category => category.id !== id)
			)
		} catch (error) {
			console.error('Error deleting notification:', error)
		}
	}
	return (
		<div>
			<AdminMain />
			<div>
				<h2 className='text-xl font-bold mb-2'>Категории:</h2>
				<button
					onClick={handleOpenModal}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2'
				>
					Создать категорию
				</button>
				<p>Выбрать магазин</p>
				<select
					value={selectedShopId}
					onChange={handleShopIdChange}
					className='mb-4 px-4 py-2 rounded border'
				>
					<option value={1}>Гриль МикСер номер 1</option>
					<option value={2}>Фарш номер 2</option>
				</select>
				<table className='min-w-full divide-y divide-gray-200 bg-black text-white'>
					<thead className='bg-gray-800'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер Магазина
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Название категории
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Tag категории
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Путь к картинке
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Действие
							</th>
						</tr>
					</thead>
					<tbody className='bg-gray-900 divide-y divide-gray-200'>
						{categories.map(category => (
							<tr key={category.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{category.shopId}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>{category.name}</td>
								<td className='px-6 py-4 whitespace-nowrap'>{category.tag}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{category.imagePath}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => handleDeleteCategory(category.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									>
										Удалить
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{showModal && (
					<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
						<div className='bg-gray-800 p-4 rounded shadow-lg text-white'>
							<h3 className='text-lg font-bold mb-2'>Создать категорию</h3>
							<input
								type='text'
								name='name'
								value={newCategoryData.name}
								onChange={e =>
									setNewCategoryData({
										...newCategoryData,
										name: e.target.value,
									})
								}
								placeholder='Название категории'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
							/>
							<select
								name='shopId'
								onChange={e =>
									setNewCategoryData({
										...newCategoryData,
										shopId: Number(e.target.value),
									})
								}
							>
								<option value='1'>Гриль МикСер номер 1</option>
								<option value='2'>Фарш номер 2</option>
							</select>
							<input
								type='text'
								name='tag'
								value={newCategoryData.tag}
								onChange={e =>
									setNewCategoryData({
										...newCategoryData,
										tag: e.target.value,
									})
								}
								placeholder='Tag категории (Пример burgers,pizza)'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
							/>
							<input
								type='text'
								name='imagePath'
								value={newCategoryData.imagePath}
								onChange={e =>
									setNewCategoryData({
										...newCategoryData,
										imagePath: e.target.value,
									})
								}
								placeholder='Путь к картинке'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
							/>
							<button
								onClick={handleCreateCategory}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
							>
								Создать
							</button>
							<button
								onClick={handleCloseModal}
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2'
							>
								Отмена
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdminCategory
