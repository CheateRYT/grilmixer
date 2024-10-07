import { useNavigate } from 'react-router-dom'
import HomeYandexMap from '../components/HomeYandexMap'
import styles from './Banquet.module.css'

const Banquet = () => {
	const navigate = useNavigate()
	const handleClickTitle = () => {
		navigate('/')
	}

	const dishes = {
		'Холодные закуски': [
			{ name: 'Асс. мясное', weight: '400 г', price: '950 руб' },
			{ name: 'Асс. овощное', weight: '400 г', price: '550 руб' },
			{ name: 'Асс. сырное', weight: '400 г', price: '1200 руб' },
			{ name: 'Асс. фруктовое', weight: '400 г', price: '600 руб' },
			{ name: 'Асс. соленья', weight: '500 г', price: '550 руб' },
			{ name: 'Асс. рыбное', weight: '300 г', price: '1400 руб' },
			{ name: 'Гастрономия', weight: '300 г', price: '1300 руб' },
			{ name: 'Брынза', weight: '100 г', price: '200 руб' },
			{ name: 'Маринованные грибы', weight: '150 г', price: '300 руб' },
			{ name: 'Зелень', weight: '100 г', price: '200 руб' },
			{ name: 'Оливки, маслины', weight: '100 г', price: '200 руб' },
			{ name: 'Лимон', weight: '100 г', price: '80 руб' },
		],

		'Сеты роллы': [
			{ name: 'Сет Филадельфия (32 шт)', weight: '1300 г', price: '1800 руб' },
			{ name: 'Сет Калифорния (32 шт)', weight: '1100 г', price: '1500 руб' },
			{ name: 'Сет ГрильМикСер (32 шт)', weight: '1250 г', price: '1600 руб' },
			{ name: 'Сет Популярный (40 шт)', weight: '1550 г', price: '2000 руб' },
		],
		'Горячие закуски': [
			{ name: 'Запечённые мидии', weight: '250 г', price: '600 руб' },
			{ name: 'Тарталетки', weight: '20 г', price: '60-100 руб' },
			{ name: 'Профитроли', weight: '20 г', price: '60-100 руб' },
			{ name: 'Сырные палочки', weight: '200 г', price: '300 руб' },
			{
				name: 'Креветки в сливочном соусе ',
				weight: '250 г',
				price: '700 руб',
			},

			{
				name: 'Жульен грибной с курицей',
				weight: '150 г',
				price: '250-380 руб',
			},
			{ name: 'Рулеты с баклажаном', weight: '100 г', price: '150 руб' },
		],
		Салаты: [
			{ name: 'МикСер', weight: '250 г', price: '500 руб' },
			{ name: 'Лукошко', weight: '250 г', price: '500 руб' },
			{ name: 'Салат с сёмгой', weight: '250 г', price: '670 руб' },
			{ name: 'Язык с орехами', weight: '250 г', price: '550 руб' },
			{ name: 'Мясная горка', weight: '250 г', price: '640 руб' },
			{ name: 'Цезарь с курицей', weight: '250 г', price: '450 руб' },
			{ name: 'Цезарь с сёмгой', weight: '250 г', price: '620 руб' },
			{ name: 'Цезарь с креветкой', weight: '250 г', price: '620 руб' },
			{ name: 'Цезарь царский', weight: '250 г', price: '620 руб' },
			{ name: 'Салат морской', weight: '250 г', price: '480 руб' },
			{ name: 'Салат греческий', weight: '250 г', price: '420 руб' },
		],
		Гарниры: [
			{ name: 'Картофель фри', weight: '100 г', price: '200 руб' },
			{ name: 'Картофель по-деревенски', weight: '100 г', price: '200 руб' },
		],
		Шашлык: [
			{
				name: 'Шашлык из свинины (домашняя)',
				weight: '1 кг',
				price: '2000 руб',
			},
			{
				name: 'Шашлык из свинины (фермерская)',
				weight: '1 кг',
				price: '1600 руб',
			},
			{
				name: 'Шашлык из говядины',
				weight: '1 кг',
				price: '4200 руб',
			},
			{
				name: 'Шашлык из курицы',
				weight: '1 кг',
				price: '1400 руб',
			},
			{
				name: 'Шашлык из печени со свиной сеткой ',
				weight: '1 кг',
				price: '1800 руб',
			},
			{
				name: 'Шашлык из Сёмги',
				weight: '1 кг',
				price: '4500 руб',
			},
			{
				name: 'Люля-кебаб свино-говяжий',
				weight: '1 кг',
				price: '1400 руб',
			},
			{
				name: 'Люля-кебаб куриный',
				weight: '1 кг',
				price: '1200 руб',
			},
			{
				name: 'Баранина (мякоть)',
				weight: '1 кг',
				price: '4200 руб',
			},
			{
				name: 'Картофель с беконом на шампуре',
				weight: '1 кг',
				price: '400 руб',
			},
			{
				name: 'Грибы шампиньоны на шампуре',
				weight: '1 кг',
				price: '1000 руб',
			},
			{
				name: 'Икра на мангале',
				weight: '1 кг',
				price: '1500 руб',
			},
			{
				name: 'Овощи на мангале',
				weight: '1 кг',
				price: '1000 руб',
			},
			{
				name: 'Лепёшка',
				weight: '1 шт',
				price: '100 руб',
			},
			{
				name: 'Лаваш',
				weight: '1 шт',
				price: '50 руб',
			},
		],
		Соусы: [
			{
				name: 'Соус красный / Соус белый',
				weight: '100 г',
				price: '50/100 руб',
			},
			{ name: 'Лук маринованный', weight: '150 г', price: '30 руб' },
			{ name: 'Компот', weight: '1 л', price: '300 руб' },
		],
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title} onClick={handleClickTitle}>
					Банкетное меню
				</h1>
			</header>
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

export default Banquet
