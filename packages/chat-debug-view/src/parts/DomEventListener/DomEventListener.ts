export interface DomEventListener {
  readonly name: number
  readonly params: readonly string[]
  readonly preventDefault?: boolean
  readonly passive?: boolean
  readonly trackPointerEvents?: readonly number[]
}
