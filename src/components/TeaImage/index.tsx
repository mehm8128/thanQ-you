'use client'

import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import useSWR from 'swr'

import { getApiOrigin } from '@/libs/env'
import { fetcher } from '@/libs/fetcher'
import { TeasResponse } from '@/model/tea'
import { meState } from '@/stores/me'

import { styles } from './style.css'

export default function TeaImage({ userId }: { userId?: string }) {
	const me = useRecoilValue(meState)
	const { data: teas } = useSWR<TeasResponse>(
		me.name && `${getApiOrigin()}/api/teas/${userId ?? me.name}`,
		fetcher,
	)

	if (!teas) return

	return (
		<div className={styles.tea}>
			{teas.total_count % 5 === 4 ? (
				<Image src='/coffee_max.png' alt='tea' width={420} height={420} />
			) : (
				// todo: teas % 0になった瞬間にこぼして空の状態にする
				<Image src='/coffee_empty.png' alt='tea' width={420} height={420} />
			)}
			{userId && (
				<Image
					src='/pot.png'
					alt='tea'
					width={360}
					height={360}
					className={styles.pot}
				/>
			)}
			<div className={styles.count}>{teas.total_count % 5}/5</div>
		</div>
	)
}
