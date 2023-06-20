import { useRecoilValue } from 'recoil'

import { styles } from '@/app/style.css'

import Notification from '@/components/Notification'
import Teas from '@/components/Teas'
import UserSelect from '@/components/UserSelect'

import { getApiOrigin } from '@/libs/env'
import { Tea, TeaWithUnread } from '@/model/tea'
import { User } from '@/model/user'
import { meState } from '@/stores/me'

const useUsers = async (): Promise<User[]> => {
	const res = await fetch(`${getApiOrigin()}/api/users`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}
const useTeas = async (userId: string): Promise<Tea[]> => {
	const res = await fetch(`${getApiOrigin()}/api/teas/${userId}`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}
const useUnreads = async (): Promise<TeaWithUnread[]> => {
	const res = await fetch(`${getApiOrigin()}/api/users`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}
const calcTeas = (teas: Tea[]) => {
	//todo:
	console.log(teas)
	return [5, 5, 5, 3]
}

export default async function Home() {
	const me = useRecoilValue(meState)
	const users = await useUsers()
	const teas = await useTeas(me.name)
	const unreads = await useUnreads()

	const shownTeas = calcTeas(teas)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.teas}>
					<Teas teas={shownTeas} />
					<UserSelect users={users} />
				</div>
				<div className={styles.notification}>
					<Notification unreads={unreads} />
				</div>
			</div>
			<div className={styles.tea}></div>
		</div>
	)
}
