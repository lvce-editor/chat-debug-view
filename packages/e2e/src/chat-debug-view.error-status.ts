import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.error-status'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  await ChatDebug.open('e2e-session-error-status')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      error: 'tool call failed',
      sessionId: 'e2e-session-error-status',
      timestamp: '2026-03-08T00:00:02.000Z',
      toolName: 'apply_patch',
      type: 'tool-execution-finished',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const row = Locator('.ChatDebugViewEventRow').nth(0)
  const statusCell = Locator('.ChatDebugViewCellStatusError').nth(0)

  await expect(row).toContainText('400')
  await expect(statusCell).toContainText('400')
  await expect(statusCell).toHaveCSS('color', 'rgb(241, 76, 76)')
}
