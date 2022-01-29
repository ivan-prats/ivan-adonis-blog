import UseCaseInterface from 'App/Domains/Utilities/UseCaseInterface'
import BlogPost from '../domain/BlogPost'
import BlogPostId from '../domain/BlogPostId'
import BlogPostsRepositoryI from '../domain/BlogPostsRepository'

export default class QueryBlogPostById implements UseCaseInterface<BlogPost | null> {
  constructor(private _blogPostsRepo: BlogPostsRepositoryI) {}

  public async handle(blogPostId: BlogPostId): Promise<BlogPost | null> {
    return this._blogPostsRepo.findById(blogPostId)
  }
}
