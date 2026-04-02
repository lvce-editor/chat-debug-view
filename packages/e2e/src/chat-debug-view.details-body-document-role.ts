import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.details-body-document-role'

export const test: Test = async ({ Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-details-body-document-role')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:00.250Z',
      path: '/chat',
      sessionId: 'e2e-session-details-body-document-role',
      started: '2026-03-08T00:00:00.000Z',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
  ]

  // act
  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)
  await Locator('.ChatDebugViewEventRow').nth(0).click()

  const detailsBody = Locator('.ChatDebugViewDetailsBody')

  // assert
  await expect(detailsBody).toBeVisible()
  await expect(detailsBody).toHaveAttribute('role', 'document')
}
