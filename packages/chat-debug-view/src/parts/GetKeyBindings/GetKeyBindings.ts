import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'KeyBindings.focusNext',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.focusPrevious',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.focusFirst',
      key: KeyCode.PageUp,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.focusLast',
      key: KeyCode.PageDown,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.selectCurrent',
      key: KeyCode.Space,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.selectCurrent',
      key: KeyCode.Enter,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.acceptWhenExprssion',
      key: KeyCode.Enter,
      when: WhenExpression.FocusKeyBindingsWhenExpression,
    },
    {
      command: 'KeyBindings.focusFirst',
      key: KeyCode.Home,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.focusLast',
      key: KeyCode.End,
      when: WhenExpression.FocusKeyBindingsTable,
    },
    {
      command: 'KeyBindings.cancelEditingWhenExprssion',
      key: KeyCode.Escape,
      when: WhenExpression.FocusKeyBindingsWhenExpression,
    },
    {
      command: 'KeyBindings.handleEscape',
      key: KeyCode.Escape,
      when: WhenExpression.FocusKeyBindingsTable,
    },
  ]
}
