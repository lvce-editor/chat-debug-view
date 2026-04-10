import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-preview'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-chat-attachment-added-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  // act
  await Command.execute(
    'ChatDebug.setAttachmentPreviewEventForTest',
    sessionId,
    'diagram.png',
    'image/png',
    'image',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+kZ0cAAAAASUVORK5CYII=',
  )
  await ChatDebug.useDevtoolsLayout()
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const previewImage = Locator('.ChatDebugViewImagePreviewImage')

  // assert
  await expect(previewImage).toBeVisible()
  await expect(previewImage).toHaveAttribute('alt', 'diagram.png')
}
