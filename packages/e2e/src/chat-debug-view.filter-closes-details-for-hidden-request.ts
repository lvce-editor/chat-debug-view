import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-closes-details-for-hidden-request'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-filter-closes-details-for-hidden-request'
  await ChatDebug.open(sessionId)

  const root = Locator('.ChatDebugView')
  await expect(root).toBeVisible()

  await ChatDebug.setEvents([
    {
      path: '/chat',
      sessionId,
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      name: 'read_file',
      sessionId,
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'tool-execution',
    },
  ])
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  const firstRow = rows.nth(0)
  const secondRow = rows.nth(1)
  await expect(rows).toHaveCount(2)
  await expect(firstRow).toContainText('request')
  await expect(secondRow).toContainText('tool-execution, read_file')

  await ChatDebug.selectEventRow(0)

  const details = Locator('.ChatDebugViewDetails')
  const selectedRows = Locator('.TableRowSelected')
  await expect(details).toBeVisible()
  await expect(selectedRows).toHaveCount(1)

  await Command.execute('ChatDebug.handleEventCategoryFilter', 'tools', false, false)

  const selectedPills = Locator('.ChatDebugViewQuickFilterPillSelected')
  const remainingRow = rows.nth(0)
  await expect(selectedPills).toContainText('Tools')
  await expect(rows).toHaveCount(1)
  await expect(remainingRow).toContainText('tool-execution, read_file')
  await expect(details).toHaveCount(0)
  await expect(selectedRows).toHaveCount(0)
}
