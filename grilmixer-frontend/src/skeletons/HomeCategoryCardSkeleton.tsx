import { Skeleton } from '@mui/material'
import styles from './HomeCategoryCardSkeleton.module.css'
const HomeCategoryCardSkeleton = () => {
	return (
		<div className={styles.card}>
			<Skeleton
				sx={{ bgcolor: 'grey.900' }}
				variant='rounded'
				width={206}
				height={206}
			/>
		</div>
	)
}

export default HomeCategoryCardSkeleton
