import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.handle-submit-response-completed-merge'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-handle-submit-response-completed-merge'

  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      eventId: 1,
      sessionId,
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'handle-submit',
      value: 'hello',
    },
    {
      eventId: 2,
      sessionId,
      timestamp: '2026-03-08T00:00:00.250Z',
      type: 'sse-response-completed',
      value: {
        type: 'response.completed',
      },
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableRow')
  const rowCells = Locator('.TableBody .TableRow .TableCell')

  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('handle-submit')
  await expect(rowCells).toHaveCount(3)
  await expect(rowCells.nth(1)).toHaveText('250 ms')

  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabTiming()

  const locator2 = Locator('.ChatDebugViewTiming')
  await expect(locator2).toContainText('Duration')
  const locator3 = Locator('.ChatDebugViewTiming')
  await expect(locator3).toContainText('250ms')
}
