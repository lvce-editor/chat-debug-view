const RE_SPACE = /\s+/

export const parseFilterValue = (filterValue: string): { readonly filterText: string; readonly toolsOnly: boolean } => {
  const normalizedFilter = filterValue.trim().toLowerCase()
  if (!normalizedFilter) {
    return {
      filterText: '',
      toolsOnly: false,
    }
  }
  const parts = normalizedFilter.split(RE_SPACE)
  const toolsOnly = parts.includes('@tools')
  const filterText = parts.filter((part) => part !== '@tools').join(' ')
  return {
    filterText,
    toolsOnly,
  }
}
