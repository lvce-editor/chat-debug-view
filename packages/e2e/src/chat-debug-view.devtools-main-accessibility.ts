import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-main-accessibility'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-devtools-main-accessibility')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-devtools-main-accessibility',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const devtoolsMain = Locator('.ChatDebugViewDevtoolsMain')

  // assert
  await expect(devtoolsMain).toBeVisible()
  await expect(devtoolsMain).toHaveAttribute('role', 'none')
}
