import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-header-toggle-status'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, ContextMenu, expect, Locator }) => {
  const sessionId = 'e2e-session-table-header-toggle-status'
  await ChatDebug.open(sessionId)
  const view = Locator('.ChatDebugView')
  await expect(view).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEvents([
    {
      ended: '2026-03-08T00:00:01.250Z',
      method: 'POST',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      statusCode: 200,
      timestamp: '2026-03-08T00:00:01.000Z',
      totalByteSize: 123,
      type: 'request',
    },
  ])

  const headerCells = Locator('th')

  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Status')

  await expect(headerCells).toHaveCount(4)
  const hiddenHeaderCell0 = headerCells.nth(0)
  await expect(hiddenHeaderCell0).toHaveText('Type')
  const hiddenHeaderCell1 = headerCells.nth(1)
  await expect(hiddenHeaderCell1).toHaveText('Method')
  const hiddenHeaderCell2 = headerCells.nth(2)
  await expect(hiddenHeaderCell2).toHaveText('Size')
  const hiddenHeaderCell3 = headerCells.nth(3)
  await expect(hiddenHeaderCell3).toHaveText('Time')

  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Status')

  await expect(headerCells).toHaveCount(5)
  const shownHeaderCell0 = headerCells.nth(0)
  await expect(shownHeaderCell0).toHaveText('Type')
  const shownHeaderCell1 = headerCells.nth(1)
  await expect(shownHeaderCell1).toHaveText('Method')
  const shownHeaderCell2 = headerCells.nth(2)
  await expect(shownHeaderCell2).toHaveText('Status')
  const shownHeaderCell3 = headerCells.nth(3)
  await expect(shownHeaderCell3).toHaveText('Size')
  const shownHeaderCell4 = headerCells.nth(4)
  await expect(shownHeaderCell4).toHaveText('Time')
}
