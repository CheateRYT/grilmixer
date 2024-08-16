import Footer from '../components/Footer'
import Header from '../components/Header'
import HomeCategory from '../components/HomeCategory'
import HomeEvents from '../components/HomeEvents'
import HomeYandexMap from '../components/HomeYandexMap'

const Cafe = () => {
	return (
		<div className='foodcourt'>
			<Header logo={'Фарш'} shopId={'2'} shopTag={'cafe'} />
			<HomeEvents shopId={2} />
			<HomeCategory shopId={2} />
			<HomeYandexMap link='https://yandex.ru/map-widget/v1/org/farsh/190773496899/?ll=38.884448%2C47.223400&z=17' />
			{/* <CookieNotification /> */}
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default Cafe
