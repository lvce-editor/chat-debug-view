import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-row-context-menu.probe'

export const skip = 1

export const test: Test = async ({ ChatDebug, ClipBoard, Command, ContextMenu, expect, Locator }) => {
  // arrange
  const sessionId = 'e2e-session-table-row-context-menu-probe'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
  await ClipBoard.enableMemoryClipBoard()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      eventId: 1,
      sessionId,
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    {
      error: 'tool call failed',
      eventId: 2,
      sessionId,
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await Command.execute('ChatDebug.handleTableBodyContextMenu', 100, 164)

  // assert
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(1)
  const menuItem = menuItems.nth(0)
  await expect(menuItem).toHaveText('Copy')

  // act
  await ContextMenu.selectItem('Copy')

  // assert
  await ClipBoard.shouldHaveText(
    JSON.stringify(
      {
        ended: '2026-03-08T00:00:01.250Z',
        eventId: 1,
        sessionId,
        started: '2026-03-08T00:00:01.000Z',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
      null,
      2,
    ),
  )

  await ClipBoard.disableMemoryClipBoard()
}
