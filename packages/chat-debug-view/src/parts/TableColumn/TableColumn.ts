import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const Type = 'type'
export const Duration = 'duration'
export const Status = 'status'

export const tableColumnNames = [Type, Status, Duration] as const

export type TableColumnName = (typeof tableColumnNames)[number]

export interface TableColumn {
  readonly isVisible: boolean
  readonly label: string
  readonly name: TableColumnName
}

export const createTableColumns = (): readonly TableColumn[] => {
  return [
    {
      isVisible: true,
      label: ChatDebugStrings.type(),
      name: Type,
    },
    {
      isVisible: true,
      label: ChatDebugStrings.status(),
      name: Status,
    },
    {
      isVisible: true,
      label: ChatDebugStrings.duration(),
      name: Duration,
    },
  ]
}

export const defaultVisibleTableColumns: readonly TableColumnName[] = tableColumnNames

export const isTableColumn = (value: string): value is TableColumnName => {
  return tableColumnNames.includes(value as TableColumnName)
}

export const getVisibleTableColumns = (tableColumns: readonly TableColumn[]): readonly TableColumnName[] => {
  return tableColumns.filter((column) => column.isVisible).map((column) => column.name)
}

export const getTableColumnsWithVisibility = (
  tableColumns: readonly TableColumn[],
  visibleTableColumns: readonly string[],
): readonly TableColumn[] => {
  const visibleColumns = new Set(visibleTableColumns.filter(isTableColumn))
  return tableColumns.map((column) => ({
    ...column,
    isVisible: visibleColumns.has(column.name),
  }))
}

export const getOrderedVisibleTableColumns = (
  values: readonly string[],
  tableColumns: readonly TableColumn[] = createTableColumns(),
): readonly TableColumnName[] => {
  const visibleColumns = new Set(values.filter(isTableColumn))
  return tableColumns.map((column) => column.name).filter((column) => visibleColumns.has(column))
}

export const isVisibleTableColumn = (tableColumns: readonly TableColumn[], column: TableColumnName): boolean => {
  return tableColumns.some((tableColumn) => tableColumn.name === column && tableColumn.isVisible)
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
