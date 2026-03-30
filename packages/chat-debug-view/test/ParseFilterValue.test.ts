import { expect, test } from '@jest/globals'
import { parseFilterValue } from '../src/parts/ParseFilterValue/ParseFilterValue.ts'

test('parseFilterValue should return empty filter state for blank input', () => {
  expect(parseFilterValue('   ')).toEqual({
    filterText: '',
    toolsOnly: false,
  })
})

test('parseFilterValue should normalize free text', () => {
  expect(parseFilterValue('  REQUEST  PATH  ')).toEqual({
    filterText: 'request path',
    toolsOnly: false,
  })
})

test('parseFilterValue should enable toolsOnly for @tools filter', () => {
  expect(parseFilterValue('@tools')).toEqual({
    filterText: '',
    toolsOnly: true,
  })
})

test('parseFilterValue should remove @tools from mixed filters', () => {
  expect(parseFilterValue('  @TOOLS  apply_patch  ')).toEqual({
    filterText: 'apply_patch',
    toolsOnly: true,
  })
})