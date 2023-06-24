'use client'

import { Button, Rating, Textarea } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'

import { getApiOrigin } from '@/libs/env'
import { TeaRequest } from '@/model/tea'

import { styles } from './style.css'

export default function TeaForm({ userId }: { userId: string }) {
	const [teaCount, setTeaCount] = useState(0)
	const [message, setMessage] = useState('')
	const [isSending, setIsSending] = useState(false)

	const handleAddTea = async () => {
		setIsSending(true)
		const requestData: TeaRequest = {
			count: teaCount,
			message: message,
		}
		try {
			await fetch(`${getApiOrigin()}/api/teas/${userId}`, {
				method: 'POST',
				body: JSON.stringify(requestData),
			})
			setTeaCount(0)
			setMessage('')
		} catch {
			alert('送信に失敗しました')
		}
		setIsSending(false)
	}

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
				autosize
				minRows={3}
			/>
			<div className={styles.addTeaButton}>
				<Button onClick={handleAddTea} disabled={isSending}>
					ティーを注ぐ
				</Button>
			</div>
		</div>
	)
}
