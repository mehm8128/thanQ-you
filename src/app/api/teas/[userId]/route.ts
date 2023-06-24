import { Connection, RowDataPacket } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { getShowcaseUser } from '@/libs/auth'
import { connectDb } from '@/libs/db'
import { Tea, TeaRequest, TeasResponse } from '@/model/tea'

export type TeaRow = Tea & RowDataPacket

interface TeaTotalCount extends RowDataPacket {
	total_count: number
}

export async function GET(
	req: NextRequest,
	context: { params: { userId: string } },
) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	const targetUserId = context.params.userId

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		const [rows] = await connection.execute<TeaRow[]>(
			'SELECT * FROM teas WHERE `to` = ?',
			[targetUserId],
		)
		const [rows2] = await connection.execute<TeaTotalCount[]>(
			'SELECT SUM(count) as total_count FROM teas WHERE `to` = ?',
			[userID],
		)

		const res: TeasResponse = {
			teas: rows,
			total_count: rows2[0].total_count,
		}
		return NextResponse.json(res)
	} catch (e) {
		await connection?.rollback()
		if (e instanceof Error) {
			return NextResponse.json({ error: e.message }, { status: 500 })
		}
	} finally {
		await connection?.end()
	}
}

export async function POST(
	req: NextRequest,
	context: { params: { userId: string } },
) {
	const userID = getShowcaseUser(req)
	if (!userID) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	const targetUserId = context.params.userId
	const data: TeaRequest = await req.json()

	let connection: Connection | undefined
	try {
		connection = await connectDb()

		const uuid = uuidv4()
		const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
		await connection.execute<TeaRow[]>(
			'INSERT INTO teas (id, count, message, `from`, `to`, created_at, unread) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[uuid, data.count, data.message, userID, targetUserId, createdAt, true],
		)

		try {
			const secret = process.env.NEXT_PUBLIC_TRAQ_ACCESS_TOKEN
			const requestData = {
				content: `@${userID} から${data.count}杯のお茶:tea:が注がれました${
					data.message ? '\n>' + data.message : ''
				} `,
				embed: true,
			}
			const traqUsersRes = await fetch(
				`https://q.trap.jp/api/v3/users?name=${targetUserId}`,
				{
					headers: {
						Authorization: `Bearer ${secret}`,
					},
				},
			)
			const targetTraqUser = (await traqUsersRes.json())[0]

			await fetch(
				`https://q.trap.jp/api/v3/users/${targetTraqUser.id}/messages`,
				{
					method: 'POST',
					body: JSON.stringify(requestData),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${secret}`,
					},
				},
			)
		} catch (e) {
			if (e instanceof Error) {
				throw new Error('Failed to send message to traQ: ' + e.message)
			}
		}

		const res: Tea = {
			id: uuid,
			count: data.count,
			message: data.message,
			from: userID,
			to: targetUserId,
			created_at: createdAt,
		}
		return NextResponse.json(res)
	} catch (e) {
		await connection?.rollback()
		if (e instanceof Error) {
			return NextResponse.json({ error: e.message }, { status: 500 })
		}
	} finally {
		await connection?.end()
	}
}
