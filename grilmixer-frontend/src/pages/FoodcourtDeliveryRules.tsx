import DeliveryRules from '../components/DeliveryRules'
import Footer from '../components/Footer'
import Header from '../components/Header'

const FoodcourtDeliveryRules = () => {
	document.title = 'Гриль-МикСер'
	return (
		<div className='foodcourt'>
			<Header shopId='1' logo='Гриль-МикСер' shopTag='foodcourt' />
			<DeliveryRules
				shopName='Гриль-МикСер'
				link='https://yandex.ru/map-widget/v1/org/gril_mikser/5282682587/?ll=38.884448%2C47.223400&z=17'
				maxDeliveryTime='01:30'
			/>
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtDeliveryRules
