import Contacts from '../components/Contacts'
import Footer from '../components/Footer'
import Header from '../components/Header'

const FoodcourtContacts = () => {
	return (
		<div className='foodcourt'>
			<Header shopId='1' logo='Гриль-МикСер' shopTag='foodcourt' />
			<Contacts phone='+7 (900) 000-00-00' />
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtContacts
