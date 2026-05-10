import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-header-context-menu'

const assertVisibleTableColumns = (actual: readonly string[], expected: readonly string[]): void => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected visibleTableColumns to equal ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, ContextMenu, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-table-header-context-menu'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEvents([
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ])

  const headerCells = Locator('.ChatDebugViewHeaderCell')
  const rowCells = Locator('.TableBody .TableRow .TableCell')

  // act
  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)

  // assert
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  const menuItemsNth0 = menuItems.nth(0)
  await expect(menuItemsNth0).toHaveText('Type')
  const menuItemsNth1 = menuItems.nth(1)
  await expect(menuItemsNth1).toHaveText('Duration')
  const menuItemsNth2 = menuItems.nth(2)
  await expect(menuItemsNth2).toHaveText('Status')
  const menuItemsNth3 = menuItems.nth(3)
  await expect(menuItemsNth3).toHaveText('Reset columns')
  const locator2 = Locator('[role="menuitemcheckbox"][aria-checked="true"]')
  await expect(locator2).toHaveCount(3)

  // act
  await ContextMenu.selectItem('Duration')

  // assert
  await expect(headerCells).toHaveCount(2)
  const headerCellsNth0 = headerCells.nth(0)
  await expect(headerCellsNth0).toHaveText('Type')
  const headerCellsNth1 = headerCells.nth(1)
  await expect(headerCellsNth1).toHaveText('Status')
  await expect(rowCells).toHaveCount(2)
  const savedStateAfterToggle = await Command.execute('ChatDebug.saveState')
  assertVisibleTableColumns(savedStateAfterToggle.visibleTableColumns, ['type', 'status'])

  // act
  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Reset columns')

  // assert
  await expect(headerCells).toHaveCount(3)
  await expect(headerCellsNth0).toHaveText('Type')
  await expect(headerCellsNth1).toHaveText('Duration')
  const headerCellsNth2 = headerCells.nth(2)
  await expect(headerCellsNth2).toHaveText('Status')
  await expect(rowCells).toHaveCount(3)
  const rowCellsNth1 = rowCells.nth(1)
  await expect(rowCellsNth1).toHaveText('250 ms')
  const savedStateAfterReset = await Command.execute('ChatDebug.saveState')
  assertVisibleTableColumns(savedStateAfterReset.visibleTableColumns, ['type', 'duration', 'status'])
}
