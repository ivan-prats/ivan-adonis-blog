import BlogPostsRepositoryI from '../domain/BlogPostsRepository'
import Application from '@ioc:Adonis/Core/Application'
import MarkdownService from 'App/Services/MarkdownFilesService'
import path from 'path'
import BlogPost from '../domain/BlogPost'
import BlogPostId from '../domain/BlogPostId'

const blogPostsMarkdownFolder = path.join(Application.appRoot, 'data/blog')

export class BlogPostsMarkdownRepository implements BlogPostsRepositoryI {
  public async allPublished() {
    const blogPosts = await this._getOrRenewCachedBlogPosts()

    const publishedBlogPosts: BlogPost[] = []
    for (const blogPost of blogPosts) {
      if (blogPost.status === 'published') publishedBlogPosts.push(blogPost)
    }
    return publishedBlogPosts
  }

  public async findById(blogPostId: BlogPostId): Promise<BlogPost | null> {
    const blogPosts = await this._getOrRenewCachedBlogPosts()
    for (const blogPost of blogPosts) {
      if (blogPost.id.equals(blogPostId)) return blogPost
    }
    return null
  }

  /**
   * Private methods for internal usage
   */
  private _cachedBlogPosts: BlogPost[] | undefined
  private async _getOrRenewCachedBlogPosts(): Promise<BlogPost[]> {
    if (this._cachedBlogPosts) return this._cachedBlogPosts
    else {
      const files = await MarkdownService.getFileNamesOfDir(blogPostsMarkdownFolder)

      const blogPosts: BlogPost[] = []
      for (const file of files) {
        if (!file.endsWith('.md')) continue
        const { html, metadata } = await MarkdownService.import<MetadataI>(
          path.join(blogPostsMarkdownFolder, file)
        )

        blogPosts.push(
          BlogPost.newFromProps({
            ...metadata,
            html,
          })
        )
      }
      this._cachedBlogPosts = blogPosts
      return blogPosts
    }
  }
}

export default new BlogPostsMarkdownRepository()

interface MetadataI {
  title: string
  slug: string
  category: string
  teaser: string
  description: string
  published: boolean
  date: string
}
