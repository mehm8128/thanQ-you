import { styles } from '@/app/style.css'

import Notification from '@/components/Notification'
import Teas from '@/components/Teas'
import UserSelect from '@/components/UserSelect'

import { getApiOrigin } from '@/libs/env'
import { User } from '@/model/user'

const useUsers = async (): Promise<User[]> => {
	const res = await fetch(`${getApiOrigin()}/api/users`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

export default async function Home() {
	const users = await useUsers()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.teas}>
					<Teas />
					<UserSelect users={users} />
				</div>
				<div className={styles.notification}>
					<Notification />
				</div>
			</div>
			<div className={styles.tea}></div>
		</div>
	)
}
