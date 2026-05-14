import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getHeaderSectionNodes } from '../src/parts/GetHeaderSectionNodes/GetHeaderSectionNodes.ts'
import * as HeaderSectionKey from '../src/parts/HeaderSectionKey/HeaderSectionKey.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getHeaderSectionNodes should render expanded section with info message', () => {
  const result = getHeaderSectionNodes(HeaderSectionKey.ResponseHeaders, 'Response Headers', [['Server', 'test']], [], 'Info')
  expect(result[0]).toEqual({
    childCount: 3,
    className: 'ChatDebugViewHeadersSection',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    ariaExpanded: true,
    childCount: 1,
    className: 'ChatDebugViewHeadersSectionHeading',
    name: InputName.ToggleHeadersSection,
    onChange: DomEventListenerFunctions.HandleFilterInput,
    onClick: DomEventListenerFunctions.HandleFilterInput,
    type: VirtualDomElements.Button,
    value: HeaderSectionKey.ResponseHeaders,
  })
  expect(result).toContainEqual(text('Response Headers'))
  expect(result).toContainEqual(text('Info'))
})

test('getHeaderSectionNodes should omit table and info when collapsed', () => {
  const result = getHeaderSectionNodes(HeaderSectionKey.General, 'General', [['Status Code', '200 OK']], [HeaderSectionKey.General], 'Info')
  expect(result[0]).toEqual({
    childCount: 1,
    className: 'ChatDebugViewHeadersSection',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    ariaExpanded: false,
    childCount: 1,
    className: 'ChatDebugViewHeadersSectionHeading',
    name: InputName.ToggleHeadersSection,
    onChange: DomEventListenerFunctions.HandleFilterInput,
    onClick: DomEventListenerFunctions.HandleFilterInput,
    type: VirtualDomElements.Button,
    value: HeaderSectionKey.General,
  })
  expect(result).toContainEqual(text('General'))
  expect(result).not.toContainEqual(text('Status Code'))
  expect(result).not.toContainEqual(text('Info'))
})
