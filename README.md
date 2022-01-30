# ivanprats.dev Blog using DDD

## Introduction

This is the code that powers the [ivanprats.dev](https://ivanprats.dev) website. What you are reading right now is in fact the README.md of the [public code repository](https://github.com/ivan-prats/ivan-adonis-blog/).

It mainly follows the practises from [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD from now on) with [Hexagonal Architecture / Ports and Adapters Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>) (HA from now on).

It's written in Typescript because:

- it's typed and I love me some types (eventhough it does not offer a hard typing check at runtime)
- I like it and it's my personal website

But for a blog I could have chosen to do it in virtually any language I wanted to.

I'm using [Adonis.js](https://adonisjs.com/) because it offers a good amount of packages that do all the boring stuff in a web framework: starting the server, handling requests, routing, Typescript processing, serving assets...
But, if you are familiar with DDD / HA, most of the Adonis.js packages and code will be contained in the Infraestructure layer (like it should be). Leaving all the core (domain layer) code in pure Typescript.

## Further reading

You can read more on why and how I organized this repo on its [dedicated blogpost](https://ivanprats.dev/blog/ddd-blog-in-typescript-with-adonis).

## Dev Machine setup

In order to run this repo on your machine you will need to have installed:

- node.js v14 or more
- npm v7 or more

Once you have that installed, clone the repo, and run:

1. `npm install` to install dependencies
2. Create an empty `.env` file in the root directory, and then copy the contents of the `.env.example` file in it.
3. `npm run dev` to start the dev server on port 3333
