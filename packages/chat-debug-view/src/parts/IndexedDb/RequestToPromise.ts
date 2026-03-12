export const requestToPromise = async <T>(createRequest: () => IDBRequest<T>): Promise<T> => {
  const request = createRequest()
  const { promise, reject, resolve } = Promise.withResolvers<T>()

  const onSuccess = () => {
    cleanup()
    resolve(request.result)
  }

  const onError = () => {
    cleanup()
    reject(request.error || new Error('IndexedDB request failed'))
  }

  const cleanup = () => {
    request.removeEventListener('success', onSuccess)
    request.removeEventListener('error', onError)
  }

  request.addEventListener('success', onSuccess)
  request.addEventListener('error', onError)

  return promise
}
