import Footer from '../components/Footer'
import Header from '../components/Header'
import HomeCategory from '../components/HomeCategory'
import HomeEvents from '../components/HomeEvents'
import HomeYandexMap from '../components/HomeYandexMap'

const FoodCourt = () => {
	return (
		<div className='foodcourt'>
			<Header logo={'Гриль-Миксер'} shopId={'1'} shopTag={'foodcourt'} />
			<HomeEvents shopId={1} />
			<HomeCategory shopId={1} />
			<HomeYandexMap link='https://yandex.ru/map-widget/v1/org/gril_mikser/5282682587/?ll=38.884448%2C47.223400&z=17' />
			{/* <CookieNotification /> */}
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodCourt
