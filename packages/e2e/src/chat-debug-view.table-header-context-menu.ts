import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-header-context-menu'

const assertVisibleTableColumns = (actual: readonly string[], expected: readonly string[]): void => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected visibleTableColumns to equal ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

export const test: Test = async ({ ChatDebug, Command, ContextMenu, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-table-header-context-menu'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
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
  const durationCells = Locator('.ChatDebugViewCellDuration')

  // act
  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)

  // assert
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  await expect(menuItems.nth(0)).toHaveText('Type')
  await expect(menuItems.nth(1)).toHaveText('Duration')
  await expect(menuItems.nth(2)).toHaveText('Status')
  await expect(menuItems.nth(3)).toHaveText('Reset columns')
  await expect(Locator('[role="menuitemcheckbox"][aria-checked="true"]')).toHaveCount(3)

  // act
  await ContextMenu.selectItem('Duration')

  // assert
  await expect(headerCells).toHaveCount(2)
  await expect(headerCells.nth(0)).toHaveText('Type')
  await expect(headerCells.nth(1)).toHaveText('Status')
  await expect(durationCells).toHaveCount(0)
  const savedStateAfterToggle = await Command.execute('ChatDebug.saveState')
  assertVisibleTableColumns(savedStateAfterToggle.visibleTableColumns, ['type', 'status'])

  // act
  await Command.execute('ChatDebug.handleHeaderContextMenu', 0, 300)
  await ContextMenu.selectItem('Reset columns')

  // assert
  await expect(headerCells).toHaveCount(3)
  await expect(headerCells.nth(0)).toHaveText('Type')
  await expect(headerCells.nth(1)).toHaveText('Duration')
  await expect(headerCells.nth(2)).toHaveText('Status')
  await expect(durationCells).toHaveCount(1)
  const savedStateAfterReset = await Command.execute('ChatDebug.saveState')
  assertVisibleTableColumns(savedStateAfterReset.visibleTableColumns, ['type', 'duration', 'status'])
}
