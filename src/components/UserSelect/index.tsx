'use client'

import { NativeSelect } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import { User } from '@/model/user'
import { meState } from '@/stores/me'

import { styles } from './style.css'

interface Props {
	users: User[]
}
export default function UserSelect({ users }: Props) {
	const me = useRecoilValue(meState)
	const router = useRouter()

	const handleSelectUser = (userId: string) => {
		router.push(`/${userId}`)
	}
	return (
		<div className={styles.container}>
			<NativeSelect
				label=''
				placeholder='ユーザーを選択'
				onChange={e => handleSelectUser(e.currentTarget.value)}
				data={users.map(user => user.name).filter(user => user !== me.name)}
			/>
		</div>
	)
}
