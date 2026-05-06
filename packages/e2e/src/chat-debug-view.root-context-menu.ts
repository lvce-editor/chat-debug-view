import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.root-context-menu'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = 'e2e-session-root-context-menu'
  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()
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
  const locator2 = Locator('.Menu')
  await expect(locator2).toHaveCount(0)
  const locator3 = Locator('.MenuItem')
  await expect(locator3).toHaveCount(0)
}
