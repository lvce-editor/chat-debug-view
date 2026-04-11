import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-sort'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
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

  const headerCells = Locator('.ChatDebugViewHeaderCell')
  const rows = Locator('.ChatDebugViewEventRow')

  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toContainText('response')
  await expect(rows.nth(1)).toContainText('request')

  await headerCells.nth(0).click()

  await expect(rows.nth(0)).toContainText('request')
  await expect(rows.nth(1)).toContainText('response')

  await headerCells.nth(0).click()

  await expect(rows.nth(0)).toContainText('response')
  await expect(rows.nth(1)).toContainText('request')
}