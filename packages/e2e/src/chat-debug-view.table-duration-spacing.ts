import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-duration-spacing'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-table-duration-spacing')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'e2e-session-table-duration-spacing',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rowCells = Locator('.TableBody .TableRow .TableCell')

  await expect(rowCells).toHaveCount(3)
  await expect(rowCells.nth(2)).toHaveText('250 ms')
}
