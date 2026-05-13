import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.headers-general-collapse'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = `e2e-session-headers-general-collapse-${Date.now()}`
  await ChatDebug.open(sessionId)
  const chatDebugView = Locator('.ChatDebugView')
  await expect(chatDebugView).toBeVisible()

  await ChatDebug.setEvents([
    {
      body: {
        input: [
          {
            content: 'You are an AI programming assistant running inside a code editor.',
            role: 'system',
          },
        ],
        model: 'test',
      },
      endValue: {
        headers: {
          ETag: 'W/"test-etag"',
        },
        statusCode: 304,
      },
      eventId: 1,
      headers: {
        Authorization: 'Bearer [redacted]',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      requestId: '694691a-245f-4826-80aa-d1f45ae7a5b8',
      sessionId,
      timestamp: '2026-05-06T12:03:43.015Z',
      type: 'ai-request',
      url: '/chat',
    },
  ])

  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'headers', false)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const generalHeading = Locator('.ChatDebugViewHeadersSectionHeading[value="general"]')
  const requestUrl = detailsBottom.locator('text=Request URL')

  await expect(generalHeading).toBeVisible()
  await expect(requestUrl).toHaveCount(1)

  await Command.execute('ChatDebug.handleInput', 'toggleHeadersSection', 'general', false)
  await expect(requestUrl).toHaveCount(0)

  await Command.execute('ChatDebug.handleInput', 'toggleHeadersSection', 'general', false)
  await expect(requestUrl).toHaveCount(1)
}
