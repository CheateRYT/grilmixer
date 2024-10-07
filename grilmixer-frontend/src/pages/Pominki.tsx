import { useNavigate } from 'react-router-dom'
import HomeYandexMap from '../components/HomeYandexMap'
import styles from './Pominki.module.css'

const Pominki = () => {
	const navigate = useNavigate()
	const handleClickTitle = () => {
		navigate('/')
	}

	const dishes = {
		'Меню Стандарт': [
			{ name: 'Лапша', weight: '300 г', price: '150 руб' },
			{ name: 'Борщ', weight: '300 г', price: '150 руб' },
			{ name: 'Люля-кебаб говяжье', weight: '100 г', price: '100 руб' },
			{ name: 'Пюре', weight: '200 г', price: '100 руб' },
			{ name: 'Гуляш', weight: '100 г', price: '170 руб' },
			{ name: 'Нарезка "Гастрономическая"', weight: '40 г', price: '50 руб' },
			{ name: 'Овощная нарезка', weight: '60 г', price: '40 руб' },
			{ name: 'Селёдка', weight: '40 г', price: '40 руб' },
			{ name: 'Салат "Оливье"', weight: '50 г', price: '50 руб' },
			{ name: 'Соленья', weight: '50 г', price: '50 руб' },
			{ name: 'Булочка Поминальная', weight: '100 г', price: '50 руб' },
			{ name: 'Компот', weight: '200 г', price: '50 руб' },
			{ name: 'Хлеб', weight: '1 кусок', price: '3 руб' },
		],
		Дополнительное: [
			{ name: 'Рыба в кляре', weight: '100 г', price: '150 руб' },
			{ name: 'Бёдра запечённые', weight: '100 г', price: '100 руб' },
			{ name: 'Винегрет', weight: '300 г', price: '300 руб' },
			{ name: 'Салат с капустой', weight: '300 г', price: '150 руб' },
			{ name: 'Блинчики с мясом', weight: '100 г', price: '100 руб' },
			{ name: 'Рыбные котлеты', weight: '100 г', price: '130 руб' },
			{ name: 'Котлеты говяжьи', weight: '100 г', price: '100 руб' },
			{ name: 'Колево', weight: '300 г', price: '300 руб' },
		],
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title} onClick={handleClickTitle}>
					Поминальное меню
				</h1>
			</header>
			<section className={styles.gallery}>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
					<img
						src='/pominki/table1.jpg'
						alt='Стол'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/pominki/table2.jpg'
						alt='Зона'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/pominki/room1.jpg'
						alt='Блюда 2'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/pominki/table3.jpg'
						alt='Блюда'
						className='w-full h-auto rounded-lg'
					/>
					<img
						src='/pominki/table4.jpg'
						alt='Стол 2'
						className='w-full h-auto rounded-lg'
					/>
				</div>
			</section>
			<section className={styles.menu}>
				<h2 className={styles.menuTitle}>Меню</h2>
				{Object.entries(dishes).map(([category, items]) => (
					<div key={category} className={styles.category}>
						<h3 className={styles.categoryTitle}>{category}</h3>
						<div className={styles.cardContainer}>
							{items.map((dish, index) => (
								<div key={index} className={styles.card}>
									<h4>{dish.name}</h4>
									<p>Вес: {dish.weight}</p>
									<p>Цена: {dish.price}</p>
								</div>
							))}
						</div>
					</div>
				))}
				<h3 className={styles.moreFood}>Больше блюд узнавайте по телефону.</h3>
			</section>
			<section className={styles.contact}>
				<h2>Контактная информация</h2>
				<p>
					Телефон: <a href='tel:+79298207474'>8 (929) 820-74-74</a>
				</p>
				<p>Адрес: Транспортная ул., 46</p>
				<p>Время работы: с 10:00 до 00:00</p>
			</section>
			<section className={styles.map}>
				<HomeYandexMap link='https://yandex.ru/map-widget/v1/org/farsh/190773496899/?ll=38.884448%2C47.223400&z=17' />
			</section>
		</div>
	)
}

export default Pominki
