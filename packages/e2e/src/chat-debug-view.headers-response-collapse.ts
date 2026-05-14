import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.headers-response-collapse'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = `e2e-session-headers-response-collapse-${Date.now()}`
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
  const responseHeadersHeading = Locator('.ChatDebugViewHeadersSectionHeading[value="responseHeaders"]')
  const etagHeader = detailsBottom.locator('text=ETag')
  const responseHeadersInfo = detailsBottom.locator('text=Some headers may not be displayed due to Access-Control-Expose-Headers header.')
  const responseHeadersInfoLink = detailsBottom.locator('.ChatDebugViewHeadersSectionInfo a')

  await expect(responseHeadersHeading).toBeVisible()
  await expect(responseHeadersHeading).toHaveAttribute('aria-expanded', 'true')
  await expect(etagHeader).toHaveCount(1)
  await expect(responseHeadersInfo).toHaveCount(1)
  await expect(responseHeadersInfoLink).toHaveCount(1)
  await expect(responseHeadersInfoLink).toHaveText('Access-Control-Expose-Headers')
  await expect(responseHeadersInfoLink).toHaveAttribute(
    'href',
    'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers',
  )
  await expect(responseHeadersInfoLink).toHaveAttribute('target', '_blank')
  await expect(responseHeadersInfoLink).toHaveAttribute('rel', 'noopener noreferrer')

  await Command.execute('ChatDebug.handleInput', 'toggleHeadersSection', 'responseHeaders', false)
  await expect(responseHeadersHeading).toHaveAttribute('aria-expanded', 'false')
  await expect(etagHeader).toHaveCount(0)
  await expect(responseHeadersInfo).toHaveCount(0)
  await expect(responseHeadersInfoLink).toHaveCount(0)

  await Command.execute('ChatDebug.handleInput', 'toggleHeadersSection', 'responseHeaders', false)
  await expect(responseHeadersHeading).toHaveAttribute('aria-expanded', 'true')
  await expect(etagHeader).toHaveCount(1)
  await expect(responseHeadersInfo).toHaveCount(1)
  await expect(responseHeadersInfoLink).toHaveCount(1)
}
