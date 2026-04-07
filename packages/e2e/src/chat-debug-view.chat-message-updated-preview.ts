import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.chat-message-updated-preview'

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
  await Command.execute('ChatDebug.handleUseDevtoolsLayout', true)

  const detailsEvent = Locator('.ChatDebugViewEvent')

  // act
  await ChatDebug.selectEventRow(0)
  await Command.execute('ChatDebug.handleDetailTab', 'preview')

  await expect(Locator('.ChatDebugViewDetails')).toBeVisible()
  await expect(detailsEvent).toHaveText('1"Done - preview text only"')

  // await Command.execute('ChatDebug.handleDetailTab', 'response')

  // await expect(detailsEvent).toContainText('"messageId": "6f7b2c66-1afb-4cd4-b7f2-2ba8bc56887d"')
  // await expect(detailsEvent).toContainText('"toolCalls"')
  // await expect(detailsEvent).toContainText('"getWorkspaceUri"')
  // await expect(detailsEvent).toContainText('"type": "chat-message-updated"')
}
