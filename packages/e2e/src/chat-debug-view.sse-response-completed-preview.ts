import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.sse-response-completed-preview'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-sse-response-completed-preview'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
  const previewText = 'The folder contains a total of 17 entries.'
  const events = [
    {
      eventId: 1,
      sessionId,
      timestamp: '2026-04-11T07:09:38.827Z',
      type: 'sse-response-completed',
      value: {
        response: {
          output: [
            {
              content: [
                {
                  annotations: [],
                  text: previewText,
                  type: 'output_text',
                },
              ],
              id: 'msg_0b379d317116aef20069d9f3af014881909d122137ffe1c354',
              role: 'assistant',
              status: 'completed',
              type: 'message',
            },
          ],
        },
        type: 'response.completed',
      },
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')
  const lineContents = Locator('.ChatDebugViewEventLineContent')

  await expect(detailsBottom).toHaveText(`1${previewText}`)
  await expect(lineNumbers).toHaveCount(1)
  const lineNumber0 = lineNumbers.nth(0)
  await expect(lineNumber0).toHaveText('1')
  await expect(lineContents).toHaveCount(1)
  const lineContent0 = lineContents.nth(0)
  await expect(lineContent0).toHaveText(previewText)
}
