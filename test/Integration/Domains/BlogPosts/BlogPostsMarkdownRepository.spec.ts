import BlogPost from 'App/Domains/BlogPosts/domain/BlogPost'
import BlogPostId from 'App/Domains/BlogPosts/domain/BlogPostId'
import BlogPostsMarkdownRepository from 'App/Domains/BlogPosts/infraestructure/BlogPostsMarkdownRepository'
import test from 'japa'

test.group('BlogPostsMarkdownRepository integration tests', () => {
  test('"allPublished" method returns an array of BlogPosts with length of at least 1', async (assert) => {
    const blogPosts = await BlogPostsMarkdownRepository.allPublished()
    assert.isAbove(blogPosts.length, 1)
    for (const blogPost of blogPosts) {
      assert.isTrue(blogPost instanceof BlogPost)
    }
  })

  test('"allPublished" method returns only published BlogPosts (and at least one)', async (assert) => {
    const blogPosts = await BlogPostsMarkdownRepository.allPublished()
    assert.isAbove(blogPosts.length, 1)
    for (const blogPost of blogPosts) {
      assert.equal(blogPost.status, 'published')
    }
  })

  test('calling "allPublished" method twice on a fresh Repo gives back the same BlogPosts', async (assert) => {
    const blogPostsMarkdownRepository = new (
      await import('App/Domains/BlogPosts/infraestructure/BlogPostsMarkdownRepository')
    ).BlogPostsMarkdownRepository()
    const blogPostsTheFirstTime = await blogPostsMarkdownRepository.allPublished()
    const blogPostsTheSecondTime = await blogPostsMarkdownRepository.allPublished()
    assert.deepEqual(blogPostsTheFirstTime, blogPostsTheSecondTime)
  })

  test('"findById" method returns the BlogPost with that BlogPostId', async (assert) => {
    const existingBlogPostId = BlogPostId.newFromSlug('non-published-blogpost')
    const existingBlogPost = await BlogPostsMarkdownRepository.findById(existingBlogPostId)
    assert.isNotNull(existingBlogPost)
    assert.isTrue(existingBlogPostId.equals(existingBlogPost?.id))
  })

  test('"findById" method returns no result when searching for a non-existant BlogPost', async (assert) => {
    const nonExistingBlogPostId = BlogPostId.newFromSlug('wubba-lubba-dub-dub')
    const nonExistingBlogPost = await BlogPostsMarkdownRepository.findById(nonExistingBlogPostId)
    assert.isNull(nonExistingBlogPost)
  })
})
