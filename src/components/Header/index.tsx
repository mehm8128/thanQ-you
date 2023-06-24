import Notification from '@/components/Notification'
import Teas from '@/components/Teas'

import { TeaWithUnread } from '@/model/tea'

import { styles } from './style.css'

export default function Header({
	unreads,
	userId,
}: {
	unreads: TeaWithUnread[]
	userId?: string
}) {
	return (
		<div className={styles.header}>
			<div className={styles.teas}>
				<Teas userId={userId} />
			</div>
			<div className={styles.notification}>
				<Notification unreads={unreads} />
			</div>
		</div>
	)
}
