import { atom } from 'recoil'

import { Me } from '@/model/user'

export const meState = atom<Me>({
	key: 'meState',
	default: {
		name: '',
		unread_count: 0,
		total_thank: 0,
		total_thanked: 0,
	},
})
