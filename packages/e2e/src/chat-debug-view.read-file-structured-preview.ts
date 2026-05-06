/* eslint-disable @cspell/spellchecker */
import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.read-file-structured-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-read-file-structured-preview'
  const previewText = 'first line\nsecond line'

  await ChatDebug.open(sessionId)
  const locator1 = Locator('.ChatDebugView')
  await expect(locator1).toBeVisible()

  const events = [
    {
      arguments: {
        uri: 'file:///workspace/example.txt',
      },
      name: 'read_file',
      result: [
        {
          content: previewText,
        },
      ],
      sessionId,
      timestamp: '2026-04-29T09:00:00.000Z',
      type: 'tool-execution',
    },
  ]

  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')

  await expect(detailsBottom).toHaveText('12first linesecond line')
}
