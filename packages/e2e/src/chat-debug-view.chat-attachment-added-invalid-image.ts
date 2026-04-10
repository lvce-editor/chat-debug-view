import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-invalid-image'

const createInvalidImageBlob = (): Blob => {
  return new Blob(['this is not a real image'], {
    type: 'image/png',
  })
}

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-chat-attachment-added-invalid-image'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute('ChatDebug.appendStoredEventForTest', {
    attachmentId: 'attachment-invalid-1',
    blob: createInvalidImageBlob(),
    eventId: 1,
    mimeType: 'image/png',
    name: 'broken.png',
    sessionId,
    timestamp: '2026-04-10T11:35:00.000Z',
    type: 'chat-attachment-added',
  })
  await Command.execute('ChatDebug.setSessionId', sessionId)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  await expect(detailsEvent).toContainText('image could not be loaded')
}