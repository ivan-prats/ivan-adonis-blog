import Project from 'App/Domains/Projects/domain/Project'
import ProjectsMarkdownRepository from 'App/Domains/Projects/infraestructure/ProjectsMarkdownRepository'
import test from 'japa'

test.group('ProjectsMarkdownRepository integration tests', () => {
  test('"all" method returns an array of Projects with length of at least 1', async (assert) => {
    const projects = await ProjectsMarkdownRepository.all()
    assert.isAbove(projects.length, 1)
    for (const project of projects) {
      assert.isTrue(project instanceof Project)
    }
  })

  test('calling "all" method twice on a fresh Repo gives back the same Projects', async (assert) => {
    const projectsMarkdownRepository = new (
      await import('App/Domains/Projects/infraestructure/ProjectsMarkdownRepository')
    ).ProjectsMarkdownRepositoryClass()
    const projectsTheFirstTime = await projectsMarkdownRepository.all()
    const projectsTheSecondTime = await projectsMarkdownRepository.all()
    assert.deepEqual(projectsTheFirstTime, projectsTheSecondTime)
  })
})
