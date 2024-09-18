import { useNavigate } from 'react-router-dom'
import HomeYandexMap from '../components/HomeYandexMap'
import styles from './Banquet.module.css'

const Banquet = () => {
	const navigate = useNavigate()
	const handleClickTitle = () => {
		navigate('/')
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title} onClick={handleClickTitle}>
					Банкет
				</h1>
			</header>
			<section className={styles.menu}>
				<h2>Меню</h2>
				<ul className={styles.menuList}>
					<li>Блюдо 1</li>
					<li>Блюдо 2</li>
					<li>Блюдо 3</li>
					<li>Блюдо 4</li>
				</ul>
				<h3 className={styles.moreFood}>Больше блюд узнавайте по телефону.</h3>
			</section>
			<section className={styles.contact}>
				<h2>Контактная информация</h2>
				<p>
					Телефон: <a href='tel:+79298207474'>8 (929) 820-74-74</a>
				</p>
				<p>Адрес: Транспортная ул., 46</p>
				<p>Время работы: с 10:00 до 1:30</p>
			</section>
			<section className={styles.gallery}>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
					<img
						src='/banquet/table1.jpg'
						alt='Стол'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/banquet/room1.jpg'
						alt='Зона'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/banquet/food1.jpg'
						alt='Блюда'
						className='w-full h-auto rounded-lg'
					/>
					{/* Добавьте больше изображений, если необходимо */}
					<img
						src='/banquet/table2.jpg'
						alt='Стол 2'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/banquet/food2.jpg'
						alt='Блюда 2'
						className='w-full h-auto rounded-lg'
					/>
				</div>
			</section>
			<section className={styles.map}>
				<HomeYandexMap link='https://yandex.ru/map-widget/v1/org/farsh/190773496899/?ll=38.884448%2C47.223400&z=17' />
			</section>
		</div>
	)
}

export default Banquet
