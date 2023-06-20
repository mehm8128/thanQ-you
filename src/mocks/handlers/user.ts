import { rest } from 'msw'

import { TeaWithUnread } from '@/model/tea'
import { Me, User } from '@/model/user'

export const userHanlders = (apiOrigin: string) => {
	const fetchMe = rest.get(`${apiOrigin}/api/me`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json<Me>({
				name: 'mehm8128',
				unread_count: 0,
				total_thank: 0,
				total_thanked: 0,
			}),
		)
	})

	const fetchUsers = rest.get(`${apiOrigin}/api/users`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json<User[]>([{ name: 'mehm8128' }, { name: 'mehm8128128' }]),
		)
	})

	const fetchUnreads = rest.get(`${apiOrigin}/api/unreads`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json<TeaWithUnread[]>([
				{
					id: 'id1',
					count: 3,
					message: 'thank you!',
					from: 'mehm8128',
					to: 'mehm8128',
					created_at: '2021-10-10T00:00:00.000Z',
					unread: true,
				},
				{
					id: 'id2',
					count: 5,
					message: 'arigatou!',
					from: 'mehm8128',
					to: 'mehm8128',
					created_at: '2021-12-10T00:00:00.000Z',
					unread: true,
				},
				{
					id: 'id3',
					count: 3,
					message: 'kansya!',
					from: 'mehm8128',
					to: 'mehm8128',
					created_at: '2022-03-10T00:00:00.000Z',
					unread: false,
				},
			]),
		)
	})

	return { fetchMe, fetchUsers, fetchUnreads }
}
