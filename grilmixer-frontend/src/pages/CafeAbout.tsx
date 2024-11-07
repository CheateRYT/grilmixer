import About from '../components/About'
import Footer from '../components/Footer'
import Header from '../components/Header'

const CafeAbout = () => {
	document.title = 'Фарш'
	return (
		<div className='foodcourt'>
			<Header shopId='2' logo='Фарш' shopTag='cafe' />
			<About />
			<Footer
				shopTag={'cafe'}
				reviewLink='https://yandex.ru/maps-reviews-widget/190773496899?comments'
			/>
		</div>
	)
}

export default CafeAbout
