import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { getInfoNodesWithLink } from '../src/parts/GetInfoNodesWithLink/GetInfoNodesWithLink.ts'

test('getInfoNodesWithLink should render a single info container with linked label text', () => {
  const result = getInfoNodesWithLink('Some headers may not be displayed due to Access-Control-Expose-Headers header.')

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
