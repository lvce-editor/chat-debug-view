import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.sse-response-completed-output-preview'

export const skip = 1

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-sse-response-completed-output-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()
  const events = [
    {
      eventId: 1,
      sessionId,
      timestamp: '2026-04-28T15:02:41.421Z',
      type: 'sse-response-completed',
      value: {
        response: {
          output: [
            {
              id: 'rs_0f9eb61bf6f93c680069f0cc0f80b081938bfa0e0964c34c18',
              summary: [],
              type: 'reasoning',
            },
            {
              arguments: '{"includeIgnoredFiles":false,"includePattern":"src/**"}',
              call_id: 'call_nw3KprMfQh8CTOv0xbe7CSg',
              name: 'grep_search',
              status: 'completed',
              type: 'function_call',
            },
          ],
        },
        type: 'response.completed',
      },
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom .EditorContent')

  await expect(detailsBottom).toContainText('"type": "reasoning"')
  await expect(detailsBottom).toContainText('"name": "grep_search"')
  await expect(detailsBottom).not.toContainText('"timestamp": "2026-04-28T15:02:41.421Z"')
  await expect(detailsBottom).not.toContainText('"response": {')
  await expect(detailsBottom).not.toContainText('"value": {')
}
