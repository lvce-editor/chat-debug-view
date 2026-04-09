import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.devtools-split-role'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-devtools-split-role')

  // act
  await ChatDebug.setEvents([])
  await ChatDebug.useDevtoolsLayout()

  const split = Locator('.ChatDebugViewDevtoolsSplit')

  // assert
  await expect(split).toHaveAttribute('role', 'none')
}
