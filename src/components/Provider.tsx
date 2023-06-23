'use client'

import { MantineProvider } from '@mantine/core'
import { RecoilRoot } from 'recoil'

import { AuthProvider } from '@/components/AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<RecoilRoot>
			<AuthProvider>
				<MantineProvider withNormalizeCSS>{children}</MantineProvider>
			</AuthProvider>
		</RecoilRoot>
	)
}
