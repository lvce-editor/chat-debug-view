import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.request-response-merged'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-request-response-merged'

  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      requestId: 'request-1',
      sessionId,
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      requestId: 'request-1',
      sessionId,
      timestamp: '2026-03-08T00:00:00.250Z',
      type: 'response',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')

  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('request')
  await expect(rows.nth(0)).toContainText('250 ms')
  await expect(rows.nth(0)).toContainText('200')
}
