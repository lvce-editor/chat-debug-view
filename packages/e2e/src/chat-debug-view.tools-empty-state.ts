import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.tools-empty-state'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-tools-empty-state')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-tools-empty-state',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
      url: 'https://example.com/chat',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const toolsPill = Locator('.ChatDebugViewQuickFilterPill').nth(1)
  await ChatDebug.setEventCategoryFilter('tools')

  // assert
  await expect(toolsPill).toContainText('Tools')
  const locator2 = Locator('.ChatDebugViewQuickFilterPillSelected')
  await expect(locator2).toContainText('Tools')
  const locator3 = Locator('.ChatDebugViewEmpty')
  await expect(locator3).toBeVisible()
  const locator4 = Locator('.ChatDebugViewEmpty')
  await expect(locator4).toContainText('No tool call events.')
  const locator5 = Locator('.TableRow')
  await expect(locator5).toHaveCount(0)
}
