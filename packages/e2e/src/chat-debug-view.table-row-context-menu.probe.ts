import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.table-row-context-menu.probe'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-table-row-context-menu-probe')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      ended: '2026-03-08T00:00:01.250Z',
      sessionId: 'e2e-session-table-row-context-menu-probe',
      started: '2026-03-08T00:00:01.000Z',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'request',
    },
    {
      error: 'tool call failed',
      sessionId: 'e2e-session-table-row-context-menu-probe',
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  // act
  await Command.execute('ChatDebugView.handleTableBodyContextMenu', 0, 300)

  // assert
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(99)
}
