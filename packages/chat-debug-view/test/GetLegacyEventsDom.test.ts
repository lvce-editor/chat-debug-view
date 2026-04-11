import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetLegacyEventsDom from '../src/parts/GetLegacyEventsDom/GetLegacyEventsDom.ts'

test('getLegacyEventsDom should make the events container keyboard focusable and expose application role', () => {
  const dom = GetLegacyEventsDom.getLegacyEventsDom('', 'No events have been found', []) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly role?: string
    readonly tabIndex?: number
    readonly type?: number
  }[]

  expect(dom[0]).toEqual({
    childCount: 1,
    className: 'ChatDebugViewEvents',
    role: 'application',
    type: VirtualDomElements.Div,
  })
})
