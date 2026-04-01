export interface DomEventListener {
  readonly name: number
  readonly params: readonly string[]
  readonly preventDefault?: boolean
  readonly trackPointerEvents?: readonly number[]
}
