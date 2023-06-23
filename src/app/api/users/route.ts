import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'
import { initUsers } from '@/libs/initUsers'
import { User as UserType } from '@/model/user'

type User = UserType & RowDataPacket

export async function GET(req: NextRequest) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	let connection: Connection | undefined
	try {
		connection = await connectDb()
		const [rows] = await connection.execute<User[]>('SELECT name FROM users')
		if (rows.length === 0) {
			const users = await initUsers(connection)
			return NextResponse.json(users)
		}

		return NextResponse.json(rows)
	} catch (e) {
		await connection?.rollback()
		if (e instanceof Error) {
			return NextResponse.json({ error: e.message }, { status: 500 })
		}
	} finally {
		await connection?.end()
	}
}
