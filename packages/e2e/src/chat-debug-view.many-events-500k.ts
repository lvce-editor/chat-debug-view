import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.many-events-500k'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
	const sessionId = 'e2e-session-many-events-500000'

	await ChatDebug.open('e2e-session-many-events-bootstrap')
	await expect(Locator('.ChatDebugView')).toBeVisible()

	await Command.execute('ChatDebug.seedManyEventsInIndexedDbForTest', {
		sessionId,
		totalEventCount: 500_000,
	})

	await Command.execute('ChatDebug.setSessionId', sessionId)
	await expect(Locator('.ChatDebugView')).toBeVisible()
	await ChatDebug.useDevtoolsLayout()

	const rows = Locator('.TableRow')
	await expect(rows).toHaveCount(1)
	await expect(rows.nth(0)).toContainText('request')
	await expect(rows.nth(0)).toContainText('100 ms')
}
