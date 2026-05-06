import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.details-body-document-role'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-details-body-document-role')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

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
  const locator2 = Locator('.ChatDebugViewDetailsBody')
  await expect(locator2).toHaveCount(0)
  const locator3 = Locator('.ChatDebugViewDetailsPanel')
  await expect(locator3).toHaveCount(0)
}
