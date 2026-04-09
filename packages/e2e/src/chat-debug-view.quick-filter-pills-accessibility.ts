import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-pills-accessibility'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-quick-filter-pills-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

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

  const radioInputs = Locator('.ChatDebugViewQuickFilterInput')

  // assert
  await expect(radioInputs).toHaveCount(5)
  await expect(radioInputs.nth(0)).toHaveAttribute('type', 'radio')
  await expect(radioInputs.nth(0)).toHaveAttribute('name', 'eventCategoryFilter')
  await expect(radioInputs.nth(0)).toHaveAttribute('value', 'all')
  await expect(radioInputs.nth(1)).toHaveAttribute('type', 'radio')
  await expect(radioInputs.nth(1)).toHaveAttribute('name', 'eventCategoryFilter')
  await expect(radioInputs.nth(1)).toHaveAttribute('value', 'tools')
  await expect(radioInputs.nth(2)).toHaveAttribute('type', 'radio')
  await expect(radioInputs.nth(2)).toHaveAttribute('name', 'eventCategoryFilter')
  await expect(radioInputs.nth(2)).toHaveAttribute('value', 'network')
  await expect(radioInputs.nth(3)).toHaveAttribute('type', 'radio')
  await expect(radioInputs.nth(3)).toHaveAttribute('name', 'eventCategoryFilter')
  await expect(radioInputs.nth(3)).toHaveAttribute('value', 'ui')
  await expect(radioInputs.nth(4)).toHaveAttribute('type', 'radio')
  await expect(radioInputs.nth(4)).toHaveAttribute('name', 'eventCategoryFilter')
  await expect(radioInputs.nth(4)).toHaveAttribute('value', 'stream')
}
