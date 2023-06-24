'use client'

import useSWR from 'swr'

import { styles } from '@/app/style.css'

import Header from '@/components/Header'
import TeaImage from '@/components/TeaImage'
import UserSelect from '@/components/UserSelect'

import { getApiOrigin } from '@/libs/env'
import { fetcher } from '@/libs/fetcher'
import { TeaWithUnread } from '@/model/tea'
import { User } from '@/model/user'

const useUsers = async (): Promise<User[]> => {
	// return [{ name: 'mehm8128' }, { name: 'mehm8128128' }]
	const res = await fetch(`${getApiOrigin()}/api/users`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

const useUnreads = async (): Promise<TeaWithUnread[]> => {
	// return [
	// 	{
	// 		id: 'id2',
	// 		count: 5,
	// 		message: 'arigatou!',
	// 		from: 'mehm8128',
	// 		to: 'mehm8128',
	// 		created_at: '2021-12-10T00:00:00.000Z',
	// 		unread: true,
	// 	},
	// 	{
	// 		id: 'id2',
	// 		count: 5,
	// 		message: 'arigatou!',
	// 		from: 'mehm8128',
	// 		to: 'mehm8128',
	// 		created_at: '2021-12-10T00:00:00.000Z',
	// 		unread: true,
	// 	},
	// 	{
	// 		id: 'id2',
	// 		count: 5,
	// 		message: 'arigatou!',
	// 		from: 'mehm8128',
	// 		to: 'mehm8128',
	// 		created_at: '2021-12-10T00:00:00.000Z',
	// 		unread: true,
	// 	},
	// ]
	const res = await fetch(`${getApiOrigin()}/api/unreads`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

export default function Home() {
	// const users = await useUsers()
	// const unreads = await useUnreads()
	const { data: users } = useSWR(`${getApiOrigin()}/api/users`, fetcher)
	const { data: unreads } = useSWR(`${getApiOrigin()}/api/unreads`, fetcher)

	if (!users || !unreads) return <div>loading...</div>

	return (
		<div className={styles.container}>
			<Header unreads={unreads} />
			<UserSelect users={users} />
			<TeaImage />
		</div>
	)
}
