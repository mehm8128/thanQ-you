'use client'

import { Rating, Textarea } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'

import { styles } from './style.css'

export default function Teas() {
	const [teaCount, setTeaCount] = useState(0)
	const [message, setMessage] = useState('')

	return (
		<div className={styles.container}>
			<Rating
				emptySymbol={
					<Image src='/coffee_empty_small.svg' alt='' height={32} width={32} />
				}
				fullSymbol={
					<Image src='/coffee_max_small.svg' alt='' height={32} width={32} />
				}
				value={teaCount}
				onChange={setTeaCount}
			/>
			<Textarea
				placeholder='メッセージを入力'
				value={message}
				onChange={e => setMessage(e.currentTarget.value)}
			/>
		</div>
	)
}
