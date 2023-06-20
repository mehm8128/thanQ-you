import { container, header, notification, tea, teas } from '@/app/style.css'

import { getApiOrigin } from '@/libs/env'
import { TeaWithUnread } from '@/model/tea'
import { User } from '@/model/user'

const useUsers = async (): Promise<User[]> => {
	const res = await fetch(`${getApiOrigin()}/api/users`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}
const useUnread = async (): Promise<TeaWithUnread[]> => {
	const res = await fetch(`${getApiOrigin()}/api/users`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

export default async function Home() {
	return (
		<div className={container}>
			<div className={header}>
				<div className={teas}></div>
				<div className={notification}></div>
			</div>
			<div className={tea}></div>
		</div>
	)
}
