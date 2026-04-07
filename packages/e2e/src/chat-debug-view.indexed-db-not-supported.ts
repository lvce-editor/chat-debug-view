import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.indexed-db-not-supported'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-indexed-db-not-supported')
  try {
    // act
    await ChatDebug.setIndexedDbSupportForTest(false)
    await ChatDebug.open('e2e-session-indexed-db-not-supported')

    // assert
    const errorMessage = Locator('.ChatDebugViewError')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText('Unable to load chat debug session: IndexedDB is not supported in this environment.')
  } finally {
    await ChatDebug.resetIndexedDbSupportForTest()
  }
}
