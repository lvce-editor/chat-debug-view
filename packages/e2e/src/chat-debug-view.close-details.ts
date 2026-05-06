import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.close-details'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-close-details')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      path: '/chat',
      sessionId: 'e2e-session-close-details',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  const closeButton = Locator('.ChatDebugViewDetailsClose')
  const closeIcon = Locator('.ChatDebugViewDetailsClose .MaskIconClose')

  await expect(closeButton).toHaveCount(1)
  await expect(closeIcon).toHaveCount(1)
  await expect(closeIcon).toBeVisible()
  await ChatDebug.closeDetails()

  // assert
  const locator2 = Locator('.ChatDebugViewDetails')
  await expect(locator2).toHaveCount(0)
  const locator3 = Locator('.TableRowSelected')
  await expect(locator3).toHaveCount(0)
}
