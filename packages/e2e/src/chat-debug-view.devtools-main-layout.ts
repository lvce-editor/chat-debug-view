import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-split-layout'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-devtools-main-layout')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-devtools-main-layout',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // assert
  const split = Locator('.ChatDebugViewDevtoolsSplit')
  await expect(split).toBeVisible()
  await expect(split).toHaveCSS('contain', 'strict')
  await expect(split).toHaveCSS('flex', '1 1 0%')
}
