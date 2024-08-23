import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminExtraIngredient = () => {
	interface ExtraIngredient {
		id: number
		shopId: number
		name: string
		price: string
		categoryTag: string
	}

	const [ExtraIngredients, setExtraIngredients] = useState<ExtraIngredient[]>(
		[]
	)
	const [showModal, setShowModal] = useState(false)
	const [selectedShopId, setSelectedShopId] = useState<number>(1) // Default shopId
	const [selectedCategoryTag, setSelectedCategoryTag] = useState<string>()
	const [newExtraIngredientData, setNewExtraIngredientData] = useState({
		shopId: 1, // Default shopId
		name: '',
		price: '',
		categoryTag: '',
	})
	const handleShopIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedShopId(parseInt(e.target.value))
	}
	const fetchExtraIngredients = async () => {
		try {
			const response = await axios.get<ExtraIngredient[]>(
				`${backendApiUrl}admin/extraIngredients/${selectedShopId}/${selectedCategoryTag}`
			)
			setExtraIngredients(response.data)
		} catch (error) {
			console.error('Ошибка при получении дополнительных ингридиентов :', error)
		}
	}

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const handleCreateExtraIngredient = async () => {
		try {
			const token = Cookies.get('admin-token')
			await axios.post(
				`${backendApiUrl}admin/extraIngredient`,
				newExtraIngredientData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setShowModal(false)
			window.location.reload()
		} catch (error) {
			console.error('Ошибка при создании дополнительного ингредиента:', error)
		}
	}
	const handleDeleteExtraIngredient = async (id: number) => {
		try {
			const token = Cookies.get('admin-token')
			await axios.delete(`${backendApiUrl}admin/extraIngredient/delete/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			setExtraIngredients(prevExtraIngredient =>
				prevExtraIngredient.filter(extraIngredient => extraIngredient.id !== id)
			)
		} catch (error) {
			console.error('Ошибка при удалении дополнительного ингредиента:', error)
		}
	}
	const handleSelectCategoryTag = async () => {
		await fetchExtraIngredients()
	}
	return (
		<div>
			<AdminMain />
			<div>
				<h2 className='text-xl font-bold mb-2'>Дополнительные ингредиенты:</h2>
				<button
					onClick={handleOpenModal}
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2'
				>
					Создать доп ингредиент
				</button>
				<p>Выбрать магазин</p>
				<select
					value={selectedShopId}
					onChange={handleShopIdChange}
					className='mb-4 px-4 py-2 rounded border'
				>
					<option value={1}>Гриль МикСер номер 1</option>
					<option value={2}>Фарш 2</option>
				</select>
				<p>Tag категории (Пример burgers, pizza)</p>
				<input
					className='mb-4 px-4 py-2 rounded border'
					type='text'
					onChange={e => setSelectedCategoryTag(e.target.value)}
				/>
				<button
					onClick={handleSelectCategoryTag}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-5'
				>
					Показать доп ингредиенты
				</button>
				<table className='min-w-full divide-y divide-gray-200 bg-black text-white'>
					<thead className='bg-gray-800'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер ингредиента
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Номер Магазина
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Название доп ингредиента
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Tag категории
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Цена
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
								Действие
							</th>
						</tr>
					</thead>
					<tbody className='bg-gray-900 divide-y divide-gray-200'>
						{ExtraIngredients.map(extraIngredient => (
							<tr key={extraIngredient.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{extraIngredient.id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{extraIngredient.shopId}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{extraIngredient.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{extraIngredient.categoryTag}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{extraIngredient.price}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() =>
											handleDeleteExtraIngredient(extraIngredient.id)
										}
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
							<h3 className='text-lg font-bold mb-2'>Создать доп ингредиент</h3>
							<input
								type='text'
								name='name'
								value={newExtraIngredientData.name}
								onChange={e =>
									setNewExtraIngredientData({
										...newExtraIngredientData,
										name: e.target.value,
									})
								}
								placeholder='Название доп ингредиента'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
							/>
							<select
								name='shopId'
								onChange={e =>
									setNewExtraIngredientData({
										...newExtraIngredientData,
										shopId: Number(e.target.value),
									})
								}
							>
								<option value='1'>Гриль МикСер номер 1</option>
								<option value='2'>Фарш номер 2</option>
							</select>
							<input
								type='text'
								name='categoryTag'
								value={newExtraIngredientData.categoryTag}
								onChange={e =>
									setNewExtraIngredientData({
										...newExtraIngredientData,
										categoryTag: e.target.value,
									})
								}
								placeholder='Tag категории (Пример burgers,pizza)'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
							/>
							<input
								type='text'
								name='price'
								value={newExtraIngredientData.price}
								onChange={e =>
									setNewExtraIngredientData({
										...newExtraIngredientData,
										price: e.target.value,
									})
								}
								placeholder='Цена'
								className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
							/>
							<button
								onClick={handleCreateExtraIngredient}
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

export default AdminExtraIngredient
