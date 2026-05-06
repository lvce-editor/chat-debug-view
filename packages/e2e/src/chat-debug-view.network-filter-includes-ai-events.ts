import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.network-filter-includes-ai-events'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-network-filter-includes-ai-events'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  await ChatDebug.setEvents([
    {
      message: 'not-network',
      sessionId,
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'message',
    },
    {
      body: {
        prompt: 'What is 2 + 2?',
      },
      requestId: 'request-1',
      sessionId,
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'ai-request',
    },
    {
      requestId: 'request-1',
      response: {
        id: 'resp_1',
        output: [
          {
            text: '4',
            type: 'text',
          },
        ],
      },
      sessionId,
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'ai-response-success',
    },
  ])
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(2)

  await Command.execute('ChatDebug.handleEventCategoryFilter', 'network', false, false)

  await expect(rows).toHaveCount(1)
  await expect(rows.nth(0)).toContainText('ai-request')
  await expect(rows.nth(0)).not.toContainText('message')
}
