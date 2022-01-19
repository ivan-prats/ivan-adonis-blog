import ValueObject from 'App/Domains/Utilities/ValueObject'

export default class ProjectId extends ValueObject<ProjectIdPropsI> {
  private constructor(props: ProjectIdPropsI) {
    super(props)
    if (typeof props.slug !== 'string' || props.slug === '')
      throw this.invalidPropError('slug', props.slug, `"slug" needs to be a non-empty string.`)
  }

  public get value(): string {
    return this.props.slug
  }

  public static newFromSlug(slug: string) {
    return new ProjectId({ slug })
  }
}

interface ProjectIdPropsI {
  slug: string
}
