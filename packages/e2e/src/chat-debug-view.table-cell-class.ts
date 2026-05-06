import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-cell-class'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-table-cell-class'

  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    {
      error: 'tool call failed',
      eventId: 2,
      sessionId,
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const tableCells = Locator('.TableBody .TableCell')
  await expect(tableCells).toHaveCount(8)
  const locator2 = Locator('td')
  await expect(locator2).toHaveCount(8)
  const locator3 = Locator('.ChatDebugViewCell')
  await expect(locator3).toHaveCount(0)
}
