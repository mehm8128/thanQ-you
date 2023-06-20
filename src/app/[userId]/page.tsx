import { styles } from './style.css'

export default function UserTea({ params: { userId } }: { params: { userId: string } }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.teas}></div>
				<div className={styles.notification}></div>
			</div>
			<div className={styles.tea}>
				<div></div>
				<div className={styles.form}></div>
			</div>
		</div>
	)
}
