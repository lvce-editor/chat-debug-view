import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-row-open-in-new-tab'

export const test: Test = async ({ ChatDebug, Command, ContextMenu, expect, Locator, Main }) => {
  const sessionId = `e2e-session-table-row-open-in-new-tab-${Date.now()}`
  await ChatDebug.open(sessionId)
  const chatDebugView = Locator('.ChatDebugView')
  await expect(chatDebugView).toBeVisible()

  const event = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    sessionId,
    started: '2026-03-08T00:00:01.000Z',
    timestamp: '2026-03-08T00:00:01.000Z',
    type: 'request',
  }

  await ChatDebug.setEvents([event])
  await ChatDebug.useDevtoolsLayout()

  await Command.execute('ChatDebug.handleTableBodyContextMenu', 100, 164)

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(2)
  await expect(menuItems.nth(0)).toHaveText('Copy')
  await expect(menuItems.nth(1)).toHaveText('Open in New Tab')

  await ContextMenu.selectItem('Open in New Tab')

  await Main.selectTab(0, 1)
  await expect(chatDebugView).toBeHidden()
}
