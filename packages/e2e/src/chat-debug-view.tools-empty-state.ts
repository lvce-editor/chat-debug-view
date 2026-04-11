import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.tools-empty-state'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-tools-empty-state')
  await expect(Locator('.ChatDebugView')).toBeVisible()

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
  await expect(Locator('.ChatDebugViewQuickFilterPillSelected')).toContainText('Tools')
  await expect(Locator('.ChatDebugViewEmpty')).toBeVisible()
  await expect(Locator('.ChatDebugViewEmpty')).toContainText('No tool call events.')
  await expect(Locator('.TableRow')).toHaveCount(0)
}
