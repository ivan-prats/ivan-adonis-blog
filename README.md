# ivanprats.dev Blog using DDD

This is the code that powers the [ivanprats.dev](https://ivanprats.dev) website. What you are reading right now is in fact the README.md of the [public code repository](https://github.com/ivan-prats/ivan-adonis-blog/).

It mainly follows the practises from [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD from now on) with [Hexagonal Architecture / Ports and Adapters Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>) (HA from now on).

It's written in Typescript because:

- it's typed and I love me some types (eventhough it does not offer a hard typing check at runtime)
- I like it and it's my personal website

But for a blog I could have chosen to do it in virtually any language I wanted to.

I'm using [Adonis.js](https://adonisjs.com/) because it offers a good amount of packages that do all the boring stuff in a web framework: starting the server, handling requests, routing, Typescript processing, serving assets...
But, if you are familiar with DDD / HA, most of the Adonis.js packages and code will be contained in the Infraestructure layer (like it should be). Leaving all the core (domain layer) code in pure Typescript.

## Introduction & Disclaimer
I personlly think that using DDD + Hexagonal Architecture to power a blog is the definition of **overkill**.

A simple Ruby on Rails, or static site would have been more than enough. In fact a static site would have been cheaper to maintain, and easier to scale in terms of visits.

But I still chose to do it for the following reasons:

- I use my personal site to play with new techniques and technologies
- Because there is no business incentive to my blog: I can open-source it and show it around so that colleagues, employers, customers... can see it and comment on it with me

## Interesting stuff to check out in the codebase
If you are not familiar with Adonis: you may not know where to start, so here I will point out to the most interesting (in my opinion) parts of the code base. As well as quickly introducing what they do. Some of them will be further explained below

- **Testing**. All tests are in the root `test/` folder. They are separated between Unit, Integration, and System tests. Unit tests are _fast_ because they use test doubles to abstract fromm the Infraestructure layout. The Integration test that same infraestructure layout. And System tests are mostly Acceptance tests that ensure the system is working correctly from the Client's perspective.

- **Easily using multiple types of "Databases" thanks to Hexagonal Architecture (HA)**. I say "Databases" with quotes because you could hardly call storing blogposts on markdown in the repository a Database, but I still use it like one nonetheless. And that is precisely what I find incredible about HA: you can literally use whathever you want as long as Repository you are using follows the `ProjectsRepository` interface determined in your domain.
