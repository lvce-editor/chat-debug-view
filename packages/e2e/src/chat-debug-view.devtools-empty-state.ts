import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-empty-state'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-devtools-empty-state')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  // act
  await ChatDebug.setEvents([])
  await ChatDebug.useDevtoolsLayout()

  // assert
  const locator2 = Locator('.ChatDebugView--devtools')
  await expect(locator2).toBeVisible()
  const locator3 = Locator('.Table')
  await expect(locator3).toHaveCount(0)
  const locator4 = Locator('.ChatDebugViewEmpty')
  await expect(locator4).toBeVisible()
  const locator5 = Locator('.ChatDebugViewEmpty')
  await expect(locator5).toContainText('No events have been found')
}
