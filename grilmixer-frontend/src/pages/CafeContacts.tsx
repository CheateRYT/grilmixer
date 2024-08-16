import Contacts from '../components/Contacts'
import Footer from '../components/Footer'
import Header from '../components/Header'

const CafeContacts = () => {
	return (
		<div className='foodcourt'>
			<Header shopId='2' logo='Фарш' shopTag='cafe' />
			<Contacts phone='+7 (900) 000-00-00' />
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeContacts
