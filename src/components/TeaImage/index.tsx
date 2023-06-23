'use client'

import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import useSWR from 'swr'

import { fetcher } from '@/libs/fetcher'
import { meState } from '@/stores/me'

export default function TeaImage() {
	const me = useRecoilValue(meState)
	const { data: teas } = useSWR(`/api/teas/${me.name}`, fetcher)
	return (
		<>
			{teas % 5 === 4 ? (
				<Image src='/coffee_max.png' alt='tea' width={420} height={420} />
			) : (
				// todo: teas % 0になった瞬間にこぼして空の状態にする
				<Image src='/coffee_empty.png' alt='tea' width={420} height={420} />
			)}
		</>
	)
}
