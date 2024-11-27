import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import AdminMain from './AdminMain'

const AdminRevenue = () => {
	const [revenueToday, setRevenueToday] = useState<string>('')
	const [revenueWeek, setRevenueWeek] = useState<string>('')
	const [revenueMonth, setRevenueMonth] = useState<string>('')
	const [totalRevenue, setTotalRevenue] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(true)

	const fetchRevenueData = async () => {
		const token = Cookies.get('admin-token')
		try {
			const todayResponse = await axios.get(
				`${backendApiUrl}admin/revenue/today`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const weekResponse = await axios.get(
				`${backendApiUrl}admin/revenue/week`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const monthResponse = await axios.get(
				`${backendApiUrl}admin/revenue/month`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const totalResponse = await axios.get(
				`${backendApiUrl}admin/revenue/total`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setRevenueToday(todayResponse.data)
			setRevenueWeek(weekResponse.data)
			setRevenueMonth(monthResponse.data)
			setTotalRevenue(totalResponse.data)
		} catch (error) {
			console.error('Ошибка при получении выручки:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchRevenueData()
	}, [])

	return (
		<div className='p-4 bg-slate-700'>
			<AdminMain />
			<h2 className='text-xl font-bold mb-4 text-white'>Выручка</h2>
			{loading ? (
				<p className='text-white'>Загрузка...</p>
			) : (
				<div className='space-y-4'>
					<div className='bg-gray-800 p-4 rounded-md'>
						<h3 className='text-lg font-bold text-white'>
							Выручка за сегодня:
						</h3>
						<p className='text-white'>{revenueToday || <p>Отсутствует</p>}</p>
					</div>
					<div className='bg-gray-800 p-4 rounded-md'>
						<h3 className='text-lg font-bold text-white'>Выручка за неделю:</h3>
						<p className='text-white'>{revenueWeek || <p>Отсутствует</p>}</p>
					</div>
					<div className='bg-gray-800 p-4 rounded-md'>
						<h3 className='text-lg font-bold text-white'>Выручка за месяц:</h3>
						<p className='text-white'>{revenueMonth || <p>Отсутствует</p>}</p>
					</div>
					<div className='bg-gray-800 p-4 rounded-md'>
						<h3 className='text-lg font-bold text-white'>
							Выручка за всё время:
						</h3>
						<p className='text-white'>{totalRevenue || <p>Отсутствует</p>}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default AdminRevenue
