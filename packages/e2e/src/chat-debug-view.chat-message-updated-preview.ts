import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-message-updated-preview'

export const skip = 1

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  // arrange
  await Command.execute('Main.openUri', 'chat-debug://e2e-session-chat-message-updated-preview')
  await expect(Locator('.ChatDebugView')).toBeVisible()

  const events = [
    {
      eventId: 156,
      inProgress: false,
      messageId: 'abc',
      sessionId: 'def',
      text: 'Done - preview text only',
      time: '11:17 AM',
      timestamp: '2026-04-07T09:17:45.786Z',
      toolCalls: [],
      type: 'chat-message-updated',
    },
  ]

  await Command.execute('ChatDebug.setEvents', events)
  await Command.execute('ChatDebug.handleInput', 'useDevtoolsLayout', '', true)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  // act
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'preview', false)

  await expect(Locator('.ChatDebugViewDetails')).toBeVisible()
  await expect(detailsEvent).toContainText('Done - I added the vercel entry to the April CSV.')
  await expect(detailsEvent).not.toContainText('messageId')
  await expect(detailsEvent).not.toContainText('toolCalls')
  await expect(detailsEvent).not.toContainText('getWorkspaceUri')
  await expect(detailsEvent).not.toContainText('chat-message-updated')

  await Command.execute('ChatDebug.handleInput', 'detailTab', 'response', false)

  await expect(detailsEvent).toContainText('"messageId": "6f7b2c66-1afb-4cd4-b7f2-2ba8bc56887d"')
  await expect(detailsEvent).toContainText('"toolCalls"')
  await expect(detailsEvent).toContainText('"getWorkspaceUri"')
  await expect(detailsEvent).toContainText('"type": "chat-message-updated"')
}
