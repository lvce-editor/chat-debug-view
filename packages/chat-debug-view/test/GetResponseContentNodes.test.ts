import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getEventNode } from '../src/parts/GetEventNode/GetEventNode.ts'
import { getResponseContentNodes } from '../src/parts/GetResponseContentNodes/GetResponseContentNodes.ts'

test('getResponseContentNodes should return existing response nodes when available', () => {
  const responseEventNodes = [
    {
      childCount: 0,
      className: 'ResponseNode',
      type: VirtualDomElements.Div,
    },
  ]

  const result = getResponseContentNodes(responseEventNodes, null)

  expect(result).toBe(responseEventNodes)
})

test('getResponseContentNodes should return an empty array when there is no selected event', () => {
  const result = getResponseContentNodes([], null)

  expect(result).toEqual([])
})

test('getResponseContentNodes should render the selected event when response nodes are missing', () => {
  const selectedEvent = {
    eventId: 1,
    text: 'response preview',
    type: 'chat-message-updated',
  }

  const result = getResponseContentNodes([], selectedEvent)

  expect(result).toEqual(getEventNode(selectedEvent))
})
