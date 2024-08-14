import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductList from '../components/ProductList'

const FoodcourtCategory = () => {
	const { name } = useParams() // Используем useParams для получения параметра name

	return (
		<div className='foodcourt'>
			<Header logo='Гриль-МикСер' shopId='1' shopTag={'foodcourt'} />
			<ProductList categoryTag={name} shopId='1' />
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtCategory
