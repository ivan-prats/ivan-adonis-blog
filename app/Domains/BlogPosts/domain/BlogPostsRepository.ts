import BlogPost from './BlogPost'
import BlogPostId from './BlogPostId'

export default interface BlogPostsRepositoryI {
  allPublished: () => Promise<BlogPost[]>
  findById: (blogPostId: BlogPostId) => Promise<BlogPost | null>
}
