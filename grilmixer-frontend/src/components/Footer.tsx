import { useNavigate } from 'react-router-dom' // Импортируем useNavigate из react-router-dom
import styles from './Footer.module.css'

const Footer = ({ reviewLink }: { reviewLink: string }) => {
	const navigate = useNavigate()

	const handleNavigateReviewLink = () => {
		window.open(reviewLink, '_blank')
	}

	return (
		<div className={styles.footer}>
			<div>
				<div className={styles.linkContainer}>
					<span
						onClick={() => navigate(`deliveryRules`)}
						className={styles.link}
					>
						Условия доставки
					</span>
					<span onClick={handleNavigateReviewLink} className={styles.link}>
						Отзывы о нас
					</span>
					<span onClick={() => navigate('contacts')} className={styles.link}>
						Контакты
					</span>
					<span onClick={() => navigate('about')} className={styles.link}>
						О нас
					</span>
				</div>
			</div>
			{/* Центральная часть с текстом и иконками */}
			<div className={styles.footerContent}>
				<div>Мы принимаем:</div>
				<div className={styles.footerIcons}>
					<img
						src='./../../public/img/mastercard.png'
						alt='MasterCard'
						className={styles.icon}
					/>
					<img
						src='./../../public/img/visa.png'
						alt='Visa'
						className={styles.icon}
					/>
					<img
						src='./../../public/img/mir.png'
						alt='Мир'
						className={styles.icon}
					/>
					<img
						src='./../../public/img/yandexmoney.png'
						alt='ЮMoney'
						className={styles.icon}
					/>
				</div>
			</div>
			{/* Правая часть с иконкой ВКонтакте */}
			<div className={styles.social}>
				<p className={styles.socialTitle}>Мы в соц сетях:</p>
				<a
					className={styles.vkIcon}
					href='https://vk.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					<svg fill='#ACACAC' height='36' width='36' viewBox='0 0 36 36'>
						<path d='M18.9858 23.9738C11.4767 23.9738 7.19177 19.4804 7 12H10.7636C10.8894 17.4926 13.6641 19.8152 15.8575 20.2964V12H19.4053V16.7341C21.5748 16.5301 23.8521 14.3749 24.6192 12.0262H28.179C27.889 13.2573 27.3108 14.423 26.4806 15.45C25.6505 16.4771 24.5863 17.3434 23.3547 17.9948C24.7289 18.5901 25.9427 19.4332 26.9158 20.4684C27.889 21.5036 28.5994 22.7074 29 24H25.1226C24.2836 21.7245 22.198 19.9616 19.4413 19.721V24L18.9858 23.9738Z' />
					</svg>
				</a>
			</div>
		</div>
	)
}

export default Footer
