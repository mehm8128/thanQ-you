'use client'

import { NativeSelect } from '@mantine/core'
import { useRouter } from 'next/navigation'

import { styles } from '@/app/style.css'

import { User } from '@/model/user'

interface Props {
	users: User[]
}
export default function UserSelect({ users }: Props) {
	const router = useRouter()

	const handleSelectUser = (userId: string) => {
		router.push(`/teas/${userId}`)
	}
	return (
		<div className={styles.container}>
			<NativeSelect
				label=''
				placeholder='ユーザーを選択'
				onChange={e => handleSelectUser(e.currentTarget.value)}
				data={users.map(user => user.name)}
			/>
		</div>
	)
}
