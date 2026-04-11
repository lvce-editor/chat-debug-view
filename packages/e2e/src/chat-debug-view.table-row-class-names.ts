import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-row-class-names'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-table-row-class-names'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    {
      ended: '2026-03-08T00:00:02.500Z',
      sessionId,
      started: '2026-03-08T00:00:02.000Z',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'response',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toHaveAttribute('class', 'TableRow TableRowOdd')
  await expect(rows.nth(1)).toHaveAttribute('class', 'TableRow TableRowEven')
}
