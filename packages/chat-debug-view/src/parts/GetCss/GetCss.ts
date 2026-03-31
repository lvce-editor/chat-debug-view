export const getCss = (): string => {
  return `
.ChatDebugView {
  padding: 8px;
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  box-sizing: border-box;
  gap: 8px;
}

.ChatDebugViewTop {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ChatDebugViewTop .InputBox {
  flex: 1;
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

.ChatDebugViewEventCount {
  font-size: 12px;
  opacity: 0.8;
}

.ChatDebugViewQuickFilters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ChatDebugViewQuickFilterPill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 12px;
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 999px;
  background: var(--vscode-editorWidget-background, transparent);
  cursor: pointer;
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
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--vscode-scrollbarSlider-background, rgba(121, 121, 121, 0.4)) transparent;
}

.ChatDebugView--devtools .ChatDebugViewEvents {
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 6px;
  margin-bottom: 0;
}

.ChatDebugViewEventsFullWidth {
  grid-column: 1 / -1;
}

.ChatDebugViewDevtoolsMain {
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(280px, 45%);
  gap: 8px;
  min-height: 0;
}

.ChatDebugViewTableHeader,
.ChatDebugViewEventRow {
  display: grid;
  grid-template-columns: minmax(140px, 1fr) minmax(180px, 1fr) minmax(180px, 1fr) 90px 64px;
  align-items: center;
  gap: 8px;
}

.ChatDebugViewTableHeader {
  padding: 8px;
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
  padding: 8px;
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
}

.ChatDebugViewCellType {
  font-weight: 600;
}

.ChatDebugViewCellDuration {
  text-align: right;
}

.ChatDebugViewCellStatus {
  text-align: right;
}

.ChatDebugViewDetails {
  border: 1px solid var(--vscode-editorWidget-border, #454545);
  border-radius: 6px;
  overflow: hidden;
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr;
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
