import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-message-updated-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-chat-message-updated-preview')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const previewText =
    'Done - preview text only\nThis line should wrap automatically when it is long enough to reach the edge of the preview pane without being cut off.'

  const events = [
    {
      eventId: 156,
      inProgress: false,
      messageId: 'abc',
      sessionId: 'def',
      text: previewText,
      time: '11:17 AM',
      timestamp: '2026-04-07T09:17:45.786Z',
      toolCalls: [],
      type: 'chat-message-updated',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const rawPreviewText = Locator('.ChatDebugViewEventRawText')

  // act
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  // assert
  await expect(Locator('.ChatDebugViewDetails')).toBeVisible()
  await expect(Locator('.ChatDebugViewEventLineNumber')).toHaveCount(0)
  await expect(detailsBottom).toHaveText(previewText)
  await expect(rawPreviewText).toHaveCSS('white-space', 'pre-wrap')
  await expect(rawPreviewText).toHaveCSS('overflow-wrap', 'anywhere')

  // await Command.execute('ChatDebug.handleInput', 'detailTab', 'response', false)

  // await expect(detailsEvent).toContainText('"messageId": "6f7b2c66-1afb-4cd4-b7f2-2ba8bc56887d"')
  // await expect(detailsEvent).toContainText('"toolCalls"')
  // await expect(detailsEvent).toContainText('"getWorkspaceUri"')
  // await expect(detailsEvent).toContainText('"type": "chat-message-updated"')
}
