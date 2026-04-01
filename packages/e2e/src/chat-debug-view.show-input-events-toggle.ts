import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.show-input-events-toggle'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-toggle')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-toggle',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'handle-input',
      value: 'h',
    },
    {
      sessionId: 'e2e-session-toggle',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'handle-submit',
      value: 'hello',
    },
    {
      sessionId: 'e2e-session-toggle',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'handle-input',
      value: 'he',
    },
  ]
  await Command.execute('ChatDebug.setEvents', events)
  await Locator('input[name="useDevtoolsLayout"]').click()

  const eventRows = Locator('.ChatDebugViewEventRow')
  const toggle = Locator('input[name="showInputEvents"]')

  // assert hidden by default
  await expect(eventRows).toHaveCount(1)

  // act + assert: show input events
  await toggle.click()
  await expect(eventRows).toHaveCount(3)

  // act + assert: hide input events again
  await toggle.click()
  await expect(eventRows).toHaveCount(1)
}
