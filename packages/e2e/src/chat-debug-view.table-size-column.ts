import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-size-column'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-table-size-column'

  await ChatDebug.open(sessionId)
  const view = Locator('.ChatDebugView')
  await expect(view).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEvents([
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ])

  const headerCells = Locator('th')
  await expect(headerCells).toHaveCount(5)
  const sizeHeader = headerCells.nth(3)
  await expect(sizeHeader).toHaveText('Size')

  const sizeCell = Locator('.TableBody .TableRow .ChatDebugViewCellSize')
  await expect(sizeCell).toHaveCount(1)
  await expect(sizeCell).toHaveText('0 B')

  await Command.execute('ChatDebug.handleTableHeaderClick', 'size')

  await expect(sizeCell).toHaveText('0 B')
}
