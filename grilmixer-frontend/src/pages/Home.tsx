import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import CookieNotification from '../components/CookieNotification'
import styles from './Home.module.css'

const Home = () => {
	document.title = 'Гриль-МикСер'
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
						<h1 className={styles.header__logo}>Фарш</h1>
						<div className={styles.about}>
							<p className={styles.about__address}>Транспортная ул. 46</p>
							<p className={styles.about__phone}>8 (929) 820-74-74</p>
						</div>
					</header>
					<div className={styles.buttons}>
						<p
							onClick={() => handleNavigate('foodcourt')}
							className={styles.button}
						>
							ФудКорт Гриль-МикСер
						</p>
						<p onClick={() => handleNavigate('cafe')} className={styles.button}>
							Ресторан
						</p>
						<p
							onClick={() => handleNavigate('banquet')}
							className={styles.button}
						>
							Банкетное меню
						</p>
						<p
							onClick={() => handleNavigate('pominki')}
							className={styles.button}
						>
							Поминальное меню
						</p>
					</div>
					<CookieNotification />
				</main>
			)}
		</div>
	)
}

export default Home
