import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.indexed-db-not-supported'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ChatDebug.setIndexedDbSupportForTest', false)
  try {
    // act
    await Command.execute('Main.openUri', 'chat-debug://e2e-session-indexed-db-not-supported')

    // assert
    const errorMessage = Locator('.ChatDebugViewError')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText('Unable to load chat debug session: IndexedDB is not supported in this environment.')
  } finally {
    await Command.execute('ChatDebug.setIndexedDbSupportForTest')
  }
}
