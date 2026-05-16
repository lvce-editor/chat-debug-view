import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.live-updates'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = `e2e-session-live-updates-${Date.now()}`
  const otherSessionId = `${sessionId}-other`
  const firstEvent = {
    ended: '2026-03-08T00:00:00.250Z',
    sessionId,
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const ignoredEvent = {
    ended: '2026-03-08T00:00:00.750Z',
    sessionId: otherSessionId,
    started: '2026-03-08T00:00:00.500Z',
    timestamp: '2026-03-08T00:00:00.500Z',
    type: 'response',
  }
  const secondEvent = {
    ended: '2026-03-08T00:00:01.250Z',
    sessionId,
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  }

  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')

  await Command.execute('ChatDebug.appendStoredEventForTest', firstEvent)
  await expect(rows).toHaveCount(1)
  const firstRow = rows.nth(0)
  await expect(firstRow).toContainText('request')

  await Command.execute('ChatDebug.appendStoredEventForTest', ignoredEvent)
  await expect(rows).toHaveCount(1)

  await Command.execute('ChatDebug.appendStoredEventForTest', secondEvent)
  await expect(rows).toHaveCount(2)
  const secondRow = rows.nth(1)
  await expect(secondRow).toContainText('response')
}
