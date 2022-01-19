export default interface UseCaseInterface<T> {
  handle: (...args) => Promise<T>
}
