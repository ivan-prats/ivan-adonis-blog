import ExceptionInvalidProp from 'App/Exceptions/ExceptionInvalidProp'
import ProjectId from './ProjectId'

export default class Project {
  private _id: ProjectId
  private constructor(private readonly props: ProjectPropsI) {
    this.validateProps(props)
    this._id = ProjectId.newFromSlug(props.slug)
  }

  public get id(): ProjectId {
    return this._id
  }

  public get primitives(): ProjectPrimitivesI {
    return {
      ...this.props,
      id: this.id,
    }
  }

  private validateProps(props: ProjectPropsI) {
    for (const key in props) {
      switch (key) {
        case 'categories':
          if (false === Array.isArray(props[key]))
            throw ExceptionInvalidProp.new(
              key,
              props[key],
              `"${key}" prop needs to be an Array of strings`
            )
          break
        case 'published':
          if (typeof props[key] !== 'boolean')
            throw ExceptionInvalidProp.new(
              key,
              props[key],
              `"${key}" prop needs to be typeof "boolean"`
            )
          break
        case 'dateStart':
        case 'dateEnd':
          if (typeof props[key] !== 'object' || props[key].constructor.name !== 'Date')
            throw ExceptionInvalidProp.new(
              key,
              props[key],
              `"${key}" prop needs to be typeof "object" and a Date Object`
            )
          break

        default:
          if (typeof props[key] !== 'string' || props[key] === '')
            throw ExceptionInvalidProp.new(
              key,
              props[key],
              `"${key}" prop needs to be a valid non-empty typeof "string"`
            )
          break
      }
    }
  }

  public static newFromProps(props: ProjectPropsI): Project {
    return new Project(props)
  }
}

interface ProjectPropsI {
  title: string
  slug: string
  categories: string[]
  link: string
  image: string
  dateStart: Date
  dateEnd: Date
  published: boolean
  html: string
}

interface ProjectPrimitivesI extends ProjectPropsI {
  id: ProjectId
}
