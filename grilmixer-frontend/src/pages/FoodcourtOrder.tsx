import Footer from '../components/Footer'
import Header from '../components/Header'
import Order from '../components/Order'

const FoodcourtOrder = () => {
	return (
		<div className='foodcourt'>
			<Header logo={'Гриль-МикСер'} shopId={'1'} shopTag={'foodcourt'} />
			<Order shopId='1' shopTag='foodcourt' />
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtOrder
