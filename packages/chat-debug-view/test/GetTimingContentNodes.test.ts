import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getTimingContentNodes } from '../src/parts/GetTimingContentNodes/GetTimingContentNodes.ts'
import { getTimingDetailsDom } from '../src/parts/GetTimingDetailsDom/GetTimingDetailsDom.ts'

test('getTimingContentNodes should return existing response nodes when there is no selected event', () => {
  const responseEventNodes = [
    {
      childCount: 0,
      className: 'ResponseNode',
      type: VirtualDomElements.Div,
    },
  ]

  const result = getTimingContentNodes(responseEventNodes, null)

  expect(result).toBe(responseEventNodes)
})

test('getTimingContentNodes should render timing details for the selected event', () => {
  const selectedEvent = {
    ended: '2026-03-08T00:00:01.250Z',
    eventId: 1,
    started: '2026-03-08T00:00:01.000Z',
    subType: 'request',
    type: 'request',
  }

  const result = getTimingContentNodes([], selectedEvent)

  expect(result).toEqual(getTimingDetailsDom(selectedEvent))
})
