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
					<strong>Телефоны:</strong>{' '}
					<a
						href={`tel:${phone}`} // Добавляем атрибут tel
						className='text-blue-600 underline'
					>
						{phone}
					</a>
				</p>
				<p className={styles.email}>
					<strong>Электронная почта:</strong>{' '}
					<a
						href={`mailto:grilmix@yandex.ru`}
						className='text-blue-600 underline'
					>
						grilmix@yandex.ru
					</a>
				</p>

				<p className={styles.orderHours}>
					<strong>Заказы принимаются:</strong> с 10:00 до {maxDeliveryTime}
				</p>
				<div className='bg-white shadow-lg rounded-lg p-6 max-w-md'>
					<p className='text-lg font-semibold text-gray-800 mb-2'>
						Наименование:{' '}
						<span className='font-bold'>
							ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ДАШТАМИРОВ СЕРГЕЙ АРАМОВИЧ
						</span>
					</p>
					<p className='text-gray-600'>
						ИНН: <span className='font-bold'>615400254587 </span>
					</p>
					<p className='text-gray-600'>
						ОГРНИП: <span className='font-bold'>323619600249920</span>
					</p>
				</div>
			</div>
			<HomeYandexMap link={link} />
		</div>
	)
}

export default Contacts
