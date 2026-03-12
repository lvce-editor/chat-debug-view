import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetChatDebugViewDom from '../src/parts/GetChatDebugViewDom/GetChatDebugViewDom.ts'

test('getChatDebugViewDom should wire filter input to filter input listener', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', false, false, false, []) as readonly {
    readonly autocomplete?: string
    readonly inputType?: string
    readonly name?: string
    readonly onInput?: number
  }[]
  const filterInput = dom.find((node) => node.name === 'filter')

  expect(filterInput).toBeDefined()
  // @ts-ignore
  expect(filterInput.onInput).toBe(DomEventListenerFunctions.HandleFilterInput)
  // @ts-ignore
  expect(filterInput.inputType).toBe('search')
  // @ts-ignore
  expect(filterInput.autocomplete).toBe('off')
})
