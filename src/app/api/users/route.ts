import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'

interface User extends RowDataPacket {
	name: string
}

export async function GET(req: NextRequest) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		//todo: アプリ起動時にtraQから取ってDBに入れるように
		const [rows] = await connection.execute<User[]>('SELECT name FROM users')

		return NextResponse.json(rows)
	} catch {
		await connection?.rollback()
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	} finally {
		await connection?.end()
	}
}
