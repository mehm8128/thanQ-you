import { rest } from 'msw'

interface Sample {
	sample: string
}

export const sampleHanlders = (apiOrigin: string) => {
	const sample = rest.get(`${apiOrigin}/sample`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json<Sample>({
				sample: 'sample',
			}),
		)
	})

	return { sample }
}
