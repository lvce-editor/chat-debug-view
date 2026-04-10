import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-attachment-added-preview'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('e2e-session-chat-attachment-added-preview')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      attachment: {
        id: 'attachment-1',
        mimeType: 'image/png',
        name: 'diagram.png',
        uri: 'file:///workspace/diagram.png',
      },
      eventId: 7,
      sessionId: 'e2e-session-chat-attachment-added-preview',
      timestamp: '2026-04-10T11:35:00.000Z',
      type: 'chat-attachment-added',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  // assert
  await expect(detailsEvent).toContainText('diagram.png')
}
