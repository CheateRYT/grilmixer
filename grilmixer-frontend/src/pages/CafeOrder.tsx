import Footer from '../components/Footer'
import Header from '../components/Header'
import Order from '../components/Order'

const CafeOrder = () => {
	document.title = 'Фарш'
	return (
		<div className='foodcourt'>
			<Header logo={'Фарш'} shopId={'2'} shopTag={'cafe'} />
			<Order shopName='Фарш' shopId='2' shopTag='cafe' />
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeOrder
