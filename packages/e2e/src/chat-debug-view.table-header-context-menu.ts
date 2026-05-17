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
  const menuItem0 = menuItems.nth(0)
  await expect(menuItem0).toHaveText('Type')
  const menuItem1 = menuItems.nth(1)
  await expect(menuItem1).toHaveText('Duration')
  const menuItem2 = menuItems.nth(2)
  await expect(menuItem2).toHaveText('Status')
  const menuItem3 = menuItems.nth(3)
  await expect(menuItem3).toHaveText('Reset columns')
  const locator2 = Locator('[role="menuitemcheckbox"][aria-checked="true"]')
  await expect(locator2).toHaveCount(3)

  // act
  await ContextMenu.selectItem('Duration')

  // assert
  await expect(headerCells).toHaveCount(2)
  const headerCell0 = headerCells.nth(0)
  await expect(headerCell0).toHaveText('Type')
  const headerCell1 = headerCells.nth(1)
  await expect(headerCell1).toHaveText('Status')
  await expect(rowCells).toHaveCount(2)
  const savedStateAfterToggle = await Command.execute('ChatDebug.saveState')
  assertVisibleTableColumns(savedStateAfterToggle.visibleTableColumns, ['type', 'status'])

  // act
  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Reset columns')

  // assert
  await expect(headerCells).toHaveCount(3)
  await expect(headerCell0).toHaveText('Type')
  await expect(headerCell1).toHaveText('Duration')
  const headerCell2 = headerCells.nth(2)
  await expect(headerCell2).toHaveText('Status')
  await expect(rowCells).toHaveCount(3)
  const rowCell1 = rowCells.nth(1)
  await expect(rowCell1).toHaveText('250 ms')
  const savedStateAfterReset = await Command.execute('ChatDebug.saveState')
  assertVisibleTableColumns(savedStateAfterReset.visibleTableColumns, ['type', 'duration', 'status'])
}
