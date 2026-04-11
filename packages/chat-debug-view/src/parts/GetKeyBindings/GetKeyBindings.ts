import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'ChatDebug.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.focusFirst',
      key: KeyCode.PageUp,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.focusLast',
      key: KeyCode.PageDown,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.selectCurrent',
      key: KeyCode.Space,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.selectCurrent',
      key: KeyCode.Enter,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.acceptWhenExprssion',
      key: KeyCode.Enter,
      when: WhenExpression.FocusKeyBindingsWhenExpression,
    },
    {
      command: 'ChatDebug.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusChatDebugTable,
    },
    {
      command: 'ChatDebug.cancelEditingWhenExprssion',
      key: KeyCode.Escape,
      when: WhenExpression.FocusKeyBindingsWhenExpression,
    },
    {
      command: 'ChatDebug.handleEscape',
      key: KeyCode.Escape,
      when: WhenExpression.FocusChatDebugTable,
    },
  ]
}
