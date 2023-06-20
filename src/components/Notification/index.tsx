'use client'

import Image from 'next/image'

import { styles } from '@/app/style.css'

import { getApiOrigin } from '@/libs/env'
import { TeaWithUnread } from '@/model/tea'

const useUnreads = async (): Promise<TeaWithUnread[]> => {
	const res = await fetch(`${getApiOrigin()}/api/unreads`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

export default function Notification() {
	const unreads = useUnreads()
	const handleClick = () => {}

	return (
		<div className={styles.container}>
			<button onClick={handleClick}>
				<Image
					src='/public/notification.png'
					alt='notification'
					width={32}
					height={32}
				/>
			</button>
		</div>
	)
}
