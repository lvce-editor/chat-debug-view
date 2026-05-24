import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getEventNode } from '../src/parts/GetEventNode/GetEventNode.ts'
import { getPayloadContentNodes } from '../src/parts/GetPayloadContentNodes/GetPayloadContentNodes.ts'
import { getPayloadEvent } from '../src/parts/GetPayloadEvent/GetPayloadEvent.ts'

test('getPayloadContentNodes should return existing payload nodes when available', () => {
  const payloadEventNodes = [
    {
      childCount: 0,
      className: 'PayloadNode',
      type: VirtualDomElements.Div,
    },
  ]

  const result = getPayloadContentNodes(payloadEventNodes, null)

  expect(result).toBe(payloadEventNodes)
})

test('getPayloadContentNodes should return an empty array when there is no selected event', () => {
  const result = getPayloadContentNodes([], null)

  expect(result).toEqual([])
})

test('getPayloadContentNodes should render the selected event payload', () => {
  const selectedEvent = {
    arguments: {
      uri: 'file:///workspace',
    },
    eventId: 1,
    name: 'list_files',
    result: {
      entries: [],
      ignored: false,
    },
    subType: 'tool-execution',
    type: 'tool-execution',
  }

  const result = getPayloadContentNodes([], selectedEvent)

  expect(result).toEqual(getEventNode(getPayloadEvent(selectedEvent)))
})
