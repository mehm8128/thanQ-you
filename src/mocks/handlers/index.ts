import { RestHandler } from 'msw'

import { teaHanlders } from '@/mocks/handlers/tea'
import { userHanlders } from '@/mocks/handlers/user'

export function getHandlersArray(
	handlers: Record<string, RestHandler>,
): RestHandler[] {
	return Object.values(handlers)
}

export function handlers(apiOrigin: string) {
	return [
		getHandlersArray(userHanlders(apiOrigin)),
		getHandlersArray(teaHanlders(apiOrigin)),
	].flat()
}
