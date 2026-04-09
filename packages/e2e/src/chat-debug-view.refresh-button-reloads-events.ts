import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.refresh-button-reloads-events'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-refresh-button-reloads-events'
  const initialEvent = {
    ended: '2026-03-08T00:00:00.250Z',
    sessionId,
    started: '2026-03-08T00:00:00.000Z',
    timestamp: '2026-03-08T00:00:00.000Z',
    type: 'request',
  }
  const nextEvent = {
    ended: '2026-03-08T00:00:01.500Z',
    sessionId,
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'response',
  }

  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
  await Command.execute('ChatDebug.appendStoredEventForTest', initialEvent)
  await Command.execute('ChatDebug.setSessionId', sessionId)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.ChatDebugViewEventRow')
  const refreshButton = Locator('.ChatDebugViewRefreshButton')

  await expect(refreshButton).toBeVisible()
  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')

  await Command.execute('ChatDebug.appendStoredEventForTest', nextEvent)
  await Command.execute('ChatDebug.handleClickRefresh')

  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toContainText('request')
  await expect(rows.nth(1)).toContainText('response')
}
