import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QueryBlogPostById from 'App/Domains/BlogPosts/application/QueryBlogPostById'
import QueryPublishedBlogPosts from 'App/Domains/BlogPosts/application/QueryPublishedBlogPosts'
import BlogPostId from 'App/Domains/BlogPosts/domain/BlogPostId'
import BlogPostsMarkdownRepository from 'App/Domains/BlogPosts/infraestructure/BlogPostsMarkdownRepository'

export default class BlogPostsController {
  public async index({ view }: HttpContextContract) {
    const blogPosts = await new QueryPublishedBlogPosts(BlogPostsMarkdownRepository).handle()
    return await view.render('pages/blog/index', {
      blogPosts: blogPosts.map((blogPost) => blogPost.primitives),
    })
  }

  public async show({ view, params }: HttpContextContract) {
    const blogPostOrNull = await new QueryBlogPostById(BlogPostsMarkdownRepository).handle(
      BlogPostId.newFromSlug(params.id)
    )

    if (!blogPostOrNull)
      throw new Exception(
        `Ooooops... The blog post you are looking for does not exist. You tried: <${params.id}>`,
        404
      )

    return await view.render('pages/blog/show', {
      blogPost: blogPostOrNull.primitives,
    })
  }
}
