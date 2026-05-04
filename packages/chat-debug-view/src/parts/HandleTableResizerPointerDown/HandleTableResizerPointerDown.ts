import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

const getTableResizerId = (name: string): number => {
  switch (name) {
    case 'ResizerOne':
      return 1
    case 'ResizerTwo':
      return 2
    case 'ResizerThree':
      return 3
    default:
      return 0
  }
}

export const handleTableResizerPointerDown = (state: ChatDebugViewState, name: string, clientX: number): ChatDebugViewState => {
  return {
    ...state,
    tableResizerDownId: getTableResizerId(name),
  }
}
