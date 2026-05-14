import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-header-toggle-time'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, ContextMenu, expect, Locator }) => {
  const sessionId = 'e2e-session-table-header-toggle-time'
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
  await ContextMenu.selectItem('Time')

  await expect(headerCells).toHaveCount(4)
  const hiddenHeaderCellsNth0 = headerCells.nth(0)
  await expect(hiddenHeaderCellsNth0).toHaveText('Type')
  const hiddenHeaderCellsNth1 = headerCells.nth(1)
  await expect(hiddenHeaderCellsNth1).toHaveText('Method')
  const hiddenHeaderCellsNth2 = headerCells.nth(2)
  await expect(hiddenHeaderCellsNth2).toHaveText('Status')
  const hiddenHeaderCellsNth3 = headerCells.nth(3)
  await expect(hiddenHeaderCellsNth3).toHaveText('Size')

  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Time')

  await expect(headerCells).toHaveCount(5)
  const timeHeaders = Locator('th', { hasText: 'Time' })
  await expect(timeHeaders).toHaveCount(1)
  const shownHeaderCellsNth0 = headerCells.nth(0)
  await expect(shownHeaderCellsNth0).toHaveText('Type')
  const shownHeaderCellsNth1 = headerCells.nth(1)
  await expect(shownHeaderCellsNth1).toHaveText('Method')
  const shownHeaderCellsNth2 = headerCells.nth(2)
  await expect(shownHeaderCellsNth2).toHaveText('Status')
  const shownHeaderCellsNth3 = headerCells.nth(3)
  await expect(shownHeaderCellsNth3).toHaveText('Size')
  const shownHeaderCellsNth4 = headerCells.nth(4)
  await expect(shownHeaderCellsNth4).toHaveText('Time')
}
