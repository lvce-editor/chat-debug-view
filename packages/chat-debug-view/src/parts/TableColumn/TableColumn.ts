import type { TableColumnWidths } from '../TableColumnLayout/TableColumnWidths.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'

export const Type = 'type'
export const Method = 'method'
export const Duration = 'duration'
export const Status = 'status'
export const Size = 'size'

export const tableColumnNames = [Type, Method, Status, Size, Duration] as const

export type TableColumnName = (typeof tableColumnNames)[number]

export interface TableColumn {
  readonly defaultWidth: number
  readonly isVisible: boolean
  readonly label: string
  readonly minimumWidth: number
  readonly name: TableColumnName
  readonly width: number
}

const tableColumnDefinitions: Record<TableColumnName, { readonly defaultWidth: number; readonly label: string; readonly minimumWidth: number }> = {
  [Duration]: {
    defaultWidth: 110,
    label: ChatDebugStrings.duration(),
    minimumWidth: 80,
  },
  [Method]: {
    defaultWidth: 90,
    label: ChatDebugStrings.method(),
    minimumWidth: 56,
  },
  [Size]: {
    defaultWidth: 100,
    label: ChatDebugStrings.size(),
    minimumWidth: 80,
  },
  [Status]: {
    defaultWidth: 110,
    label: ChatDebugStrings.status(),
    minimumWidth: 56,
  },
  [Type]: {
    defaultWidth: 260,
    label: ChatDebugStrings.type(),
    minimumWidth: 80,
  },
}

export const createTableColumns = (): readonly TableColumn[] => {
  return tableColumnNames.map((name) => {
    const definition = tableColumnDefinitions[name]
    return {
      defaultWidth: definition.defaultWidth,
      isVisible: true,
      label: definition.label,
      minimumWidth: definition.minimumWidth,
      name,
      width: definition.defaultWidth,
    }
  })
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

export const getTableColumnByName = (tableColumns: readonly TableColumn[], name: TableColumnName): TableColumn | undefined => {
  return tableColumns.find((column) => column.name === name)
}

export const getTableColumnWidth = (tableColumns: readonly TableColumn[], name: TableColumnName): number => {
  return getTableColumnByName(tableColumns, name)?.width ?? 0
}

export const getTableColumnMinimumWidth = (tableColumns: readonly TableColumn[], name: TableColumnName): number => {
  return getTableColumnByName(tableColumns, name)?.minimumWidth ?? 0
}

export const getTableColumnWidths = (tableColumns: readonly TableColumn[]): TableColumnWidths => {
  return {
    duration: getTableColumnWidth(tableColumns, Duration),
    method: getTableColumnWidth(tableColumns, Method),
    size: getTableColumnWidth(tableColumns, Size),
    status: getTableColumnWidth(tableColumns, Status),
    type: getTableColumnWidth(tableColumns, Type),
  }
}

export const setTableColumnWidths = (tableColumns: readonly TableColumn[], tableColumnWidths: TableColumnWidths): readonly TableColumn[] => {
  return tableColumns.map((column) => ({
    ...column,
    width: tableColumnWidths[column.name],
  }))
}

export const setTableColumnWidth = (tableColumns: readonly TableColumn[], columnName: TableColumnName, width: number): readonly TableColumn[] => {
  return tableColumns.map((column) => {
    if (column.name !== columnName) {
      return column
    }
    return {
      ...column,
      width,
    }
  })
}

export const getOrderedVisibleTableColumns = (
  values: readonly string[] = defaultVisibleTableColumns,
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
    case Method:
      return ChatDebugStrings.method()
    case Size:
      return ChatDebugStrings.size()
    case Status:
      return ChatDebugStrings.status()
    case Type:
      return ChatDebugStrings.type()
    default:
      return name
  }
}
