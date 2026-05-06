import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.root-context-menu'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-root-context-menu'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.setEvents([
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
  ])

  const root = Locator('.ChatDebugView')

  await Command.execute('ChatDebug.handleRootContextMenu')

  await expect(root).toBeVisible()
  await expect(Locator('.Menu')).toHaveCount(0)
  await expect(Locator('.MenuItem')).toHaveCount(0)
}
