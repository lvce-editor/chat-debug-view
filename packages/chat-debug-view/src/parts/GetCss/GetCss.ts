import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { clampTableWidth, getDetailsWidth, sashWidth } from '../SplitLayout/SplitLayout.ts'

export const getCss = (state: ChatDebugViewState): string => {
  const tableWidth = clampTableWidth(state.width, state.tableWidth)
  const detailsWidth = getDetailsWidth(state.width, state.tableWidth)
  return `
.ChatDebugView {
  --ChatDebugViewDetailsWidth: ${detailsWidth}px;
  --ChatDebugViewSashWidth: ${sashWidth}px;
  --ChatDebugViewTableWidth: ${tableWidth}px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  gap: 8px;
}

.ChatDebugView--devtools {
  gap: 4px;
}

.ChatDebugViewTop {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ChatDebugViewTop--devtools {
  justify-content: space-between;
}

.ChatDebugViewTop--devtools {
  align-items: stretch;
}

.ChatDebugViewTop .InputBox {
  flex: 1;
}

.ChatDebugViewTop--devtools .ChatDebugViewQuickFilters {
  margin-left: auto;
}

.ChatDebugViewToggle {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.ChatDebugViewToggleLabel {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.ChatDebugViewQuickFilterPill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
}


.ChatDebugViewQuickFilters {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  min-height: 28px;
  padding: 2px;
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 999px;
  background: var(--vscode-editorWidget-background, transparent);
  font-size: 12px;
  line-height: 1;
}

.ChatDebugViewQuickFilterPillSelected {
  border-color: var(--vscode-focusBorder, #007fd4);
  background: var(--vscode-list-activeSelectionBackground, rgba(14, 99, 156, 0.35));
  color: var(--vscode-list-activeSelectionForeground, inherit);
}

.ChatDebugViewQuickFilterInput {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ChatDebugViewEvents {
  display: flex;
  flex-direction: column;
  overflow: auto;
  min-width: 0;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--vscode-scrollbarSlider-background, rgba(121, 121, 121, 0.4)) transparent;
}

.ChatDebugViewEvents--timeline {
  gap: 0;
}

.ChatDebugView--devtools .ChatDebugViewEvents {
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 6px;
  margin-bottom: 0;
  overflow: hidden;
}

.ChatDebugViewEventsFullWidth {
  flex: 1 1 100%;
}

.ChatDebugViewDevtoolsMain {
  display: flex;
  flex: 1;
  align-items: stretch;
  gap: 0;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.ChatDebugViewDevtoolsMain > .ChatDebugViewEvents {
  flex: 0 1 var(--ChatDebugViewTableWidth);
  min-width: 0;
}

.ChatDebugViewDevtoolsMain > .ChatDebugViewEvents.ChatDebugViewEventsFullWidth {
  flex: 1 1 100%;
}

.ChatDebugViewDevtoolsMain > .ChatDebugViewDetails {
  flex: 0 0 var(--ChatDebugViewDetailsWidth);
}

.ChatDebugViewSash {
  flex: 0 0 var(--ChatDebugViewSashWidth);
  display: flex;
  align-items: stretch;
  justify-content: center;
  cursor: col-resize;
  min-height: 0;
}

.ChatDebugViewSashLine {
  width: 1px;
  min-height: 100%;
  background: var(--vscode-editorWidget-border, #454545);
}

.ChatDebugViewSash:hover .ChatDebugViewSashLine {
  background: var(--vscode-focusBorder, #007fd4);
}

.ChatDebugViewTable {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 auto;
}

.ChatDebugViewTimeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-bottom: 1px solid var(--vscode-editorWidget-border, #454545);
  background: color-mix(in srgb, var(--vscode-editorWidget-background, transparent) 82%, var(--vscode-list-hoverBackground, rgba(90, 93, 94, 0.12)) 18%);
}

.ChatDebugViewTimelineTop {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.ChatDebugViewTimelineTitle {
  font-size: 12px;
  font-weight: 600;
}

.ChatDebugViewTimelineSummary {
  font-size: 12px;
  opacity: 0.8;
}

.ChatDebugViewTimelineControls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ChatDebugViewTimelineReset {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 12px;
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
}

.ChatDebugViewTimelineResetSelected {
  border-color: var(--vscode-focusBorder, #007fd4);
  background: var(--vscode-list-activeSelectionBackground, rgba(14, 99, 156, 0.35));
  color: var(--vscode-list-activeSelectionForeground, inherit);
}

.ChatDebugViewTimelineBuckets {
  display: flex;
  align-items: end;
  gap: 4px;
  min-height: 60px;
}

.ChatDebugViewTimelineBucket {
  display: flex;
  align-items: stretch;
  flex: 1 1 10px;
  min-width: 10px;
  min-height: 60px;
  cursor: pointer;
}

.ChatDebugViewTimelinePresetInput {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ChatDebugViewTimelineBucketBar {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  padding: 4px 2px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vscode-list-hoverBackground, rgba(90, 93, 94, 0.18)) 68%, transparent 32%);
}

.ChatDebugViewTimelineBucketSelected .ChatDebugViewTimelineBucketBar,
.ChatDebugViewTimelineBucketBarSelected {
  background: color-mix(in srgb, var(--vscode-charts-blue, #75beff) 72%, transparent 28%);
  border-color: var(--vscode-focusBorder, #007fd4);
}

.ChatDebugViewTimelineBucketUnit {
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: var(--vscode-charts-blue, #75beff);
}

.ChatDebugViewTimelineBucketUnitEmpty {
  opacity: 0.35;
  background: var(--vscode-editorWidget-border, #454545);
}

.ChatDebugViewTableHeader,
.ChatDebugViewEventRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ChatDebugViewTableHeader {
  padding: 4px 8px;
  border-bottom: 1px solid var(--vscode-editorWidget-border, #454545);
  background: var(--vscode-editorWidget-background, transparent);
  position: sticky;
  top: 0;
  z-index: 1;
}

.ChatDebugViewHeaderCell {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.8;
}

.ChatDebugViewTableBody {
  overflow: auto;
  min-height: 0;
  flex: 1 1 auto;
  contain: strict;
}

.ChatDebugViewEventRowLabel {
  display: block;
}

.ChatDebugViewEventRowLabelSelected .ChatDebugViewEventRow,
.ChatDebugViewEventRowSelected {
  background: var(--vscode-list-activeSelectionBackground, rgba(14, 99, 156, 0.35));
  color: var(--vscode-list-activeSelectionForeground, inherit);
}

.ChatDebugViewEventRowInput {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ChatDebugViewEventRow {
  padding: 4px 8px;
  border-bottom: 1px solid var(--vscode-editorWidget-border, #454545);
  cursor: pointer;
}

.ChatDebugViewEventRow:hover {
  background: var(--vscode-list-hoverBackground, rgba(90, 93, 94, 0.31));
}

.ChatDebugViewCell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.ChatDebugViewCellType {
  flex: 1 1 140px;
  min-width: 0;
}

.ChatDebugViewCellTime {
  flex: 1 1 180px;
  min-width: 0;
}

.ChatDebugViewCellDuration {
  flex: 0 0 90px;
  text-align: right;
}

.ChatDebugViewCellStatus {
  flex: 0 0 64px;
  text-align: right;
}

.ChatDebugViewDetails {
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 6px;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  contain: strict;
}

.ChatDebugViewDetailsTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid var(--vscode-editorWidget-border, #454545);
}

.ChatDebugViewDetailsTitle {
  font-size: 12px;
  font-weight: 600;
}

.ChatDebugViewDetailsClose {
  width: 18px;
  height: 18px;
  appearance: none;
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  color: var(--vscode-foreground, #cccccc);
  background: transparent;
}

.ChatDebugViewDetailsClose:hover {
  background: var(--vscode-toolbar-hoverBackground, rgba(90, 93, 94, 0.31));
}

.ChatDebugViewDetailsClose::before,
.ChatDebugViewDetailsClose::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 1px;
  background: currentColor;
}

.ChatDebugViewDetailsClose::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.ChatDebugViewDetailsClose::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.ChatDebugViewDetailsBody {
  overflow: auto;
  padding: 8px;
  flex: 1 1 auto;
  min-height: 0;
  contain: strict;
}

.ChatDebugViewEvents::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.ChatDebugViewEvents::-webkit-scrollbar-track {
  background: transparent;
}

.ChatDebugViewEvents::-webkit-scrollbar-thumb {
  background: var(--vscode-scrollbarSlider-background, rgba(121, 121, 121, 0.4));
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.ChatDebugViewEvents::-webkit-scrollbar-thumb:hover {
  background: var(--vscode-scrollbarSlider-hoverBackground, rgba(100, 100, 100, 0.7));
}

.ChatDebugViewEvents::-webkit-scrollbar-thumb:active {
  background: var(--vscode-scrollbarSlider-activeBackground, rgba(191, 191, 191, 0.4));
}

.ChatDebugViewEvent {
  margin: 0;
  padding: 8px;
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 6px;
  margin-bottom: 8px;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: var(--vscode-editor-font-family, monospace);
  font-size: 12px;
  user-select: text;
}

.ChatDebugViewEmpty {
  opacity: 0.8;
}

.ChatDebugViewError {
  color: var(--vscode-errorForeground, #f14c4c);
  white-space: normal;
}

.TokenText {
  color: var(--vscode-editor-foreground, inherit);
}

.TokenKey {
  color: var(--vscode-symbolIcon-propertyForeground, var(--vscode-editor-foreground, inherit));
}

.TokenString {
  color: var(--vscode-debugTokenExpression-string, var(--vscode-charts-green, #89d185));
}

.TokenNumeric {
  color: var(--vscode-debugTokenExpression-number, var(--vscode-charts-blue, #75beff));
}

.TokenBoolean {
  color: var(--vscode-debugTokenExpression-boolean, var(--vscode-charts-yellow, #dcdcaa));
}

.ChatOrderedList{
  margin:0;
  padding:0;
  padding-left:10px;
}

.ChatOrderedListItem{
  margin:0;
  padding:0;
}

.ChatToolCalls{
  margin:0;
  padding:0;
}
`
}
