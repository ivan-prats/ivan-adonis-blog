import Project from './Project'

export default interface ProjectsRepository {
  all: () => Promise<Project[]>
}
