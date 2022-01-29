import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://127.0.0.1:${process.env.PORT}`
let agent = supertest.agent(BASE_URL)

test.group(`ProjectsController acceptance tests`, (group) => {
  group.beforeEach(() => {
    agent = supertest.agent(BASE_URL)
  })

  test(`Scenario: Website users can visit the /projects page
  Given a user
  When they make a GET request to the "/projects" url
  Then they receive a 200 status back
  `, async () => {
    await agent.get('/projects').expect(200)
  })
})
