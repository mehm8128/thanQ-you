import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'

interface Me extends RowDataPacket {
	name: string
	unread_count: number
	total_thank: number
	total_thanked: number
}

export async function GET(req: NextRequest) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		const [rows] = await connection.execute<Me[]>('SELECT * FROM users WHERE id = ?', [userID])

		return NextResponse.json(rows[0])
	} catch {
		await connection?.rollback()
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	} finally {
		await connection?.end()
	}
}
