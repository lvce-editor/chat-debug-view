import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.open-not-found'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // act
  await ChatDebug.open('not-found')

  // assert
  const errorMessage = Locator('.ChatDebugViewError')
  await expect(errorMessage).toBeVisible()
  await expect(errorMessage).toContainText('No chat session found for sessionId "not-found".')
}
