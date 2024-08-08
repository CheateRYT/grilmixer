import { Box, IconButton, Skeleton, SvgIcon, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendApiUrl } from '../utils/BackendUrl'
import styles from './HomeEvents.module.css' // Импортируем стили

const HomeEvents = ({ shopId }: { shopId: number }) => {
	interface Event {
		id: number
		text: string
		imagePath: string
	}
	const [events, setEvents] = useState<Event[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [loading, setLoading] = useState(true) // Состояние загрузки

	useEffect(() => {
		setLoading(true) // У
		const fetchEvents = async () => {
			setLoading(true) // Устанавливаем состояние загрузки в true перед запросом
			try {
				const response = await axios.get(`${backendApiUrl}events/${shopId}`)
				setEvents(response.data)
			} catch (error) {
				console.error('Ошибка при получении событий:', error)
			} finally {
				setLoading(false) // Устанавливаем состояние загрузки в false после загрузки данных
			}
		}
		fetchEvents()
	}, [shopId])

	const handleNext = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % events.length)
	}
	const handlePrev = () => {
		setCurrentIndex(
			prevIndex => (prevIndex - 1 + events.length) % events.length
		)
	}
	const handleDotClick = (index: number) => {
		setCurrentIndex(index)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			handleNext()
		}, 10000) // 10 секунд
		return () => clearInterval(interval)
	}, [events.length])

	return (
		<Box className={styles.container}>
			{loading ? ( // Проверяем состояние загрузки
				<Skeleton
					sx={{ bgcolor: 'grey.900' }}
					height={350}
					variant='rounded'
					width={1800}
				/>
			) : events.length === 0 ? ( // Проверяем, есть ли события
				<Typography className={styles.noEvents}></Typography>
			) : (
				<>
					<img
						src={events[currentIndex].imagePath}
						alt={`Event ${events[currentIndex].id}`}
						className={styles.image}
					/>
					<Typography className={styles.text}>
						{events[currentIndex].text}
					</Typography>
					<IconButton
						onClick={handlePrev}
						className={`${styles.iconButton} ${styles.prevButton}`}
					>
						<SvgIcon />
					</IconButton>
					<IconButton
						onClick={handleNext}
						className={`${styles.iconButton} ${styles.nextButton}`}
					>
						<SvgIcon />
					</IconButton>
					<Box className={styles.dotContainer}>
						{events.map((_, index) => (
							<Box
								key={index}
								onClick={() => handleDotClick(index)}
								className={styles.dot}
								sx={{
									backgroundColor: currentIndex === index ? '#b20522' : 'white',
								}}
							/>
						))}
					</Box>
				</>
			)}
		</Box>
	)
}

export default HomeEvents
