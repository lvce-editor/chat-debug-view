import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-duration-alignment'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-table-duration-alignment'

  // act
  await ChatDebug.open(sessionId)

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const durationCell = Locator('.TableBody .ChatDebugViewCellDuration').nth(0)

  // assert
  await expect(durationCell).toHaveText('250 ms')
  await expect(durationCell).toHaveCSS('text-align', 'right')
}
