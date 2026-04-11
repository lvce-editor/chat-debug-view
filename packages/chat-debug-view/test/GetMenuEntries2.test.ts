import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'
import { MenuChatDebugTableHeader } from '../src/parts/HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import { MenuChatDebugTableBody } from '../src/parts/HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import { createDefaultState } from '../src/parts/State/CreateDefaultState.ts'

test('getMenuEntries2 should return checked table header entries and reset action', () => {
  const state = createDefaultState()

  const result = getMenuEntries2(state, {
    menuId: MenuChatDebugTableHeader,
  })

  expect(result).toEqual([
    {
      args: ['type'],
      command: 'ChatDebug.toggleTableColumnVisibility',
      flags: MenuItemFlags.Checked,
      id: 'type',
      label: 'Type',
    },
    {
      args: ['duration'],
      command: 'ChatDebug.toggleTableColumnVisibility',
      flags: MenuItemFlags.Checked,
      id: 'duration',
      label: 'Time',
    },
    {
      args: ['status'],
      command: 'ChatDebug.toggleTableColumnVisibility',
      flags: MenuItemFlags.Checked,
      id: 'status',
      label: 'Status',
    },
    {
      args: [],
      command: 'ChatDebug.resetTableColumns',
      flags: MenuItemFlags.None,
      id: 'reset-columns',
      label: 'Reset columns',
    },
  ])
})

test('getMenuEntries2 should mark hidden table columns as unchecked', () => {
  const state = {
    ...createDefaultState(),
    visibleTableColumns: ['type', 'status'],
  }

  const result = getMenuEntries2(state, {
    menuId: MenuChatDebugTableHeader,
  })

  expect(result[1]?.flags).toBe(MenuItemFlags.Unchecked)
})

test('getMenuEntries2 should pass the clicked row index to the copy command', () => {
  const state = createDefaultState()

  const result = getMenuEntries2(state, {
    eventIndex: 3,
    menuId: MenuChatDebugTableBody,
  })

  expect(result).toEqual([
    {
      args: [3],
      command: 'ChatDebug.handleTableRowCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: 'Copy',
    },
  ])
})
