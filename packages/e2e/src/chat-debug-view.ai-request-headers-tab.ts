import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.ai-request-headers-tab'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = `e2e-session-ai-request-headers-tab-${Date.now()}`
  await ChatDebug.open(sessionId)
  const chatDebugView = Locator('.ChatDebugView')
  await expect(chatDebugView).toBeVisible()

  await ChatDebug.setEvents([
    {
      endValue: {
        headers: {
          Server: 'test-server',
        },
        statusCode: 201,
      },
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

  await Command.execute('ChatDebug.handleInput', 'detailTab', 'headers', false)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const headersTable = Locator('.ChatDebugViewHeadersTable')
  const rows = Locator('.ChatDebugViewHeadersBody .ChatDebugViewHeadersRow')

  await expect(detailsBottom).toContainText('General')
  await expect(detailsBottom).toContainText('Request URL')
  await expect(detailsBottom).toContainText('/chat')
  await expect(detailsBottom).toContainText('Request Method')
  await expect(detailsBottom).toContainText('POST')
  await expect(detailsBottom).toContainText('Status Code')
  await expect(detailsBottom).toContainText('201')
  await expect(headersTable).toBeVisible()
  await expect(headersTable).toContainText('Name')
  await expect(headersTable).toContainText('Value')
  await expect(rows).toHaveCount(6)
  const rowsNth3 = rows.nth(3)
  await expect(rowsNth3).toContainText('Authorization')
  await expect(rowsNth3).toContainText('Bearer [redacted]')
  const rowsNth4 = rows.nth(4)
  await expect(rowsNth4).toContainText('Content-Type')
  await expect(rowsNth4).toContainText('application/json')
  const rowsNth5 = rows.nth(5)
  await expect(rowsNth5).toContainText('Server')
  await expect(rowsNth5).toContainText('test-server')
}
