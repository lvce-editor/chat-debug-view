import { expect, test } from '@jest/globals'
import { getSelectedDetailTab } from '../src/parts/GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getSelectedDetailTab should return the selected tab name', () => {
  const detailTabs = [
    {
      isSelected: false,
      label: 'Response',
      name: InputName.Response,
    },
    {
      isSelected: true,
      label: 'Preview',
      name: InputName.Preview,
    },
  ]

  expect(getSelectedDetailTab(detailTabs)).toBe(InputName.Preview)
})

test('getSelectedDetailTab should fall back to the response tab when nothing is selected', () => {
  const detailTabs = [
    {
      isSelected: false,
      label: 'Preview',
      name: InputName.Preview,
    },
    {
      isSelected: false,
      label: 'Response',
      name: InputName.Response,
    },
  ]

  expect(getSelectedDetailTab(detailTabs)).toBe(InputName.Response)
})

test('getSelectedDetailTab should fall back to the first tab when response is unavailable', () => {
  const detailTabs = [
    {
      isSelected: false,
      label: 'Preview',
      name: InputName.Preview,
    },
    {
      isSelected: false,
      label: 'Timing',
      name: InputName.Timing,
    },
  ]

  expect(getSelectedDetailTab(detailTabs)).toBe(InputName.Preview)
})

test('getSelectedDetailTab should default to response when there are no tabs', () => {
  expect(getSelectedDetailTab([])).toBe(InputName.Response)
})
