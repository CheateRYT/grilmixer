import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Product } from '../types/Product.interface'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'
const AdminProducts: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [selectedShopId, setSelectedShopId] = useState<number>(1) // Default shopId
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [showModal, setShowModal] = useState(false)
	const [updatedProductData, setUpdatedProductData] = useState<
		Partial<Product>
	>({})

	const [showCreateModal, setShowCreateModal] = useState(false)
	const [newProductData, setNewProductData] = useState({
		shopId: 1, // Default shopId
		name: '',
		ingredients: '',
		category: '',
		weight: '',
		price: '',
		discount: '',
		bzu: '',
		imagePath: '',
		isStopList: false,
		isAvailable: true,
	})

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get<Product[]>(
					`${backendApiUrl}admin/getProducts/${selectedShopId}`
				)
				setProducts(response.data)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}
		fetchProducts()
	}, [selectedShopId])
	const handleShopIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedShopId(parseInt(e.target.value))
	}
	const handleEditProduct = (product: Product) => {
		setSelectedProduct(product)
		setShowModal(true)
	}
	const handleCancelUpdate = () => {
		setShowModal(false)
		setUpdatedProductData({}) // Очищаем данные, если они были изменены
	}
	const handleUpdateProduct = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.put(
				`${backendApiUrl}admin/updateProduct/${selectedProduct.id}`,
				updatedProductData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			// Обновить список продуктов после успешного обновления

			setShowModal(false)
			window.location.reload()
		} catch (error) {
			console.error('Error updating product:', error)
		}
	}
	const handleModalInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		if (name === 'isStopList' || name === 'isAvailable') {
			setUpdatedProductData(prevData => ({
				...prevData,
				[name]: value === 'true',
			}))
		} else {
			setUpdatedProductData(prevData => ({ ...prevData, [name]: value }))
		}
	}
	const handleDeleteProduct = async (productId: number) => {
		try {
			const token = Cookies.get('admin-token')
			await axios.delete(`${backendApiUrl}admin/deleteProduct/${productId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			// Update the product list after successful deletion
			setProducts(products.filter(product => product.id !== productId))
		} catch (error) {
			console.error('Error deleting product:', error)
		}
	}
	const handleOpenCreateModal = () => {
		setShowCreateModal(true)
	}

	const handleCloseCreateModal = () => {
		setShowCreateModal(false)
	}

	const handleCreateProduct = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.post(`${backendApiUrl}admin/createProduct`, newProductData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setShowModal(false)
			window.location.reload()
		} catch (error) {
			console.error('Ошибка при создании категории:', error)
		}
	}

	return (
		<div className='p-4'>
			<AdminMain />
			<div className='overflow-x-auto  bg-slate-700'>
				<h2 className='text-xl text-white font-bold mb-2'>Товары:</h2>
				<button
					onClick={handleOpenCreateModal}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2'
				>
					Создать товар
				</button>
				<p className='text-white'>Выбрать магазин</p>
				<select
					value={selectedShopId}
					onChange={handleShopIdChange}
					className='mb-4 px-4 py-2 rounded border'
				>
					<option value={1}>Гриль МикСер номер 1</option>
					<option value={2}>Фарш номер 2</option>
				</select>
				<table className='min-w-full divide-y divide-gray-200 bg-black text-white'>
					<thead className='bg-gray-800 pb-3'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Категория
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Название
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Ингредиенты
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Бжу
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Вес
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Цена
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Скидка
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Стоп-лист
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Наличие
							</th>

							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Действие
							</th>
						</tr>
					</thead>
					<tbody className='bg-black divide-y divide-gray-200'>
						{products.map(product => (
							<tr key={product.id}>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.id}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.category}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.name}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.ingredients}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.bzu}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.weight}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.price}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.discount || '-'}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.isStopList ? 'Да' : 'Нет'}
								</td>
								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									{product.isAvailable ? 'Да' : 'Нет'}
								</td>

								<td className='px-6 py-2'>
									{' '}
									{/* Уменьшаем высоту столбцов */}
									<button
										onClick={() => handleEditProduct(product)}
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
									>
										Изменить
									</button>
									<button
										onClick={() => handleDeleteProduct(product.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									>
										Удалить
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showModal && selectedProduct && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
					<div className='bg-gray-800 p-4 rounded shadow-lg text-white'>
						<h3 className='text-lg font-bold mb-2'>Редактировать продукт</h3>
						<label>
							Название:
							<input
								type='text'
								name='name'
								value={
									updatedProductData.name !== undefined
										? updatedProductData.name
										: selectedProduct.name
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Цена:
							<input
								type='text'
								name='price'
								value={
									updatedProductData.price !== undefined
										? updatedProductData.price
										: selectedProduct.price
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Категория:
							<input
								type='text'
								name='category'
								placeholder='Tag категории'
								value={
									updatedProductData.category !== undefined
										? updatedProductData.category
										: selectedProduct.category
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Скидка:
							<input
								type='text'
								name='discount'
								value={
									updatedProductData.discount !== undefined
										? updatedProductData.discount
										: selectedProduct.discount || ''
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Вес:
							<input
								type='text'
								name='weight'
								value={
									updatedProductData.weight !== undefined
										? updatedProductData.weight
										: selectedProduct.weight
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Ингредиенты:
							<input
								type='text'
								name='ingredients'
								value={
									updatedProductData.ingredients !== undefined
										? updatedProductData.ingredients
										: selectedProduct.ingredients
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Бжу:
							<input
								type='text'
								name='bzu'
								value={
									updatedProductData.bzu !== undefined
										? updatedProductData.bzu
										: selectedProduct.bzu
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<label>
							Стоп-лист:
							<select
								name='isStopList'
								value={
									updatedProductData.isStopList !== undefined
										? updatedProductData.isStopList
										: selectedProduct.isStopList
								}
								onChange={e => handleModalInputChange(e)}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							>
								<option value={true}>Да</option>
								<option value={false}>Нет</option>
							</select>
						</label>
						<label>
							В наличии
							<select
								name='isAvailable'
								value={
									updatedProductData.isAvailable !== undefined
										? updatedProductData.isAvailable
										: selectedProduct.isAvailable
								}
								onChange={e => handleModalInputChange(e)}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							>
								<option value={true}>Да</option>
								<option value={false}>Нет</option>
							</select>
						</label>

						<label>
							Картинка:
							<input
								type='text'
								name='imagePath'
								value={
									updatedProductData.imagePath !== undefined
										? updatedProductData.imagePath
										: selectedProduct.imagePath
								}
								onChange={handleModalInputChange}
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
							/>
						</label>
						<button
							onClick={handleCancelUpdate}
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2'
						>
							Отмена
						</button>
						<button
							onClick={handleUpdateProduct}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
						>
							Сохранить изменения
						</button>
					</div>
				</div>
			)}
			{showCreateModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
					<div className='bg-gray-800 p-4 rounded shadow-lg text-white'>
						<h3 className='text-lg font-bold mb-2'>Создать Товар</h3>
						<select
							className=' bg-slate-700'
							name='shopId'
							onChange={e =>
								setNewProductData({
									...newProductData,
									shopId: Number(e.target.value),
								})
							}
						>
							<option value='1'>Гриль МикСер номер 1</option>
							<option value='2'>Фарш номер 2</option>
						</select>
						<input
							type='text'
							name='name'
							value={newProductData.name}
							onChange={e =>
								setNewProductData({
									...newProductData,
									name: e.target.value,
								})
							}
							placeholder='Название товара'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='category'
							value={newProductData.category}
							onChange={e =>
								setNewProductData({
									...newProductData,
									category: e.target.value,
								})
							}
							placeholder='Tag категории (Пример burgers, pizza)'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='ingredients'
							value={newProductData.ingredients}
							onChange={e =>
								setNewProductData({
									...newProductData,
									ingredients: e.target.value,
								})
							}
							placeholder='Ингридиенты, через запятую без пробелов'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='bzu'
							value={newProductData.bzu}
							onChange={e =>
								setNewProductData({
									...newProductData,
									bzu: e.target.value,
								})
							}
							placeholder='КБЖУ, Калории, белки жиры углеводы через запятую без пробелов'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='weight'
							value={newProductData.weight}
							onChange={e =>
								setNewProductData({
									...newProductData,
									weight: e.target.value,
								})
							}
							placeholder='Вес'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='price'
							value={newProductData.price}
							onChange={e =>
								setNewProductData({
									...newProductData,
									price: e.target.value,
								})
							}
							placeholder='Цена, пример: 2000'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='discount'
							value={newProductData.discount}
							onChange={e =>
								setNewProductData({
									...newProductData,
									discount: e.target.value,
								})
							}
							placeholder='Скидка, пример: 150'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1  bg-slate-700'
						/>
						<input
							type='text'
							name='imagePath'
							value={newProductData.imagePath}
							onChange={e =>
								setNewProductData({
									...newProductData,
									imagePath: e.target.value,
								})
							}
							placeholder='Путь к картинке, ссылка'
							className='block w-full border-gray-300 rounded-md shadow-sm mt-1 bg-slate-700'
						/>
						<input
							type='checkbox'
							name='isStopList'
							checked={newProductData.isStopList}
							onChange={e =>
								setNewProductData({
									...newProductData,
									isStopList: e.target.checked,
								})
							}
							className='mt-2'
						/>
						<label htmlFor='isStopList'>Продукт в стоп-листе</label>
						<input
							type='checkbox'
							name='isStopList'
							checked={newProductData.isAvailable}
							onChange={e =>
								setNewProductData({
									...newProductData,
									isAvailable: e.target.checked,
								})
							}
							className='mt-2'
						/>
						<label htmlFor='isStopList'>Продукт в наличии</label>
						<button
							onClick={handleCreateProduct}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
						>
							Создать
						</button>
						<button
							onClick={handleCloseCreateModal}
							className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2'
						>
							Отмена
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
export default AdminProducts
