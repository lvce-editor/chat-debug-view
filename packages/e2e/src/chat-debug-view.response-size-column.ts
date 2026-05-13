import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.response-size-column'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-response-size-column'

  await ChatDebug.open(sessionId)
  const view = Locator('.ChatDebugView')
  await expect(view).toBeVisible()
  await ChatDebug.useDevtoolsLayout()

  await ChatDebug.setEvents([
    {
      eventId: 1,
      requestId: 'request-without-response',
      sessionId,
      timestamp: '2026-05-13T10:00:02.000Z',
      type: 'request',
    },
    {
      eventId: 2,
      requestId: 'request-with-response',
      sessionId,
      timestamp: '2026-05-13T10:00:01.000Z',
      type: 'request',
    },
    {
      eventId: 3,
      requestId: 'request-with-response',
      response: 'abcdefghij',
      sessionId,
      timestamp: '2026-05-13T10:00:01.100Z',
      type: 'response',
    },
  ])

  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(2)

  const firstRow = rows.nth(0)
  const secondRow = rows.nth(1)
  const firstRowSizeCell = Locator('.TableBody .TableRow:nth-child(1) .ChatDebugViewCellSize')
  const secondRowSizeCell = Locator('.TableBody .TableRow:nth-child(2) .ChatDebugViewCellSize')

  await expect(firstRow).toContainText('request')
  await expect(firstRowSizeCell).toHaveText('0 B')

  await expect(secondRow).toContainText('request')
  await expect(secondRowSizeCell).toHaveText('10 B')
}
