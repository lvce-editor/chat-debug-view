import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-svg-preview'

export const skip = 1

const svgMarkup =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#0b6"/><circle cx="12" cy="12" r="6" fill="#fff"/></svg>'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const eventId = Date.now()
  const sessionId = `e2e-session-chat-attachment-added-svg-preview-${eventId}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute(
    'ChatDebug.appendStoredImageAttachmentForTest',
    sessionId,
    eventId,
    'image/svg+xml',
    'diagram.svg',
    'text',
    svgMarkup,
    '2026-04-10T11:35:00.000Z',
  )
  await Command.execute('ChatDebug.handleClickRefresh')
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const previewImage = Locator('.ChatDebugViewImagePreviewImage')

  await expect(previewImage).toBeVisible()
  await expect(previewImage).toHaveAttribute('alt', 'diagram.svg')
}
