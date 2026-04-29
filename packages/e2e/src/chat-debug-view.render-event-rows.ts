import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.render-event-rows'

export const test: Test = async ({ ChatDebug, expect, FileSystem, Locator, Workspace }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await Workspace.setPath(tmpDir)

  // act
  await ChatDebug.open2({
    events: [
      {
        ended: '2026-03-08T00:00:01.250Z',
        sessionId: 'e2e-session-render-event-rows',
        started: '2026-03-08T00:00:01.000Z',
        timestamp: '2026-03-08T00:00:01.000Z',
        type: 'request',
      },
      {
        error: 'tool call failed',
        sessionId: 'e2e-session-render-event-rows',
        timestamp: '2026-03-08T00:00:02.000Z',
        toolName: 'apply_patch',
        type: 'tool-execution-finished',
      },
    ],
    sessionId: 'e2e-session-render-event-rows',
    useDevtoolsLayout: true,
  })

  // assert
  const rows = Locator('.TableBody .TableRow')
  await expect(rows).toHaveCount(2)
  const firstRow = rows.nth(0)
  await expect(firstRow).toContainText('request')
  await expect(firstRow).toContainText('250 ms')
  await expect(firstRow).toContainText('200')
  const secondRow = rows.nth(1)
  await expect(secondRow).toContainText('tool-execution-finished, apply_patch')
  await expect(secondRow).toContainText('400')
}
