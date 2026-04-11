import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-empty-state'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-devtools-empty-state')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  // act
  await ChatDebug.setEvents([])
  await ChatDebug.useDevtoolsLayout()

  // assert
  await expect(Locator('.ChatDebugView--devtools')).toBeVisible()
  await expect(Locator('.Table')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewEmpty')).toBeVisible()
  await expect(Locator('.ChatDebugViewEmpty')).toContainText('No events have been found')
}
