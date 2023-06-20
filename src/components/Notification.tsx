'use client'

import Image from 'next/image'

import { styles } from '@/app/style.css'

import { TeaWithUnread } from '@/model/tea'

interface Props {
	unreads: TeaWithUnread[]
}
export default function Notification({ unreads }: Props) {
	const handleClick = () => {}

	return (
		<div className={styles.container}>
			<button onClick={handleClick}>
				<Image src='/public/notification.svg' alt='notification' width={32} height={32} />
			</button>
		</div>
	)
}
