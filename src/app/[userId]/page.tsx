import Notification from '@/components/Notification'
import TeaForm from '@/components/TeaForm'
import Teas from '@/components/Teas'

import { styles } from './style.css'

export default function UserTea({
	params: { userId },
}: {
	params: { userId: string }
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.teas}>
					<Teas />
				</div>
				<div className={styles.notification}>
					<Notification />
				</div>
			</div>
			<div className={styles.tea}>
				<div></div>
				<div className={styles.form}>
					<TeaForm />
				</div>
			</div>
		</div>
	)
}
