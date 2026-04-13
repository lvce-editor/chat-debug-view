export interface PreviewTextCursor {
  readonly columnIndex: number
  readonly rowIndex: number
}

export const previewTextRowHeight = 20
export const defaultPreviewTextColumnWidth = 9

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const getPreviewTextCursorFromPoint = (value: string, x: number, y: number): PreviewTextCursor => {
  const lines = value.split('\n')
  const rowIndex = clamp(Math.floor(Math.max(y, 0) / previewTextRowHeight), 0, Math.max(lines.length - 1, 0))
  const line = lines[rowIndex] || ''
  const columnIndex = clamp(Math.floor(Math.max(x, 0) / defaultPreviewTextColumnWidth), 0, line.length)
  return {
    columnIndex,
    rowIndex,
  }
}

export const getPreviewTextCursorStyle = (cursor: PreviewTextCursor): string => {
  return `height: ${previewTextRowHeight}px; left: ${cursor.columnIndex * defaultPreviewTextColumnWidth}px; top: ${cursor.rowIndex * previewTextRowHeight}px; width: 0px;`
}
