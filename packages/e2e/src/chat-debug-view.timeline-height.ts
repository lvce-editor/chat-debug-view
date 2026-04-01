import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.timeline-height'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-timeline-height')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-timeline-height',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      sessionId: 'e2e-session-timeline-height',
      timestamp: '2026-03-08T00:00:10.000Z',
      type: 'response',
    },
  ]

  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  const timeline = Locator('.ChatDebugViewTimeline')
  await expect(timeline).toBeVisible()

  const height = await timeline.evaluate((node) => {
    return Math.round(node.getBoundingClientRect().height)
  })

  expect(height).toBe(89)
}
