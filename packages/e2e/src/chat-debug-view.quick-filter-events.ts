import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-events'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-quick-filter')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-quick-filter',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      name: 'read_file',
      sessionId: 'e2e-session-quick-filter',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'tool-execution',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEventCategoryFilter('tools')

  // assert
  await expect(Locator('.ChatDebugViewQuickFilterPillSelected')).toContainText('Tools')
}
