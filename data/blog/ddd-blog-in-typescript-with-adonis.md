---
title: 'Domain driven design (DDD) blog in Typescript with Adonis'
slug: ddd-blog-in-typescript-with-adonis
category: Freelance
teaser: 'Developing this website using Domain Driven Design, Hexagonal Architecture (ports and adapters) in Typescript using Adonis.js'
description: 'Developing this website using Domain Driven Design, Hexagonal Architecture (ports and adapters) in Typescript using Adonis.js'
published: true
date: '2022-01-30'
---

## ivanprats.dev Blog using DDD

This is the code that powers the [ivanprats.dev](https://ivanprats.dev) website. What you are reading right now is in fact the README.md of the [public code repository](https://github.com/ivan-prats/ivan-adonis-blog/).

It mainly follows the practises from [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD from now on) with [Hexagonal Architecture / Ports and Adapters Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>) (HA from now on).

It's written in Typescript because:

- it's typed and I-love-me some types (eventhough it does not offer a hard typing check at runtime)
- I like it and it's my personal website

But for a blog I could have chosen to do it in virtually any language I wanted to.

I'm using [Adonis.js](https://adonisjs.com/) because it offers a good amount of packages that do all the boring stuff in a web framework: starting the server, handling requests, routing, Typescript processing, serving assets...
But, if you are familiar with DDD / HA, most of the Adonis.js packages and code will be contained in the Infraestructure layer (like it should be). Leaving all the core (domain layer) code in pure Typescript.

This blogpost is a work in progress, I will add to it everytime I add new stuff to my personal site.

## Introduction & Disclaimer

I personlly think that using DDD + Hexagonal Architecture to power a blog is the definition of **overkill**.

A simple Ruby on Rails, or static site would have been more than enough. In fact a static site would have been cheaper to maintain, and easier to scale in terms of website users.

But I still chose to do it like this for the following reasons:

- I use my personal site to play with new techniques and technologies
- Because there is no business incentive to my blog: I can open-source it and show it around so that colleagues, future employers, customers... so they can see it and we can discuss it

## Interesting stuff to check out in the codebase

If you are not familiar with Adonis: you may not know where to start, so here I will point out to the most interesting (in my opinion) parts of the code base. As well as quickly introducing what they do. Some of them will be further explained below

- **Testing**. All tests are in the root `test/` folder. They are separated between Unit, Integration, and System tests. Unit tests are _fast_ because they use test doubles to abstract fromm the Infraestructure layout. The Integration test that same infraestructure layout. And System tests are mostly Acceptance tests that ensure the system is working correctly from the Client's perspective. You can run them on your machine with the command `npm run test:all`

- **Easily using multiple types of "Databases" thanks to Hexagonal Architecture (HA)**. I say "Databases" with quotes because you could hardly call storing blogposts on markdown in the repository a Database, but I still use it like one nonetheless. And that is precisely what I find incredible about HA: you can literally use whathever you want as long as Repository you are using follows the `ProjectsRepository` interface determined in your domain.

- **Using a CDN to serve Images on production and integrating it in Continuous Deployment**. In order to boost performance and lower the server load on production, we serve the images through a CDN. The interesting part is that the upload of images and choosing of the base url is automatic. First we add the images we want to serve in the `/public/images/...` directory. Then, once we push to the `main` branch, the build step I have configured calls the `commands/PublishImages.ts` command, which uploads to a S3 bucket all of the images in `public/images`. Each image should call `{{ currentEnv.assetsBaseUrl }}`, which loads the base url depending on the current Environment: either `/` in development & testing, or `https://ivanprats-cdn.ams3.digitaloceanspaces.com` in staging & production.
