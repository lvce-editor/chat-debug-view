import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-svg-preview'

const svgMarkup =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#0b6"/><circle cx="12" cy="12" r="6" fill="#fff"/></svg>'

const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(svgMarkup)}`

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-chat-attachment-added-svg-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute('ChatDebug.setAttachmentPreviewEventForTest', sessionId, 'diagram.svg', 'image/svg+xml', 'image', svgDataUrl)
  await ChatDebug.useDevtoolsLayout()
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const previewImage = Locator('.ChatDebugViewImagePreviewImage')

  await expect(previewImage).toBeVisible()
  await expect(previewImage).toHaveAttribute('alt', 'diagram.svg')
}
