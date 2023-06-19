import { NextRequest } from 'next/server'

const SHOWCASE_USER_KEY = 'X-Forwarded-User'
export const getShowcaseUser = (req: NextRequest) => {
	const userid = req.headers.get(SHOWCASE_USER_KEY)
	if (!userid) {
		return null
	}
	return userid
}
