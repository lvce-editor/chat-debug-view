interface InvocableRpc {
  readonly invoke: (method: string, ...params: readonly unknown[]) => Promise<unknown>
}

let workerRpc: InvocableRpc | undefined

export const setWorkerRpc = (value: InvocableRpc): void => {
  workerRpc = value
}

export const invoke = async (method: string, ...params: readonly unknown[]): Promise<unknown> => {
  if (!workerRpc) {
    throw new Error('worker rpc is not initialized')
  }
  return workerRpc.invoke(method, ...params)
}
