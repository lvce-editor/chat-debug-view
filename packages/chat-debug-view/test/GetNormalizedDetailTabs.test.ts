import { expect, test } from '@jest/globals'
import * as DetailTab from '../src/parts/DetailTab/DetailTab.ts'
import { getNormalizedDetailTabs } from '../src/parts/GetNormalizedDetailTabs/GetNormalizedDetailTabs.ts'

test('getNormalizedDetailTabs should return the existing tabs when there is no selected event', () => {
  const detailTabs = DetailTab.createDetailTabs('payload')

  const result = getNormalizedDetailTabs(null, detailTabs)

  expect(result).toBe(detailTabs)
})

test('getNormalizedDetailTabs should rebuild the tabs for the selected event', () => {
  const selectedEvent = {
    eventId: 1,
    type: 'tool-execution',
  }
  const detailTabs = DetailTab.createDetailTabs('payload')

  const result = getNormalizedDetailTabs(selectedEvent, detailTabs)

  expect(result).toEqual(DetailTab.createDetailTabs('payload', selectedEvent))
})
