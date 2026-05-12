import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-sort'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  await ChatDebug.open('e2e-session-table-sort')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.useDevtoolsLayout()

  const events = [
    {
      sessionId: 'e2e-session-table-sort',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'response',
    },
    {
      sessionId: 'e2e-session-table-sort',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)

  const rows = Locator('.TableBody .TableRow')
  const firstRowStatusCell = Locator('.TableBody .TableRow:nth-child(1) .TableCell:nth-child(3)')
  const firstRowSizeCell = Locator('.TableBody .TableRow:nth-child(1) .TableCell:nth-child(4)')
  const firstRowDurationCell = Locator('.TableBody .TableRow:nth-child(1) .TableCell:nth-child(5)')
  const secondRowStatusCell = Locator('.TableBody .TableRow:nth-child(2) .TableCell:nth-child(3)')
  const secondRowSizeCell = Locator('.TableBody .TableRow:nth-child(2) .TableCell:nth-child(4)')
  const secondRowDurationCell = Locator('.TableBody .TableRow:nth-child(2) .TableCell:nth-child(5)')

  await expect(rows).toHaveCount(2)
  const rowsNth0 = rows.nth(0)
  await expect(rowsNth0).toContainText('response')
  await expect(firstRowStatusCell).toHaveText('200')
  await expect(firstRowSizeCell).toHaveText('0 B')
  await expect(firstRowDurationCell).toHaveText('0 ms')
  const rowsNth1 = rows.nth(1)
  await expect(rowsNth1).toContainText('request')
  await expect(secondRowStatusCell).toHaveText('200')
  await expect(secondRowSizeCell).toHaveText('0 B')
  await expect(secondRowDurationCell).toHaveText('0 ms')

  await Command.execute('ChatDebug.handleTableHeaderClick', 'type')

  // await expect(rows.nth(0)).toHaveText('request2000ms')
  // await expect(rows.nth(1)).toHaveText('response2000ms')

  // await Command.execute('ChatDebug.handleClickTableHeader', 'status')

  // await expect(rows.nth(0)).toHaveText('response')
  // await expect(rows.nth(1)).toHaveText('request')
}
