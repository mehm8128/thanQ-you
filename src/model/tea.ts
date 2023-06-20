export interface Tea {
	id: string
	count: number
	message: string
	from: string
	to: string
	created_at: string
}
export interface TeaWithUnread {
	unread: boolean
}

export interface TeasResponse {
	teas: Tea[]
	total_count: number
}

export interface TeaRequest {
	count: number
	message: string
}
