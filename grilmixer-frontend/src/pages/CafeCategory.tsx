import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductList from '../components/ProductList'

const CafeCategory = () => {
	document.title = 'Фарш'
	const { name } = useParams()
	return (
		<div className='foodcourt'>
			<Header logo='Фарш' shopId='2' shopTag={'cafe'} />
			<ProductList categoryTag={name} shopId='2' />
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeCategory
