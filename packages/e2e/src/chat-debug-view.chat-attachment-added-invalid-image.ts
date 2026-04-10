import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-invalid-image'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-chat-attachment-added-invalid-image'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute(
    'ChatDebug.setAttachmentPreviewEventForTest',
    sessionId,
    'broken.png',
    'image/png',
    'error',
    'image could not be loaded',
  )
  await ChatDebug.useDevtoolsLayout()
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  await expect(detailsEvent).toContainText('image could not be loaded')
}
