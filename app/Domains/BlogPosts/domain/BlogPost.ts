import ExceptionInvalidProp from 'App/Exceptions/ExceptionInvalidProp'
import BlogPostId from './BlogPostId'

export default class BlogPost {
  private _id: BlogPostId
  private constructor(private readonly props: BlogPostPropsI) {
    this.validateProps(props)
    this._id = BlogPostId.newFromSlug(props.slug)
  }

  public get id(): BlogPostId {
    return this._id
  }

  public get status(): BlogPostStatusType {
    return this.props.published ? 'published' : 'unpublished'
  }

  public get primitives(): BlogPostPrimitivesI {
    return { ...this.props, id: this.id, publicationDate: this.publicationDate }
  }

  public static newFromProps(props: BlogPostPropsI): BlogPost {
    return new BlogPost(props)
  }

  private get publicationDate(): Date {
    return new Date(this.props.date)
  }

  private validateProps(props: BlogPostPropsI) {
    for (const key in props) {
      switch (key) {
        case 'published':
          if (typeof props[key] !== 'boolean')
            throw ExceptionInvalidProp.new(key, props[key], `"${key}" needs to be a boolean`)
          break

        default:
          if (props[key] === '' || typeof props[key] !== 'string')
            throw ExceptionInvalidProp.new(
              key,
              props[key],
              `"${key}" needs to be a valid non-empty string`
            )

          break
      }
    }
  }
}

interface BlogPostPropsI {
  title: string
  slug: string
  category: string
  teaser: string
  description: string
  published: boolean
  date: string
  html: string
}

interface BlogPostPrimitivesI extends BlogPostPropsI {
  id: BlogPostId
  publicationDate: Date
}

const blogPostStatuses = ['published', 'unpublished'] as const
type BlogPostStatusType = typeof blogPostStatuses[number]
