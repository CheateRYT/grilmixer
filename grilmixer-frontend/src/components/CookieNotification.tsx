import CloseIcon from '@mui/icons-material/Close' // Импортируем иконку закрытия
import { Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import styles from './CookieNotification.module.css' // Импортируем стили

const CookieNotification: React.FC = () => {
	const [open, setOpen] = React.useState(true) // Состояние для управления видимостью уведомления

	const handleClose = () => {
		setOpen(false) // Закрываем уведомление
	}

	return (
		<Snackbar
			open={open} // Устанавливаем состояние для контроля видимости
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			message={
				<div className={styles.notification}>
					Мы используем Cookies, сервисы Google Analytics и Яндекс.Метрика.
					Продолжая пользоваться сайтом, Вы принимаете условия обработки
					персональных данных.
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose} // Обработчик закрытия
						style={{ marginLeft: 'auto' }} // Сдвигаем кнопку вправо
					>
						<CloseIcon fontSize='small' style={{ color: 'white' }} />{' '}
						{/* Иконка закрытия */}
					</IconButton>
				</div>
			}
			ContentProps={{
				style: {
					backgroundColor: 'transparent', // Убираем фон, так как мы используем CSS для стилей
					color: 'red', // Цвет текста, если нужно
				},
			}}
		/>
	)
}

export default CookieNotification
