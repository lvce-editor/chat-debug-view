import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-svg-preview'

const createSvgBlob = (): Blob => {
  return new Blob(
    [
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">',
      '<rect width="24" height="24" fill="#0b6"/>',
      '<circle cx="12" cy="12" r="6" fill="#fff"/>',
      '</svg>',
    ].join(''),
    {
      type: 'image/svg+xml',
    },
  )
}

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-chat-attachment-added-svg-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute('ChatDebug.appendStoredEventForTest', {
    attachmentId: 'attachment-svg-1',
    blob: createSvgBlob(),
    eventId: 1,
    mimeType: 'image/svg+xml',
    name: 'diagram.svg',
    sessionId,
    timestamp: '2026-04-10T11:35:00.000Z',
    type: 'chat-attachment-added',
  })
  await Command.execute('ChatDebug.setSessionId', sessionId)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const previewImage = Locator('.ChatDebugViewImagePreviewImage')

  await expect(previewImage).toBeVisible()
  await expect(previewImage).toHaveAttribute('alt', 'diagram.svg')
}