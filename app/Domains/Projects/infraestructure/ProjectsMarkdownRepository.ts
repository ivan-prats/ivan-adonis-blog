import Project from '../domain/Project'
import ProjectsRepository from '../domain/ProjectsRepository'
import Application from '@ioc:Adonis/Core/Application'
import MarkdownService from 'App/Services/MarkdownFilesService'
import path from 'path'

const projectsMarkdownFolder = path.join(Application.appRoot, 'data/projects')

export class ProjectsMarkdownRepositoryClass implements ProjectsRepository {
  private _cachedProjects: Project[] | undefined

  public async all() {
    if (this._cachedProjects) return this._cachedProjects
    else {
      const files = await MarkdownService.getFileNamesOfDir(projectsMarkdownFolder)

      const projects: Project[] = []
      for (const file of files) {
        if (!file.endsWith('.md')) continue
        const { html, metadata } = await MarkdownService.import<MetadataI>(
          path.join(projectsMarkdownFolder, file)
        )
        projects.push(
          Project.newFromProps({
            ...metadata,
            dateStart: new Date(metadata.dateStart),
            dateEnd: new Date(metadata.dateEnd),
            html,
          })
        )
      }

      this._cachedProjects = projects
      return projects
    }
  }
}

export default new ProjectsMarkdownRepositoryClass()

interface MetadataI {
  title: string
  categories: string[]
  slug: string
  link: string
  image: string
  dateStart: string
  dateEnd: string
  published: boolean
}
