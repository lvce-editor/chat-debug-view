import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.ai-request-headers-tab'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = `e2e-session-ai-request-headers-tab-${Date.now()}`
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

  const headersTab = Locator('.ChatDebugViewDetailsTop [name="headers"]')
  await expect(headersTab).toBeVisible()

}
