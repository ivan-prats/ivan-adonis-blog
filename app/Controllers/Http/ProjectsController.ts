import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QueryAllProjects from 'App/Domains/Projects/application/QueryAllProjects'
import ProjectsMarkdownRepository from 'App/Domains/Projects/infraestructure/ProjectsMarkdownRepository'

export default class ProjectsController {
  public async index({ view }: HttpContextContract) {
    const projects = await new QueryAllProjects(ProjectsMarkdownRepository).handle()
    return await view.render('pages/projects/index', {
      projects: projects.map((project) => project.primitives),
    })
  }
}
