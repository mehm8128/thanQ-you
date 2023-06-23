import { Connection } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import { TeaRow } from '@/app/api/teas/[userId]/route'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'

interface Unread extends TeaRow {
	unread: boolean
}

export async function GET(req: NextRequest) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	let limit = 10
	if (req.nextUrl.searchParams.has('limit')) {
		limit = Number(req.nextUrl.searchParams.get('limit'))
	}
	let offset = 0
	if (req.nextUrl.searchParams.has('offset')) {
		offset = Number(req.nextUrl.searchParams.get('offset'))
	}

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		const [rows] = await connection.execute<Unread[]>(
			'SELECT * FROM teas WHERE `to` = ? LIMIT ? OFFSET ?',
			[userID, limit, offset],
		)
		await connection.execute('UPDATE teas SET unread = false WHERE `to` = ? AND unread = true', [
			userID,
		])

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
