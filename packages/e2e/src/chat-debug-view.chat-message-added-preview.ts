import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-message-added-preview'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await ChatDebug.open('ff68dd2f-6053-453f-95a9-de785f33f67c')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      eventId: 3,
      message: {
        id: '89016d05-7342-4eb0-b200-8d631e1cea49',
        role: 'user',
        text: 'what tools do you have access to?',
        time: '02:05 PM',
      },
      sessionId: 'ff68dd2f-6053-453f-95a9-de785f33f67c',
      timestamp: '2026-04-09T12:05:40.910Z',
      type: 'chat-message-added',
    },
  ]

  // act
  await ChatDebug.setEvents(events)
  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')

  // assert
  await expect(detailsBottom).toHaveText('1what tools do you have access to?')

  // act
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'response', false)

  // assert
  await expect(detailsBottom).toContainText('"message"')
  await expect(detailsBottom).toContainText('"text": "what tools do you have access to?"')
  await expect(detailsBottom).toContainText('"type": "chat-message-added"')
}
