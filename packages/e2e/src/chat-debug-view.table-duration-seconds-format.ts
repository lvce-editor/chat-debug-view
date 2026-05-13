import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-duration-seconds-format'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-table-duration-seconds-format')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:02.000Z',
      sessionId: 'e2e-session-table-duration-seconds-format',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rowCells = Locator('.TableBody .TableRow .TableCell')

  await expect(rowCells).toHaveCount(5)
  const rowCellsNth4 = rowCells.nth(4)
  await expect(rowCellsNth4).toHaveText('2.0 s')
}
