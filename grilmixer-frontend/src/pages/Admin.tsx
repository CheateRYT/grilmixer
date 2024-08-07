import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendApiUrl } from '../utils/BackendUrl'
const Admin = () => {
	const [formData, setFormData] = useState({
		login: '',
		password: '',
	})

	useEffect(() => {
		if (Cookies.get('admin-token')) {
			navigate('/admin/main')
		}
	}, [])

	const navigate = useNavigate()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault()

		try {
			const response: AxiosResponse = await axios.post(
				`${backendApiUrl}admin/login`,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (response.status === 201) {
				Cookies.set('admin-token', await response.data.token) // Handle the response data here
				navigate('/admin/main')
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<form className='p-8 max-w-md mx-auto bg-black items-center align-middle hea rounded-lg shadow-lg'>
			<h3 className='text-center font-bold text-xl mb-6 '>
				Вход в админ панель
			</h3>
			<div className='mb-6'>
				<input
					className='form-control item border rounded-lg mb-4 px-4 py-2'
					type='text'
					name='login'
					id='login'
					placeholder='Логин'
					required
					value={formData.login}
					onChange={handleChange}
				/>
			</div>
			<div className='mb-6'>
				<input
					type='password'
					name='password'
					id='password'
					placeholder='Пароль'
					required
					value={formData.password}
					onChange={handleChange}
					className='form-control item border rounded-lg mb-4 px-4 py-2'
				/>
			</div>
			<div className='mb-6'>
				<button
					className='btn btn-primary btn-block create-account bg-blue-500 text-white rounded-full py-2 px-4 font-bold'
					type='submit'
					onClick={e => handleSubmit(e)}
				>
					Вход в аккаунт
				</button>
			</div>
		</form>
	)
}

export default Admin
