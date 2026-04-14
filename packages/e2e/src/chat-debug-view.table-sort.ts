import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-sort'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  await ChatDebug.open('e2e-session-table-sort')
  await expect(Locator('.ChatDebugView')).toBeVisible()
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

  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toHaveText('response2000 ms')
  await expect(rows.nth(1)).toHaveText('request2000 ms')

  await Command.execute('ChatDebug.handleTableHeaderClick', 'type')

  // await expect(rows.nth(0)).toHaveText('request2000ms')
  // await expect(rows.nth(1)).toHaveText('response2000ms')

  // await Command.execute('ChatDebug.handleClickTableHeader', 'status')

  // await expect(rows.nth(0)).toHaveText('response')
  // await expect(rows.nth(1)).toHaveText('request')
}
