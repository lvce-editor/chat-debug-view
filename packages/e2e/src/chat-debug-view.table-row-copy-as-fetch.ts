import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-row-copy-as-fetch'

export const test: Test = async ({ ChatDebug, ClipBoard, Command, ContextMenu, expect, Locator }) => {
  const sessionId = `e2e-session-table-row-copy-as-fetch-${Date.now()}`
  await ChatDebug.open(sessionId)
  const chatDebugView = Locator('.ChatDebugView')
  await expect(chatDebugView).toBeVisible()

  const events = [
    {
      body: {
        input: 'hello',
      },
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
      url: 'https://example.com/chat',
    },
    {
      eventId: 2,
      sessionId,
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]

  await ClipBoard.enableMemoryClipBoard()
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  await Command.execute('ChatDebug.handleTableBodyContextMenu', 100, 164)

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)
  const menuItemsNth0 = menuItems.nth(0)
  await expect(menuItemsNth0).toHaveText('Copy')
  const menuItemsNth1 = menuItems.nth(1)
  await expect(menuItemsNth1).toHaveText('Copy As Fetch')
  const menuItemsNth2 = menuItems.nth(2)
  await expect(menuItemsNth2).toHaveText('Open in New Tab')

  await ContextMenu.selectItem('Copy')
  await Command.execute('ChatDebug.handleTableRowCopyAsFetch', 0)

  await ClipBoard.shouldHaveText(`fetch('https://example.com/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer test-token',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    {
      "input": "hello"
    }
  ),
})`)

  await ClipBoard.disableMemoryClipBoard()
}
