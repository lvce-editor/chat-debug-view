import { expect, test } from '@jest/globals'
import { getTimelineBadgeStyle } from '../src/parts/GetTimelineBadgeStyle/GetTimelineBadgeStyle.ts'

test('getTimelineBadgeStyle should pin the first badge to the left edge', () => {
  expect(getTimelineBadgeStyle(0, 5)).toBe('left:0;transform:translateX(0);')
})

test('getTimelineBadgeStyle should pin the only badge to the left edge', () => {
  expect(getTimelineBadgeStyle(0, 0)).toBe('left:0;transform:translateX(0);')
})

test('getTimelineBadgeStyle should pin the last badge to the right edge', () => {
  expect(getTimelineBadgeStyle(5, 5)).toBe('left:100%;transform:translateX(-100%);')
})

test('getTimelineBadgeStyle should center intermediate badges proportionally', () => {
  expect(getTimelineBadgeStyle(2, 5)).toBe('left:40%;transform:translateX(-50%);')
})
