import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetChatDebugViewDom from '../src/parts/GetChatDebugViewDom/GetChatDebugViewDom.ts'

test('getChatDebugViewDom should wire filter input to filter input listener', () => {
  const dom = GetChatDebugViewDom.getChatDebugViewDom('', '', false, false, false, false, []) as readonly {
    readonly autocomplete?: string
    readonly checked?: boolean
    readonly inputType?: string
    readonly name?: string
    readonly onChange?: number
    readonly onInput?: number
  }[]
  const filterInput = dom.find((node) => node.name === 'filter')
  const showFullOutputToggle = dom.find((node) => node.name === 'showFullOutput')

  expect(filterInput).toBeDefined()
  expect(showFullOutputToggle).toBeDefined()
  // @ts-ignore
  expect(filterInput.onInput).toBe(DomEventListenerFunctions.HandleFilterInput)
  // @ts-ignore
  expect(filterInput.inputType).toBe('search')
  // @ts-ignore
  expect(filterInput.autocomplete).toBe('off')
  // @ts-ignore
  expect(showFullOutputToggle.onChange).toBe(DomEventListenerFunctions.HandleInput)
  // @ts-ignore
  expect(showFullOutputToggle.inputType).toBe('checkbox')
})
