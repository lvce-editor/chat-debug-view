import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.show-response-part-events-toggle'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-show-response-part-events')
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
  await Command.execute('ChatDebug.setEvents', events)
  await Locator('.ChatDebugViewToggleLabelUseDevtoolsLayout').click()

  // assert default hidden
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(1)

  // act + assert visible when enabled
  await Locator('.ChatDebugViewToggleLabelShowResponsePartEvents').click()
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(1)).toContainText('sse-response-part')
}
