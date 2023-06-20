'use client'

import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { getApiOrigin } from '@/libs/env'
import { Me } from '@/model/user'
import { meState } from '@/stores/me'

const fetchMe = async (): Promise<Me> => {
	const res = await fetch(`${getApiOrigin()}/api/me`, {
		next: { revalidate: 60 },
	})
	if (!res.ok) throw new Error('エラーが発生しました')
	return await res.json()
}

export function AuthProviders({ children }: { children: React.ReactNode }) {
	const [me, setMe] = useRecoilState(meState)

	useEffect(() => {
		if (!me.name) return
		;(async () => {
			const me = await fetchMe()
			setMe(me)
		})()
	}, [me])

	return children
}
