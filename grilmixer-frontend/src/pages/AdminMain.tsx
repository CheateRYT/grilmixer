import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { fetchUnreadNotifications } from '../utils/fetchUnreadNotifications'

const AdminMain = () => {
	const [unreadNotifications, setUnreadNotifications] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		fetchUnreadNotifications(setUnreadNotifications)
		const socket = io('http://87.117.25.141:4200', {
			auth: {
				token: Cookies.get('admin-token'),
			},
		})

		const paymentSuccessSound = new Audio(
			'../../public/paymentSuccessSound.mp3'
		) // Укажите путь к вашему звуку для успешной оплаты

		socket.on('orderPaymentSuccess', msg => {
			paymentSuccessSound.play() // Воспроизведение звука успешной оплаты
			window.location.reload()
			alert('Клиентом оплачен заказ с номером ' + msg.content)
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const handleComponentClick = component => {
		navigate('/admin/' + component)
	}

	return (
		<div>
			<div
				className='flex justify-center items-center  
			pt-4
			pb-4
			bg-slate-700 gap-5
			'
			>
				{/* <button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold mr-4'
					onClick={() => handleComponentClick('notifications')}
				>
					Уведомления
					{unreadNotifications > 0 && (
						<span className='bg-red-500 text-white rounded-full px-2'>
							{unreadNotifications}
						</span>
					)}
				</button> */}
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold mr-4'
					onClick={() => handleComponentClick('events')}
				>
					Акции
				</button>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold mr-4'
					onClick={() => handleComponentClick('products')}
				>
					Товары
				</button>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold mr-4'
					onClick={() => handleComponentClick('extraIngredients')}
				>
					Доп.Ингредиенты
				</button>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold'
					onClick={() => handleComponentClick('orders')}
				>
					История
				</button>
				<button
					className='bg-red-500 text-white rounded-full py-2 px-4 font-bold'
					onClick={() => handleComponentClick('paymentOrders')}
				>
					Новые Оплаченные заказы
				</button>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold'
					onClick={() => handleComponentClick('categories')}
				>
					Категории
				</button>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold'
					onClick={() => handleComponentClick('settings')}
				>
					Настройки
				</button>
			</div>
		</div>
	)
}

export default AdminMain
