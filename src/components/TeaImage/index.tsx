'use client'

import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import useSWR from 'swr'

import { getApiOrigin } from '@/libs/env'
import { fetcher } from '@/libs/fetcher'
import { TeasResponse } from '@/model/tea'
import { meState } from '@/stores/me'

import { styles } from './style.css'

export default function TeaImage() {
	const me = useRecoilValue(meState)
	const { data: teas } = useSWR<TeasResponse>(
		`${getApiOrigin()}/api/teas/${me.name}`,
		fetcher,
	)

	if (!teas) return

	return (
		<div className={styles.tea}>
			{teas.teas.length % 5 === 4 ? (
				<Image src='/coffee_max.png' alt='tea' width={420} height={420} />
			) : (
				// todo: teas % 0になった瞬間にこぼして空の状態にする
				<Image src='/coffee_empty.png' alt='tea' width={420} height={420} />
			)}
			<div className={styles.count}>{teas.teas.length % 5}/5</div>
		</div>
	)
}
