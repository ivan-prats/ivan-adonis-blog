import ValueObject from 'App/Domains/Utilities/ValueObject'

export default class BlogPostId extends ValueObject<BlogPostIdPropsI> {
  private constructor(props: BlogPostIdPropsI) {
    super(props)
    if (!props.slug || typeof props.slug !== 'string')
      throw this.invalidPropError('slug', props.slug, '"slug" needs to be a valid non-empty string')
  }

  public static newFromSlug(slug: string): BlogPostId {
    return new BlogPostId({ slug })
  }
}

interface BlogPostIdPropsI {
  slug: string
}
