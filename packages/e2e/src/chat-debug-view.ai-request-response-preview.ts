import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.ai-request-response-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-ai-request-response-preview-${Date.now()}`
  const previewText = 'hello from response text'

  await ChatDebug.open(sessionId)
  const chatDebugView = Locator('.ChatDebugView')
  await expect(chatDebugView).toBeVisible()

  await ChatDebug.setEvents([
    {
      body: {
        input: [
          {
            content: [
              {
                text: 'hello from request body',
                type: 'input_text',
              },
            ],
            role: 'user',
          },
        ],
        model: 'test-model',
      },
      endValue: {
        headers: {
          'content-type': 'application/json',
        },
        statusCode: 200,
        value: {
          id: 'resp_123',
          object: 'response',
          output: [
            {
              content: [
                {
                  annotations: [],
                  logprobs: [],
                  text: previewText,
                  type: 'output_text',
                },
              ],
              id: 'msg_123',
              role: 'assistant',
              status: 'completed',
              type: 'message',
            },
          ],
          status: 'completed',
        },
      },
      eventId: 1,
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      requestId: 'request-1',
      sessionId,
      timestamp: '2026-05-06T08:09:12.000Z',
      turnId: 'turn-1',
      type: 'ai-request',
      url: '/chat',
    },
  ])

  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(1)

  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')

  await expect(detailsBottom).toHaveText(`1${previewText}`)
  await expect(lineNumbers).toHaveCount(1)
  const lineNumbersNth0 = lineNumbers.nth(0)
  await expect(lineNumbersNth0).toHaveText('1')
}
