import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.run-in-terminal-error-status'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-run-in-terminal-error-status')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      arguments: {
        options: {
          command: 'echo hello',
          shell: 'bash',
        },
      },
      name: 'run_in_terminal',
      options: {
        platform: 3,
        workspaceUri: '/test/project/playground',
      },
      result: {
        error: 'CommandNotFoundError: Command not found Terminal.executeShellCommand',
      },
      sessionId: 'e2e-session-run-in-terminal-error-status',
      status: 'error',
      timestamp: '2026-04-09T13:54:52.907Z',
      type: 'tool-execution',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()

  const row = Locator('.TableBody .TableRow').nth(0)
  const statusCell = Locator('.ChatDebugViewCellStatusError').nth(0)

  // assert
  await expect(row).toContainText('tool-execution, run_in_terminal')
  await expect(row).toContainText('400')
  await expect(statusCell).toHaveText('400')
}
