import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-tabs'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const eventId = Date.now()
  const sessionId = `e2e-session-chat-attachment-added-tabs-${eventId}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute(
    'ChatDebug.appendStoredImageAttachmentForTest',
    sessionId,
    eventId,
    'image/png',
    'diagram.png',
    'canvas',
    '',
    '2026-04-10T11:35:00.000Z',
  )
  await Command.execute('ChatDebug.handleClickRefresh')
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const tabs = Locator('.ChatDebugViewDetailsTop [role="tab"]')

  await expect(tabs).toHaveCount(3)
  await expect(Locator('.ChatDebugViewDetailsTop [name="preview"]')).toHaveCount(1)
  await expect(Locator('.ChatDebugViewDetailsTop [name="payload"]')).toHaveCount(1)
  await expect(Locator('.ChatDebugViewDetailsTop [name="response"]')).toHaveCount(1)
  await expect(Locator('.ChatDebugViewDetailsTop [name="timing"]')).toHaveCount(0)
}
