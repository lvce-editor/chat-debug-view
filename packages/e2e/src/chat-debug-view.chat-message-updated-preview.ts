import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-message-updated-preview'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  const previewText =
    'Done - preview text only\nThis line should wrap automatically when it is long enough to reach the edge of the preview pane without being cut off.'
  await ChatDebug.open2({
    events: [
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
    ],
    sessionId: 'e2e-session-chat-message-updated-preview',
    useDevtoolsLayout: true,
  })

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const rawPreviewText = Locator('.ChatDebugViewEventRawText')
  await ChatDebug.selectEventRow(0)

  // act
  await ChatDebug.openTabPreview()

  // assert
  await expect(Locator('.ChatDebugViewDetails')).toBeVisible()
  await expect(Locator('.ChatDebugViewEventLineNumber')).toHaveCount(0)
  await expect(detailsBottom).toHaveText(previewText)
  await expect(rawPreviewText).toHaveCSS('white-space', 'pre-wrap')
  await expect(rawPreviewText).toHaveCSS('overflow-wrap', 'anywhere')
}
