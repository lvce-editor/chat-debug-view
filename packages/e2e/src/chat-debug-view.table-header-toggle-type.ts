import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-header-toggle-type'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, ContextMenu, expect, Locator }) => {
  const sessionId = 'e2e-session-table-header-toggle-type'
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
  await ContextMenu.selectItem('Type')

  await expect(headerCells).toHaveCount(4)
  const headerCellsNth0 = headerCells.nth(0)
  await expect(headerCellsNth0).toHaveText('Method')
  const headerCellsNth1 = headerCells.nth(1)
  await expect(headerCellsNth1).toHaveText('Status')
  const headerCellsNth2 = headerCells.nth(2)
  await expect(headerCellsNth2).toHaveText('Size')
  const headerCellsNth3 = headerCells.nth(3)
  await expect(headerCellsNth3).toHaveText('Time')

  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Type')

  await expect(headerCells).toHaveCount(5)
  const headerCellsNth4 = headerCells.nth(0)
  await expect(headerCellsNth4).toHaveText('Type')
  const headerCellsNth5 = headerCells.nth(1)
  await expect(headerCellsNth5).toHaveText('Method')
  const headerCellsNth6 = headerCells.nth(2)
  await expect(headerCellsNth6).toHaveText('Status')
  const headerCellsNth7 = headerCells.nth(3)
  await expect(headerCellsNth7).toHaveText('Size')
  const headerCellsNth8 = headerCells.nth(4)
  await expect(headerCellsNth8).toHaveText('Time')
}
