import { Skeleton } from '@mui/material'
import { useState } from 'react'
import styles from './HomeYandexMap.module.css'

const HomeYandexMap = ({ link }: { link: string }) => {
	const [loading, setLoading] = useState<boolean>(true)

	const handleLoad = () => {
		setLoading(false)
	}

	return (
		<div>
			{loading && (
				<div className={styles.map}>
					<Skeleton
						sx={{ bgcolor: 'grey.900' }}
						height={350}
						variant='rounded'
						width={560}
					/>
				</div>
			)}
			<div
				className={styles.map}
				style={{ display: loading ? 'none' : 'block' }}
			>
				<iframe src={link} width='100%' height='100%' onLoad={handleLoad} />
			</div>
		</div>
	)
}

export default HomeYandexMap
