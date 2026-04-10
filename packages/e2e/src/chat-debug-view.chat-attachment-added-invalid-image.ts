import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-invalid-image'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-chat-attachment-added-invalid-image'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute(
    'ChatDebug.appendStoredImageAttachmentForTest',
    sessionId,
    1,
    'broken.png',
    'image/png',
    'text',
    'not-a-real-png',
    '2026-04-10T11:35:00.000Z',
  )
  await Command.execute('ChatDebug.handleClickRefresh')
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  await expect(detailsEvent).toContainText('image could not be loaded')
}
