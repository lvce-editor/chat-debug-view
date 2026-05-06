import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-tabs'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const eventId = Date.now()
  const sessionId = `e2e-session-chat-attachment-added-tabs-${eventId}`
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  await ChatDebug.handleClickRefresh()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const tabs = Locator('.ChatDebugViewDetailsTop [role="tab"]')

  await expect(tabs).toHaveCount(3)
  const locator2 = Locator('.ChatDebugViewDetailsTop [name="preview"]')
  await expect(locator2).toHaveCount(1)
  const locator3 = Locator('.ChatDebugViewDetailsTop [name="payload"]')
  await expect(locator3).toHaveCount(1)
  const locator4 = Locator('.ChatDebugViewDetailsTop [name="response"]')
  await expect(locator4).toHaveCount(1)
  const locator5 = Locator('.ChatDebugViewDetailsTop [name="timing"]')
  await expect(locator5).toHaveCount(0)
}
