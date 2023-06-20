import './globals.css'
import { Inter } from 'next/font/google'

import { Providers } from '@/components/Provider'
import { initMock } from '@/mocks/main'

const inter = Inter({ subsets: ['latin'] })

initMock()

export const metadata = {
	title: 'ThanQ_you',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<Providers>
				<body className={inter.className}>
					<main>{children}</main>
				</body>
			</Providers>
		</html>
	)
}
