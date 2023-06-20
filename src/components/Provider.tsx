'use client'

import { RecoilRoot } from 'recoil'

import { AuthProvider } from '@/components/AuthProvider'
import { initMock } from '@/mocks/main'

initMock()

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<RecoilRoot>
			<AuthProvider>{children}</AuthProvider>
		</RecoilRoot>
	)
}
