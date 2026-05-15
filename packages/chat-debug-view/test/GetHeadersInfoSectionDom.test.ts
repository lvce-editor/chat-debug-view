import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getHeadersInfoSectionDom } from '../src/parts/GetHeadersInfoSectionDom/GetHeadersInfoSectionDom.ts'
import * as HeaderSectionKey from '../src/parts/HeaderSectionKey/HeaderSectionKey.ts'

test('getHeadersInfoSectionDom should return empty nodes when the section is collapsed', () => {
  const result = getHeadersInfoSectionDom({
    heading: 'Response Headers',
    info: 'Info',
    isExpanded: false,
    items: [],
    key: HeaderSectionKey.ResponseHeaders,
  })

  expect(result).toEqual([])
})

test('getHeadersInfoSectionDom should render plain text for sections without a link', () => {
  const result = getHeadersInfoSectionDom({
    heading: 'General',
    info: 'Info',
    isExpanded: true,
    items: [],
    key: HeaderSectionKey.General,
  })

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'ChatDebugViewHeadersSectionInfo',
      type: VirtualDomElements.Div,
    },
    text('Info'),
  ])
})

test('getHeadersInfoSectionDom should render linked response header info when the marker text is present', () => {
  const result = getHeadersInfoSectionDom({
    heading: 'Response Headers',
    info: 'Some headers may not be displayed due to Access-Control-Expose-Headers header.',
    isExpanded: true,
    items: [],
    key: HeaderSectionKey.ResponseHeaders,
  })

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewHeadersSectionInfo',
      type: VirtualDomElements.Div,
    },
    text('Some headers may not be displayed due to '),
    {
      childCount: 1,
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers',
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    text('Access-Control-Expose-Headers'),
    text(' header.'),
  ])
})
