import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-pills-accessibility'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-quick-filter-pills-accessibility')
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-quick-filter-pills-accessibility',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const quickFilterListbox = Locator('.ChatDebugViewQuickFilters')
  const quickFilterOptions = Locator('.ChatDebugViewQuickFilterPill')
  const allOption = quickFilterOptions.nth(0)
  const toolsOption = quickFilterOptions.nth(1)

  // assert
  await expect(quickFilterListbox).toHaveAttribute('role', 'listbox')
  await expect(quickFilterOptions).toHaveCount(5)
  await expect(allOption).toHaveAttribute('role', 'option')
  await expect(allOption).toContainText('All')
  await expect(toolsOption).toHaveAttribute('role', 'option')
  await expect(toolsOption).toContainText('Tools')
  const locator2 = Locator('.ChatDebugViewQuickFilterPillSelected')
  await expect(locator2).toContainText('All')

  await ChatDebug.setEventCategoryFilter('tools')

  const locator3 = Locator('.ChatDebugViewQuickFilterPillSelected')
  await expect(locator3).toContainText('Tools')
}
