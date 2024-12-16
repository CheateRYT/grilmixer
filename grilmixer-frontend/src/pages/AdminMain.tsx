import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

interface AdminMainProps {
	refreshFunction?: () => void // Необязательный пропс для функции обновления
}

const AdminMain: React.FC<AdminMainProps> = ({ refreshFunction }) => {
	const navigate = useNavigate()

	useEffect(() => {
		const socket = io('https://грильмиксер.рф:4200', {
			auth: {
				token: Cookies.get('admin-token'),
			},
		})

		const paymentSuccessSound = new Audio('/paymentSuccessSound.mp3')

		socket.on('orderPaymentSuccess', (msg: { content: string }) => {
			paymentSuccessSound.play()
			window.location.reload()
			alert('Клиентом оплачен заказ с номером ' + msg.content)
		})

		const intervalId = setInterval(() => {
			if (refreshFunction) {
				refreshFunction() // Вызываем переданную функцию, если она существует
			}
		}, 30000)

		return () => {
			clearInterval(intervalId)
			socket.disconnect()
		}
	}, [refreshFunction])

	const handleComponentClick = (component: string) => {
		navigate('/admin/' + component)
	}

	return (
		<div className='flex items-center justify-around bg-slate-800'>
			<div className='flex flex-wrap justify-center items-center pt-4 bg-slate-800 w-full md:w-1/2 gap-5'>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold mr-4'
					onClick={() => handleComponentClick('events')}
				>
					Новости
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
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold mr-4'
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
					onClick={() => handleComponentClick('categoryDiscount')}
				>
					Скидка на категорию
				</button>
				<button
					className='bg-blue-500 text-white rounded-full py-2 px-4 font-bold'
					onClick={() => handleComponentClick('revenue')}
				>
					Выручка
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
