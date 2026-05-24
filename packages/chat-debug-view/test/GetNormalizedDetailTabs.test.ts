import { expect, test } from '@jest/globals'
import { createDetailTabs } from '../src/parts/CreateDetailTabs/CreateDetailTabs.ts'
import { getNormalizedDetailTabs } from '../src/parts/GetNormalizedDetailTabs/GetNormalizedDetailTabs.ts'

test('getNormalizedDetailTabs should return the existing tabs when there is no selected event', () => {
  const detailTabs = createDetailTabs('payload')

  const result = getNormalizedDetailTabs(null, detailTabs)

  expect(result).toBe(detailTabs)
})

test('getNormalizedDetailTabs should rebuild the tabs for the selected event', () => {
  const selectedEvent = {
    eventId: 1,
    subType: 'tool-execution',
    type: 'tool-execution',
  }
  const detailTabs = createDetailTabs('payload')

  const result = getNormalizedDetailTabs(selectedEvent, detailTabs)

  expect(result).toEqual(createDetailTabs('payload', selectedEvent))
})
