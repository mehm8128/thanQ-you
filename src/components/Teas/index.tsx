'use client'

import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import useSWR from 'swr'

import { getApiOrigin } from '@/libs/env'
import { fetcher } from '@/libs/fetcher'
import { Tea } from '@/model/tea'
import { meState } from '@/stores/me'

import { styles } from './style.css'

const calcTeas = (teas: Tea[] | undefined) => {
	// teas[i].countの合計を5ずつ入れていく
	// 例：3,4,5 -> [5,5,2]
	if (!teas) return []
	let sum = teas.reduce((sum, tea) => sum + tea.count, 0)
	const shownTeas: number[] = []
	let i = 0
	while (sum > 0) {
		shownTeas[i] = Math.min(5, sum)
		sum -= shownTeas[i]
		i++
	}
	return shownTeas
}

export default function Teas() {
	const me = useRecoilValue(meState)
	const { data: teas } = useSWR<Tea[]>(
		me.name && `${getApiOrigin()}/api/teas/${me.name}`,
		fetcher,
	)

	const shownTeas = calcTeas(teas)
	const totalTeas = teas ? teas.reduce((sum, tea) => sum + tea.count, 0) : 0

	return (
		<div className={styles.container}>
			<div className={styles.teas}>
				{shownTeas.slice(0, 100).map((tea, i) => (
					<div key={i}>
						<Image
							src={
								tea === 5 ? '/coffee_max_small.svg' : '/coffee_empty_small.svg'
							}
							alt={tea.toString()}
							width={32}
							height={32}
						/>
					</div>
				))}
				{shownTeas.length > 100 && <div>+{shownTeas.length - 100}</div>}
			</div>
			<div className={styles.total}>感謝された数：{totalTeas}</div>
		</div>
	)
}
