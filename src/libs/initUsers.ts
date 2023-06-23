import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextResponse } from 'next/server'

interface TraQUser {
	name: string
}
type TraQUserRow = RowDataPacket & TraQUser

export const initUsers = async (connection: Connection) => {
	const secret = process.env.NEXT_PUBLIC_TRAQ_ACCESS_TOKEN
	const res = await fetch('https://q.trap.jp/api/v3/users', {
		headers: {
			Authorization: `Bearer ${secret}`,
		},
	})
	const users = await res.json()
	const usersWithoutBotAndWebhook = users.filter(
		(user: TraQUser) =>
			!user.name.startsWith('BOT') && !user.name.startsWith('Webhook'),
	)

	await connection.query<TraQUserRow[]>(
		'INSERT INTO users (name, unread_count, total_thank, total_thanked) VALUES ?',
		[usersWithoutBotAndWebhook.map((user: TraQUser) => [user.name, 0, 0, 0])],
	)

	const [rows3] = await connection.execute<TraQUserRow[]>('SELECT * FROM users')

	return NextResponse.json(rows3)
}
