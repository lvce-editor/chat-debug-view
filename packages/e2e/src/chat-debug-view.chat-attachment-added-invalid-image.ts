import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-invalid-image'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  const eventId = Date.now()
  const sessionId = `e2e-session-chat-attachment-added-invalid-image-${eventId}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute(
    'ChatDebug.appendStoredImageAttachmentForTest',
    sessionId,
    eventId,
    'image/png',
    'broken.png',
    'text',
    'not-a-real-png',
    '2026-04-10T11:35:00.000Z',
  )
  await Command.execute('ChatDebug.handleClickRefresh')
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsEvent = Locator('.ChatDebugViewEvent')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')

  await expect(detailsEvent).toHaveText('image could not be loaded')
  await expect(lineNumbers).toHaveCount(0)
}
