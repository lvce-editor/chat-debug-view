import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.refresh-button-visible'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-refresh-button-visible')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  // act
  await ChatDebug.setEvents([])
  await ChatDebug.useDevtoolsLayout()

  // assert
  const refreshButton = Locator('.ChatDebugViewRefreshButton')
  await expect(refreshButton).toBeVisible()
}
