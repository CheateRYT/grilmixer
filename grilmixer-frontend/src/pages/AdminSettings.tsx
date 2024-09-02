import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminSettings: React.FC = () => {
	const [password, setPassword] = useState('')
	const [lastPassword, setLastPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}
	const handleLastPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLastPassword(e.target.value)
	}
	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMessage('')
		setSuccessMessage('')

		if (password !== confirmPassword) {
			setErrorMessage('Пароли не совпадают')
			return
		}

		try {
			const token = Cookies.get('admin-token')
			await axios.post(
				`${backendApiUrl}admin/create-password`,
				{ password },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setSuccessMessage('Пароль успешно создан')
			setPassword('')
			setConfirmPassword('')
		} catch (error) {
			console.error('Ошибка при создании пароля:', error)
			setErrorMessage('Ошибка при создании пароля')
		}
	}

	return (
		<div className='p-4'>
			<AdminMain />
			<h2 className='text-xl font-bold mb-4'>
				Изменение пароля администратора
			</h2>
			{errorMessage && <div className='text-red-500 mb-2'>{errorMessage}</div>}
			{successMessage && (
				<div className='text-green-500 mb-2'>{successMessage}</div>
			)}
			<form
				onSubmit={handleSubmit}
				className='bg-gray-800 p-4 rounded shadow-lg text-white'
			>
				<label className='block mb-2'>
					Предыдущий пароль:
					<input
						type='password'
						value={lastPassword}
						onChange={handleLastPasswordChange}
						placeholder='Если пароля не было, оставьте пустую строку'
						className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
					/>
				</label>
				<label className='block mb-2'>
					Пароль:
					<input
						type='password'
						value={password}
						onChange={handlePasswordChange}
						className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
						required
					/>
				</label>
				<label className='block mb-2'>
					Подтверждение пароля:
					<input
						type='password'
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						className='block w-full border-gray-300 rounded-md shadow-sm mt-1'
						required
					/>
				</label>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
				>
					Изменитьь пароль
				</button>
			</form>
		</div>
	)
}

export default AdminSettings
