import UseCaseInterface from 'App/Domains/Utilities/UseCaseInterface'
import Project from '../domain/Project'
import ProjectsRepository from '../domain/ProjectsRepository'

export default class QueryAllProjects implements UseCaseInterface<Project[]> {
  constructor(private _projectsRepo: ProjectsRepository) {}

  public async handle(): Promise<Project[]> {
    return this._projectsRepo.all()
  }
}
