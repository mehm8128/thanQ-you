'use client'

import { Button, Popover } from '@mantine/core'
import Image from 'next/image'

import { formatDate } from '@/libs/date'
import { TeaWithUnread } from '@/model/tea'

import { styles } from './style.css'

export default function Notification({
	unreads,
}: {
	unreads: TeaWithUnread[]
}) {
	const handleClick = () => {}

	return (
		<div className={styles.container}>
			<Popover>
				<Popover.Target>
					<Button color='dark' variant='outline' onClick={handleClick}>
						<Image
							src='/notification.png'
							alt='notification'
							width={32}
							height={32}
						/>
					</Button>
				</Popover.Target>

				<Popover.Dropdown>
					{unreads.length > 0 ? (
						<ul className={styles.unreadList}>
							{unreads.map(unread => (
								<li className={styles.unreadItem} key={unread.id}>
									<Image
										src={`https://q.trap.jp/api/v3/public/icon/${unread.from}`}
										alt={unread.from}
										width={32}
										height={32}
										style={{ borderRadius: '50%' }}
									/>
									<p className={styles.message}>
										{unread.from} さんからティーをもらいました。
										<br />「{unread.message}」
									</p>
									<div className={styles.createdAt}>
										{formatDate(new Date(unread.created_at))}
									</div>
								</li>
							))}
						</ul>
					) : (
						<div>まだ通知はありません。</div>
					)}
				</Popover.Dropdown>
			</Popover>
		</div>
	)
}
