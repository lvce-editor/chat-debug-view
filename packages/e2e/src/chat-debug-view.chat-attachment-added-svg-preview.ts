import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-svg-preview'

const svgDataUrl = [
  'data:image/svg+xml,',
  '%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E',
  '%3Crect%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%230b6%22/%3E',
  '%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%226%22%20fill%3D%22%23fff%22/%3E',
  '%3C/svg%3E',
].join('')

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
