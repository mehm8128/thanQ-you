import Header from '@/components/Header'
import TeaForm from '@/components/TeaForm'

import { getApiOrigin } from '@/libs/env'
import { TeaWithUnread } from '@/model/tea'

import { styles } from './style.css'

const useUnreads = async (): Promise<TeaWithUnread[]> => {
	return [
		{
			id: 'id2',
			count: 5,
			message: 'arigatou!',
			from: 'mehm8128',
			to: 'mehm8128',
			created_at: '2021-12-10T00:00:00.000Z',
			unread: true,
		},
		{
			id: 'id2',
			count: 5,
			message: 'arigatou!',
			from: 'mehm8128',
			to: 'mehm8128',
			created_at: '2021-12-10T00:00:00.000Z',
			unread: true,
		},
		{
			id: 'id2',
			count: 5,
			message: 'arigatou!',
			from: 'mehm8128',
			to: 'mehm8128',
			created_at: '2021-12-10T00:00:00.000Z',
			unread: true,
		},
	]
	const res = await fetch(`${getApiOrigin()}/api/unreads`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

export default async function UserTea({
	params: { userId },
}: {
	params: { userId: string }
}) {
	const unreads = await useUnreads()

	return (
		<div className={styles.container}>
			<Header unreads={unreads} />
			<div className={styles.tea}>
				<div></div>
				<div className={styles.form}>
					<TeaForm />
				</div>
			</div>
		</div>
	)
}
