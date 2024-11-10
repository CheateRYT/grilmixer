import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import styles from './CookieNotification.module.css'

const CookieNotification: React.FC = () => {
	const [open, setOpen] = React.useState(true) // Состояние для управления видимостью уведомления

	const handleClose = () => {
		setOpen(false) // Закрываем уведомление
	}

	return (
		<>
			{open && (
				<div className={styles.notification}>
					<span>
						Мы используем Cookies, сервисы Google Analytics и Яндекс.Метрика.
						Продолжая пользоваться сайтом, Вы принимаете условия обработки
						персональных данных.
					</span>
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose} // Обработчик закрытия
						style={{ marginLeft: 'auto', color: 'white' }} // Сдвигаем кнопку вправо
					>
						<CloseIcon fontSize='small' />
					</IconButton>
				</div>
			)}
		</>
	)
}

export default CookieNotification
