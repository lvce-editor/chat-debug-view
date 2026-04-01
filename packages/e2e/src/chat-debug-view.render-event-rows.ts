import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.render-event-rows'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-render-event-rows')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'e2e-session-render-event-rows',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    {
      error: 'tool call failed',
      sessionId: 'e2e-session-render-event-rows',
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  // assert
  const rows = Locator('.ChatDebugViewEventRow')
  await expect(rows).toHaveCount(2)
  await expect(rows.nth(0)).toContainText('request')
  await expect(rows.nth(0)).toContainText('250ms')
  await expect(rows.nth(0)).toContainText('200')
  await expect(rows.nth(1)).toContainText('tool-execution-finished, apply_patch')
  await expect(rows.nth(1)).toContainText('400')
}
