import { expect, test } from '@jest/globals'
import {
  defaultPreviewTextColumnWidth,
  getPreviewTextCursorFromPoint,
  getPreviewTextCursorStyle,
  previewTextRowHeight,
} from '../src/parts/PreviewTextCursor/PreviewTextCursor.ts'

test('getPreviewTextCursorFromPoint should map pointer coordinates to row and column indices', () => {
  const result = getPreviewTextCursorFromPoint('first line\nsecond', 28, 21)

  expect(result).toEqual({
    columnIndex: 3,
    rowIndex: 1,
  })
})

test('getPreviewTextCursorFromPoint should clamp the row and column to the available text', () => {
  const result = getPreviewTextCursorFromPoint('alpha\nbeta', 999, 999)

  expect(result).toEqual({
    columnIndex: 4,
    rowIndex: 1,
  })
})

test('getPreviewTextCursorFromPoint should clamp negative pointer coordinates to the start of the text', () => {
  const result = getPreviewTextCursorFromPoint('alpha\nbeta', -10, -20)

  expect(result).toEqual({
    columnIndex: 0,
    rowIndex: 0,
  })
})

test('getPreviewTextCursorStyle should render top, left and height from the cursor position', () => {
  const result = getPreviewTextCursorStyle({
    columnIndex: 4,
    rowIndex: 2,
  })

  expect(result).toBe(
    `height: ${previewTextRowHeight}px; left: ${4 * defaultPreviewTextColumnWidth}px; top: ${2 * previewTextRowHeight}px; width: 0px;`,
  )
})
