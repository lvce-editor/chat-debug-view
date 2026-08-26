import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.reset-columns-resets-sort'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-reset-columns-resets-sort'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEvents([
    {
      ended: '2026-03-08T00:00:02.000Z',
      sessionId,
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'response',
    },
    {
      ended: '2026-03-08T00:00:03.000Z',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ])

  const rows = Locator('.TableBody .TableRow')

  await expect(rows).toHaveCount(2)
  const firstRow = rows.nth(0)
  await expect(firstRow).toContainText('response')
  const secondRow = rows.nth(1)
  await expect(secondRow).toContainText('request')

  await Command.execute('ChatDebug.handleTableHeaderClick', 'type')

  await expect(firstRow).toContainText('request')
  await expect(secondRow).toContainText('response')

  await Command.execute('ChatDebug.resetTableColumns')

  await expect(firstRow).toContainText('response')
  await expect(secondRow).toContainText('request')
}
