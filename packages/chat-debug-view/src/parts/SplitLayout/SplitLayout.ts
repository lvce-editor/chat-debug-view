export const defaultTableWidth = 480
export const minTableWidth = 240
export const minDetailsWidth = 280
export const sashWidth = 8
export const viewPadding = 8
export const timelineHorizontalPadding = 10
export const horizontalPadding = viewPadding * 2
export const leftPadding = viewPadding

export const getMainWidth = (width: number): number => {
  return Math.max(0, width - horizontalPadding)
}

export const clampTableWidth = (width: number, tableWidth: number): number => {
  const mainWidth = getMainWidth(width)
  const maxTableWidth = Math.max(0, mainWidth - minDetailsWidth - sashWidth)
  const minClampedTableWidth = Math.min(minTableWidth, maxTableWidth)
  return Math.max(minClampedTableWidth, Math.min(tableWidth, maxTableWidth))
}

export const getDetailsWidth = (width: number, tableWidth: number): number => {
  const mainWidth = getMainWidth(width)
  const clampedTableWidth = clampTableWidth(width, tableWidth)
  return Math.max(0, mainWidth - clampedTableWidth - sashWidth)
}

export const getTableWidthFromClientX = (viewX: number, width: number, clientX: number): number => {
  const nextTableWidth = clientX - viewX - leftPadding
  return clampTableWidth(width, nextTableWidth)
}
