import type { HeaderSectionKey } from '../HeaderSectionKey/HeaderSectionKey.ts'
import * as HeaderSectionKeyModule from '../HeaderSectionKey/HeaderSectionKey.ts'
import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'

const removeSection = (collapsedHeaderSections: readonly HeaderSectionKey[], section: HeaderSectionKey): readonly HeaderSectionKey[] => {
  return collapsedHeaderSections.filter((value) => value !== section)
}

export const toggleHeadersSection = (state: ChatDebugViewState, value: string): ChatDebugViewState => {
  if (!HeaderSectionKeyModule.isHeaderSectionKey(value)) {
    return state
  }
  const isCollapsed = state.collapsedHeaderSections.includes(value)
  return {
    ...state,
    collapsedHeaderSections: isCollapsed ? removeSection(state.collapsedHeaderSections, value) : [...state.collapsedHeaderSections, value],
  }
}
