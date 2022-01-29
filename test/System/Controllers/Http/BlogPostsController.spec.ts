import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://127.0.0.1:${process.env.PORT}`
let agent = supertest.agent(BASE_URL)

test.group(`BlogPostsController acceptance tests`, (group) => {
  group.beforeEach(() => {
    agent = supertest.agent(BASE_URL)
  })

  test(`Scenario: Website users can visit the /blog page
  Given a user
  When they make a GET request to the "/blog" url
  Then they receive a 200 status back
  `, async () => {
    await agent.get('/blog').expect(200)
  })

  test(`Scenario: Website users can visit the /blog/set-up-tailwindcss-in-new-adonis5 page
  Given a user
  When they make a GET request to the "/blog/set-up-tailwindcss-in-new-adonis5" url
  Then they receive a 200 status back
  `, async () => {
    await agent.get('/blog/set-up-tailwindcss-in-new-adonis5').expect(200)
  })
})
