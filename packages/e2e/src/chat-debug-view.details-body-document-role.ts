import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.details-body-document-role'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-details-body-document-role')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-details-body-document-role',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')

  // assert
  await expect(detailsBottom).toBeVisible()
  await expect(detailsBottom).toHaveAttribute('role', 'tabpanel')
  await expect(Locator('.ChatDebugViewDetailsBody')).toHaveCount(0)
  await expect(Locator('.ChatDebugViewDetailsPanel')).toHaveCount(0)
}
