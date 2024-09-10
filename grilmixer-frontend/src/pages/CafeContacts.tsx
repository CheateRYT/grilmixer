import Contacts from '../components/Contacts'
import Footer from '../components/Footer'
import Header from '../components/Header'

const CafeContacts = () => {
	document.title = 'Фарш'
	return (
		<div className='foodcourt'>
			<Header shopId='2' logo='Фарш' shopTag='cafe' />
			<Contacts phone='8 (929) 820-74-74' />
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeContacts
