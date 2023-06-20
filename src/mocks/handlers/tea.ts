import { rest } from 'msw'

import { Tea, TeaRequest } from '@/model/tea'

export const teaHanlders = (apiOrigin: string) => {
	const fetchUserTeas = rest.get(
		`${apiOrigin}/api/teas/:userId`,
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json<Tea[]>([
					{
						id: 'id1',
						count: 3,
						message: 'thank you!',
						from: 'mehm8128',
						to: 'mehm8128',
						created_at: '2021-10-10T00:00:00.000Z',
					},
					{
						id: 'id2',
						count: 5,
						message: 'arigatou!',
						from: 'mehm8128',
						to: 'mehm8128',
						created_at: '2021-12-10T00:00:00.000Z',
					},
					{
						id: 'id3',
						count: 3,
						message: 'kansya!',
						from: 'mehm8128',
						to: 'mehm8128',
						created_at: '2022-03-10T00:00:00.000Z',
					},
				]),
			)
		},
	)

	const postTea = rest.get(`${apiOrigin}/api/teas/:userId`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json<TeaRequest>({
				count: 3,
				message: 'thank you!',
			}),
		)
	})

	return { fetchUserTeas, postTea }
}
