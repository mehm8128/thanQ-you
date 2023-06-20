import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextResponse } from 'next/server'

import { connectDb } from '@/libs/db'

interface TraQUser {
	name: string
}
type TraQUserRow = RowDataPacket & TraQUser

export async function GET() {
	const secret = process.env.NEXT_PUBLIC_TRAQ_ACCESS_TOKEN
	const res = await fetch('https://q.trap.jp/api/v3/users', {
		headers: {
			Authorization: `Bearer ${secret}`,
		},
	})
	const users = await res.json()

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		const [rows] = await connection.execute<TraQUserRow[]>(
			'INSERT INTO users (name, unread_count, total_thank, total_thanked) VALUES ?',
			[users.map((user: TraQUser) => [user.name, 0, 0, 0])],
		)

		return NextResponse.json(rows)
	} catch {
		await connection?.rollback()
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	} finally {
		await connection?.end()
	}
}
