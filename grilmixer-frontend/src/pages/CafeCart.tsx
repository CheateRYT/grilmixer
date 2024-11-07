// @ts-nocheck
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Header from '../components/Header'

const CafeCart = () => {
	document.title = 'Фарш'
	return (
		<div className='foodcourt'>
			<Header logo={'Фарш'} shopId={'2'} shopTag={'cafe'} />
			<Cart
				shopId='2'
				isDeliveryPrice={false}
				shopTag={'cafe'}
				title='Корзина'
			/>
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeCart
