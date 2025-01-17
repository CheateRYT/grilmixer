import About from '../components/About'
import Footer from '../components/Footer'
import Header from '../components/Header'

const FoodcourtAbout = () => {
	document.title = 'Гриль-МикСер'
	return (
		<div className='foodcourt'>
			<Header shopId='1' logo='Гриль-МикСер' shopTag='foodcourt' />
			<About />
			<Footer
				shopTag={'foodcourt'}
				reviewLink='https://yandex.ru/maps/org/gril_mikser/5282682587/reviews/?ll=38.884448%2C47.223400&z=17'
			/>
		</div>
	)
}

export default FoodcourtAbout
