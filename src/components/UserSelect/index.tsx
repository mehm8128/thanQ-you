'use client'

import { Select } from '@mantine/core'
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
			<Select
				label=''
				placeholder='ユーザーを選択'
				searchable
				nothingFound='ユーザーが見つかりませんでした'
				onChange={val => val && handleSelectUser(val)}
				data={users.map(user => user.name).filter(user => user !== me.name)}
			/>
		</div>
	)
}
