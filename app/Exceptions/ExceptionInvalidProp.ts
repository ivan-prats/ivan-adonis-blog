export default class ExceptionInvalidProp extends Error {
  private constructor(message: string) {
    super(message)
  }

  public static new(
    propName: string,
    propValue: any,
    additionalMessage = ''
  ): ExceptionInvalidProp {
    const stringifiedPropValue = ((propValue): string => {
      switch (typeof propValue) {
        case 'string':
          return propValue
        case 'number':
        case 'boolean':
        case 'bigint':
        case 'function':
        case 'undefined':
          return `${propValue}`

        case 'object':
          if (propValue.toJSON) return JSON.stringify(propValue.toJSON())
          else return propValue

        default:
          return propValue
      }
    })(propValue)
    return new ExceptionInvalidProp(
      `Invalid prop: <${propName}> passed to the constructor. We got: <${stringifiedPropValue}>, with typeof: <${typeof propValue}>. ${additionalMessage}`
    )
  }
}
