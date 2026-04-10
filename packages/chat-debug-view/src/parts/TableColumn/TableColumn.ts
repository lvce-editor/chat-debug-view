import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const Type = 'type'
export const Duration = 'duration'
export const Status = 'status'

export const tableColumnNames = [Type, Duration, Status] as const

export type TableColumnName = (typeof tableColumnNames)[number]

export interface TableColumn {
  readonly label: string
  readonly name: TableColumnName
}

export const createTableColumns = (): readonly TableColumn[] => {
  return [
    {
      label: ChatDebugStrings.type(),
      name: Type,
    },
    {
      label: ChatDebugStrings.duration(),
      name: Duration,
    },
    {
      label: ChatDebugStrings.status(),
      name: Status,
    },
  ]
}

export const defaultVisibleTableColumns: readonly TableColumnName[] = tableColumnNames

export const isTableColumn = (value: string): value is TableColumnName => {
  return tableColumnNames.includes(value as TableColumnName)
}

export const getOrderedVisibleTableColumns = (
  values: readonly string[],
  tableColumns: readonly TableColumn[] = createTableColumns(),
): readonly TableColumnName[] => {
  const visibleColumns = new Set(values.filter(isTableColumn))
  return tableColumns.map((column) => column.name).filter((column) => visibleColumns.has(column))
}

export const isVisibleTableColumn = (visibleTableColumns: readonly string[], column: TableColumnName): boolean => {
  return visibleTableColumns.includes(column)
}

export const getTableColumnLabel = (tableColumns: readonly TableColumn[], name: TableColumnName): string => {
  const match = tableColumns.find((column) => column.name === name)
  if (match) {
    return match.label
  }
  switch (name) {
    case Duration:
      return ChatDebugStrings.duration()
    case Status:
      return ChatDebugStrings.status()
    case Type:
      return ChatDebugStrings.type()
    default:
      return name
  }
}
