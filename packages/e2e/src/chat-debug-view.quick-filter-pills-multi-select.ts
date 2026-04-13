import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.quick-filter-pills-multi-select'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  await ChatDebug.open('e2e-session-quick-filter-pills-multi-select')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      sessionId: 'e2e-session-quick-filter-pills-multi-select',
      timestamp: '2026-03-08T00:00:00.000Z',
      type: 'request',
    },
    {
      name: 'read_file',
      sessionId: 'e2e-session-quick-filter-pills-multi-select',
      timestamp: '2026-03-08T00:00:01.000Z',
      type: 'tool-execution',
    },
    {
      sessionId: 'e2e-session-quick-filter-pills-multi-select',
      timestamp: '2026-03-08T00:00:02.000Z',
      type: 'handle-click',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const rows = Locator('.TableBody .TableRow')
  const selectedPills = Locator('.ChatDebugViewQuickFilterPillSelected')

  await Command.execute('ChatDebug.handleEventCategoryFilter', 'tools', false, false)
  await expect(selectedPills).toHaveCount(1)
  await expect(selectedPills).toContainText('Tools')
  await expect(rows).toHaveCount(1)

  // await Command.execute('ChatDebug.handleEventCategoryFilter', 'network', true, false)
  // await expect(selectedPills).toHaveCount(2)
  // await expect(selectedPills.nth(0)).toContainText('Tools')
  // await expect(selectedPills.nth(1)).toContainText('Network')
  // await expect(rows).toHaveCount(2)

  // await Command.execute('ChatDebug.handleEventCategoryFilter', 'ui', false, false)
  // await expect(selectedPills).toHaveCount(1)
  // await expect(selectedPills).toContainText('UI')
  // await expect(rows).toHaveCount(1)
}
