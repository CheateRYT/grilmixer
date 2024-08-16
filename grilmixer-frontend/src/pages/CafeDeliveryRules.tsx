import DeliveryRules from '../components/DeliveryRules'
import Footer from '../components/Footer'
import Header from '../components/Header'

const CafeDeliveryRules = () => {
	return (
		<div className='foodcourt'>
			<Header shopId='2' logo='Фарш' shopTag='cafe' />
			<DeliveryRules shopName='Фарш' />
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeDeliveryRules
