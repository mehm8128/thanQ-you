import { RestHandler } from 'msw'

import { sampleHanlders } from '@/mocks/handlers/sample'

export function getHandlersArray(handlers: Record<string, RestHandler>): RestHandler[] {
	return Object.values(handlers)
}

export function handlers(apiOrigin: string) {
	return [getHandlersArray(sampleHanlders(apiOrigin))].flat()
}
