import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.filter-input-max-width'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-filter-input-width')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-filter-input-width',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const filterInput = Locator('.ChatDebugViewFilterInput--devtools')
  await expect(filterInput).toBeVisible()
  await expect(filterInput).toHaveCSS('max-width', '80px')
  await expect(filterInput).toHaveJSProperty('offsetWidth', 80)
}
