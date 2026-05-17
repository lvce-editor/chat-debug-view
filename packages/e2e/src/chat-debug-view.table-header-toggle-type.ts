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
  const headerCell0 = headerCells.nth(0)
  await expect(headerCell0).toHaveText('Method')
  const headerCell1 = headerCells.nth(1)
  await expect(headerCell1).toHaveText('Status')
  const headerCell2 = headerCells.nth(2)
  await expect(headerCell2).toHaveText('Size')
  const headerCell3 = headerCells.nth(3)
  await expect(headerCell3).toHaveText('Time')

  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Type')

  await expect(headerCells).toHaveCount(5)
  const headerCell4 = headerCells.nth(0)
  await expect(headerCell4).toHaveText('Type')
  const headerCell5 = headerCells.nth(1)
  await expect(headerCell5).toHaveText('Method')
  const headerCell6 = headerCells.nth(2)
  await expect(headerCell6).toHaveText('Status')
  const headerCell7 = headerCells.nth(3)
  await expect(headerCell7).toHaveText('Size')
  const headerCell8 = headerCells.nth(4)
  await expect(headerCell8).toHaveText('Time')
}
