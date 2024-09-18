import styles from './Contacts.module.css' // Импортируем CSS модули
import HomeYandexMap from './HomeYandexMap'

const Contacts = ({ phone, link }: { phone: string; link: string }) => {
	return (
		<div>
			<div className={styles.contactsContainer}>
				<h1 className={styles.title}>Контакты</h1>
				<p className={styles.address}>
					<strong>Адрес:</strong> г. Таганрог, ул Транспортная, д. 46
				</p>
				<p className={styles.phone}>
					<strong>Телефоны:</strong> {phone}
				</p>
				<p className={styles.orderHours}>
					<strong>Заказы принимаются:</strong> с 10:00 до 01:30
				</p>
			</div>
			<HomeYandexMap link={link} />
		</div>
	)
}

export default Contacts
