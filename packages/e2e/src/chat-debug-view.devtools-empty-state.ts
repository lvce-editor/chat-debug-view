import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-empty-state'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-devtools-empty-state')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  // act
  await Command.execute('ChatDebug.setEvents', [])
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  // assert
  await expect(Locator('.ChatDebugView--devtools')).toBeVisible()
  await expect(Locator('.ChatDebugViewTable')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEmpty')).toBeVisible()
  await expect(Locator('.ChatDebugViewEmpty')).toContainText('No events have been found')
}
