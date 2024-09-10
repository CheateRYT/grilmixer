import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'

const FoodcourtCart = () => {
	document.title = 'Гриль-МикСер'
	return (
		<div className='foodcourt'>
			<Header logo={'Гриль-МикСер'} shopId={'1'} shopTag={'foodcourt'} />
			<Cart
				shopId='1'
				isDeliveryPrice={false}
				shopTag={'foodcourt'}
				title='Корзина'
			/>
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtCart
