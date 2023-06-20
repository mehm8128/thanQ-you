import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'

import { Me as MeType } from '@/model/user'

type Me = MeType & RowDataPacket

export async function GET(req: NextRequest) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		const [rows] = await connection.execute<Me[]>('SELECT * FROM users WHERE name = ?', [userID])

		return NextResponse.json(rows[0])
	} catch (e) {
		await connection?.rollback()
		// todo: 共通化
		if (e instanceof Error) {
			return NextResponse.json({ error: e.message }, { status: 500 })
		}
	} finally {
		await connection?.end()
	}
}
