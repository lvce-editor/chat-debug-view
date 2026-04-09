import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.top-tag-search'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-top-tag-search')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-top-tag-search',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)

  // assert
  const top = Locator('.ChatDebugViewTop')
  await expect(top).toBeVisible()
  await expect(top).toHaveJSProperty('tagName', 'SEARCH')
}
