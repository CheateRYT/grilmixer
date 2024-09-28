import styles from './Contacts.module.css' // Импортируем CSS модули
import HomeYandexMap from './HomeYandexMap'

const Contacts = ({
	phone,
	link,
	maxDeliveryTime,
}: {
	phone: string
	link: string
	maxDeliveryTime: string
}) => {
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
					<strong>Заказы принимаются:</strong> с 10:00 до {maxDeliveryTime}
				</p>
			</div>
			<HomeYandexMap link={link} />
		</div>
	)
}

export default Contacts
