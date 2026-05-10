import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.request-response-merged'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = `e2e-session-request-response-merged-${Date.now()}`

  await ChatDebug.open(sessionId)
  const chatDebugView = Locator('.ChatDebugView')
  await expect(chatDebugView).toBeVisible()

  await ChatDebug.setEvents([
    {
      duration: 250,
      endTimestamp: '2026-03-08T00:00:00.250Z',
      requestValue: {
        input: [
          {
            content: 'hello from e2e',
            role: 'user',
          },
        ],
        model: 'gpt-5.4',
      },
      responseValue: {
        id: 'resp_1',
        output: [
          {
            content: [
              {
                text: 'hello from merged response',
                type: 'output_text',
              },
            ],
          },
        ],
      },
      sessionId,
      startTimestamp: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.250Z',
      type: 'ai-request-finished',
    },
  ])
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  const firstRow = rows.nth(0)

  await expect(rows).toHaveCount(1)
<<<<<<< HEAD
  await expect(firstRow).toContainText('ai-request-finished')
  await expect(firstRow).toContainText('250 ms')
  await expect(firstRow).toContainText('200')

  await ChatDebug.selectEventRow(0)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const payloadTab = Locator('.ChatDebugViewDetailsTop [name="payload"]')
  const responseTab = Locator('.ChatDebugViewDetailsTop [name="response"]')

  await expect(payloadTab).toBeVisible()
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'payload', false)
  await expect(detailsBottom).toContainText('"hello from e2e"')
  await expect(detailsBottom).toContainText('"gpt-5.4"')

  await expect(responseTab).toBeVisible()
  await ChatDebug.openTabResponse()
  await expect(detailsBottom).toContainText('"resp_1"')
  await expect(detailsBottom).toContainText('"hello from merged response"')
=======
  const rowsNth0 = rows.nth(0)
  await expect(rowsNth0).toContainText('ai-request')
  await expect(rowsNth0).toContainText('250 ms')
  await expect(rowsNth0).toContainText('200')
>>>>>>> origin/main
}
