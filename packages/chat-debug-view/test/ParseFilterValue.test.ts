import { expect, test } from '@jest/globals'
import * as EventCategoryFilter from '../src/parts/EventCategoryFilter/EventCategoryFilter.ts'
import { parseFilterValue } from '../src/parts/ParseFilterValue/ParseFilterValue.ts'

test('parseFilterValue should return empty filter state for blank input', () => {
  expect(parseFilterValue('   ')).toEqual({
    eventCategoryFilter: EventCategoryFilter.All,
    filterText: '',
  })
})

test('parseFilterValue should normalize free text', () => {
  expect(parseFilterValue('  REQUEST  PATH  ')).toEqual({
    eventCategoryFilter: EventCategoryFilter.All,
    filterText: 'request path',
  })
})

test('parseFilterValue should enable tools category for @tools filter', () => {
  expect(parseFilterValue('@tools')).toEqual({
    eventCategoryFilter: EventCategoryFilter.Tools,
    filterText: '',
  })
})

test('parseFilterValue should remove @tools from mixed filters', () => {
  expect(parseFilterValue('  @TOOLS  apply_patch  ')).toEqual({
    eventCategoryFilter: EventCategoryFilter.Tools,
    filterText: 'apply_patch',
  })
})

test('parseFilterValue should enable network category for @network filter', () => {
  expect(parseFilterValue('  @NETWORK  ')).toEqual({
    eventCategoryFilter: EventCategoryFilter.Network,
    filterText: '',
  })
})
