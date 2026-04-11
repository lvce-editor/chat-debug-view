import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.show-response-part-events-toggle'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-show-response-part-events')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-show-response-part-events',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-show-response-part-events',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'sse-response-part',
      value: {
        type: 'response.output_text.delta',
      },
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert default hidden
  const rows = Locator('.TableRow')
  await expect(rows).toHaveCount(1)

  // act + assert visible when enabled
  await ChatDebug.setShowResponsePartEvents(true)
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(1)).toContainText('sse-response-part')
}
