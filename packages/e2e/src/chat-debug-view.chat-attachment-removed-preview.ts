import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-removed-preview'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const eventId = Date.now()
  const sessionId = `e2e-session-chat-attachment-removed-preview-${eventId}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute(
    'ChatDebug.appendStoredRemovedImageAttachmentForTest',
    sessionId,
    eventId,
    'image/png',
    'diagram-removed.png',
    'canvas',
    '',
    '2026-04-10T11:35:00.000Z',
  )
  await ChatDebug.handleClickRefresh()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const previewImage = Locator('.ChatDebugViewImagePreviewImage')
  const previewStats = Locator('.ChatDebugViewImagePreviewLabel')

  await expect(previewImage).toBeVisible()
  await expect(previewImage).toHaveAttribute('alt', 'diagram-removed.png')
  await expect(previewStats).toContainText('2 × 2 px')
}
