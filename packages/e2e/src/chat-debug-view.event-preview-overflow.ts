import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.event-preview-overflow'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-event-preview-overflow')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      eventId: 3,
      message: {
        id: '89016d05-7342-4eb0-b200-8d631e1cea49',
        role: 'user',
        text: 'what tools do you have access to?',
        time: '02:05 PM',
      },
      sessionId: 'e2e-session-event-preview-overflow',
      timestamp: '2026-04-09T12:05:40.910Z',
      type: 'chat-message-added',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  await expect(detailsEvent).toHaveCSS('overflow', 'auto')
}
