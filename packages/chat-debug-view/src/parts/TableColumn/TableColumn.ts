export const Type = 'type'
export const Duration = 'duration'
export const Status = 'status'

export const tableColumns = [Type, Duration, Status] as const

export type TableColumn = (typeof tableColumns)[number]

export const defaultVisibleTableColumns: readonly TableColumn[] = tableColumns

export const isTableColumn = (value: string): value is TableColumn => {
  return tableColumns.includes(value as TableColumn)
}

export const getOrderedVisibleTableColumns = (values: readonly string[]): readonly TableColumn[] => {
  const visibleColumns = new Set(values.filter(isTableColumn))
  return tableColumns.filter((column) => visibleColumns.has(column))
}

export const isVisibleTableColumn = (visibleTableColumns: readonly string[], column: TableColumn): boolean => {
  return visibleTableColumns.includes(column)
}
