import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.refresh-button-reloads-events'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  const sessionId = `e2e-session-refresh-button-reloads-events-${Date.now()}`
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

  // act
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.appendStoredEventForTest(initialEvent)
  await ChatDebug.setSessionId(sessionId)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  const refreshButton = Locator('.ChatDebugViewRefreshButton')

  // assert
  await expect(refreshButton).toBeVisible()
  const rowsNth0 = rows.nth(0)
  await expect(rowsNth0).toContainText('request')

  // act
  await ChatDebug.appendStoredEventForTest(nextEvent)
  await ChatDebug.handleClickRefresh()

  // assert
  await expect(rows).toHaveCount(3) // hm?
  await expect(rowsNth0).toContainText('request')
  const rowsNth1 = rows.nth(1)
  await expect(rowsNth1).toContainText('response')
}
