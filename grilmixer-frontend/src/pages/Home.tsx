import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import CookieNotification from '../components/CookieNotification'
import styles from './Home.module.css'

const Home = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Симуляция загрузки данных
		setTimeout(() => {
			setIsLoading(false)
		}, 100) // Установите время задержки в миллисекундах
	}, [])

	const handleNavigate = path => {
		navigate(path)
	}

	return (
		<div className={styles.containerHome}>
			{isLoading ? (
				<div className='ringloader'>
					<RingLoader color='#FF0000' loading={isLoading} size={150} />
				</div>
			) : (
				<main className={styles.main}>
					<header className={styles.header}>
						<h1 className={styles.header__logo}>Гриль-МикСер</h1>
						<div className={styles.about}>
							<p className={styles.about__address}>Транспортная ул., 46</p>
							<p className={styles.about__phone}>79000000000</p>
						</div>
					</header>
					<div className={styles.buttons}>
						<p
							onClick={() => handleNavigate('foodcourt')}
							className={styles.button}
						>
							ФудКорт
						</p>
						<p onClick={() => handleNavigate('cafe')} className={styles.button}>
							Кафе
						</p>
						<p
							onClick={() => handleNavigate('banquet')}
							className={styles.button}
						>
							Банкет
						</p>
						<p
							onClick={() => handleNavigate('pominki')}
							className={styles.button}
						>
							Поминки
						</p>
					</div>
					<CookieNotification />
				</main>
			)}
		</div>
	)
}

export default Home
