import styles from './DeliveryRules.module.css' // Импортируем CSS модули
import HomeYandexMap from './HomeYandexMap'

const DeliveryRules = ({ shopName }: { shopName: string }) => {
	return (
		<div>
			<div className={styles.deliveryRulesContainer}>
				<h1 className={styles.title}>Условия доставки</h1>
				<h2 className={styles.subtitle}>Доставка и оплата</h2>
				<p className={styles.workingHours}>
					<strong>Часы работы доставки:</strong> с 10:00 до 21:30 (Заказы на
					самовывоз принимаются с 10:00 до 21:30)
				</p>
				<h3 className={styles.deliveryHeader}>ДОСТАВКА</h3>
				<p className={styles.deliveryCost}>
					<strong>Стоимость доставки курьером:</strong> 300 ₽
				</p>
				<h3 className={styles.paymentHeader}>Способы доставки и оплаты</h3>
				<ul className={styles.deliveryMethods}>
					<li className={styles.courier}>Доставка курьером</li>
					<li>Безналичная оплата: Юkassa, ЮMoney , Банковская карта</li>
					<li className={styles.pickup}>Самовывоз</li>
					<li>Безналичная оплата: Юkassa, ЮMoney , Банковская карта</li>
					<li>Оплата наличными</li>
				</ul>
				<p className={styles.pickupInfo}>
					Примерное время приготовления и доставки 1 час.
				</p>
				<p className={styles.pickupInfo}>
					Вы можете получить заказ в пункте самовывоза «{shopName}».
				</p>
			</div>
			<HomeYandexMap link='https://yandex.ru/map-widget/v1/org/gril_mikser/5282682587/?ll=38.884448%2C47.223400&z=17' />
		</div>
	)
}

export default DeliveryRules
