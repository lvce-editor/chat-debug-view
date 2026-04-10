import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-preview'

const decodeBase64 = (value: string): Uint8Array => {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0))
}

const createPngBlob = (): Blob => {
  return new Blob([decodeBase64('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+kZ0cAAAAASUVORK5CYII=')], {
    type: 'image/png',
  })
}

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-chat-attachment-added-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const event = {
    attachmentId: 'attachment-1',
    blob: createPngBlob(),
    eventId: 7,
    mimeType: 'image/png',
    name: 'diagram.png',
    sessionId,
    timestamp: '2026-04-10T11:35:00.000Z',
    type: 'chat-attachment-added',
  }

  // act
  await Command.execute('ChatDebug.appendStoredEventForTest', event)
  await Command.execute('ChatDebug.setSessionId', sessionId)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const previewImage = Locator('.ChatDebugViewImagePreviewImage')

  // assert
  await expect(previewImage).toBeVisible()
  await expect(previewImage).toHaveAttribute('alt', 'diagram.png')
}
