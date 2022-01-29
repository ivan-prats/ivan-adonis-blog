import UseCaseInterface from 'App/Domains/Utilities/UseCaseInterface'
import BlogPost from '../domain/BlogPost'
import BlogPostsRepositoryI from '../domain/BlogPostsRepository'

export default class QueryPublishedBlogPosts implements UseCaseInterface<BlogPost[]> {
  constructor(private _blogPostsRepo: BlogPostsRepositoryI) {}

  public async handle(): Promise<BlogPost[]> {
    return this._blogPostsRepo.allPublished()
  }
}
