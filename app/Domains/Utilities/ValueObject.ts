import { isEqual } from 'lodash'

interface ValueObjectProps {
  [index: string]: any
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export default abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T

  constructor(props: T) {
    this.props = Object.freeze(props)
  }

  public equals(differentValueObject?: ValueObject<T>): boolean {
    if (differentValueObject === null || differentValueObject === undefined) {
      return false
    }
    if (differentValueObject.props === undefined) {
      return false
    }
    return isEqual(this.props, differentValueObject.props)
  }

  protected invalidPropError(propName: string, propValue: any, additionalMessage = ''): Error {
    return new Error(
      `Invalid prop: "${propName}" passed to the constructor. We got "${propValue}", with typeof: ${typeof propValue}. ${additionalMessage}`
    )
  }
}
