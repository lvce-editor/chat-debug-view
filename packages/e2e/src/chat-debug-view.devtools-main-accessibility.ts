import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-split-accessibility'

export const skip = 1

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

  const devtoolsSplit = Locator('.ChatDebugViewDevtoolsSplit')

  // assert
  await expect(devtoolsSplit).toBeVisible()
  await expect(devtoolsSplit).toHaveAttribute('role', 'none')
}
