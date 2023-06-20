import { Connection } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'

export async function GET(req: NextRequest) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		await connection.execute('UPDATE teas SET unread = false WHERE `to` = ? AND unread = true', [
			userID,
		])

		return NextResponse.json('ok')
	} catch (e) {
		await connection?.rollback()
		if (e instanceof Error) {
			return NextResponse.json({ error: e.message }, { status: 500 })
		}
	} finally {
		await connection?.end()
	}
}
