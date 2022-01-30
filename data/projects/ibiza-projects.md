---
title: Getting Ibizaprojects into the Jamstack
categories: ['Front end', 'Nuxt', 'Headless Wordpress']
slug: redesigning-ibiza-projects
link: /blog/redesigning-ibiza-projects
image: '{{currentEnv.assetsBaseUrl}}/images/projects/cloud-ibizaprojects.png'
dateStart: '2020-08-03'
dateEnd: '2020-09-11'
published: true
---

Applying a Figma design handed by [Ambar Amill](https://www.ambaramill.com/) into a fully static, responsive, engaging and performant website. The project revolves around the spanish island of Ibiza and all of its ecosystem of professionals.

The client already had a Wordpress with some content, as well as liking its admin panel. So we went for a solution where we queried the Wordpress site API at build time to use its content, while keeping the wordpress admin experience.

Tech stach used:

<ul class="pl-6 list-disc">
  <li>
    <tech-iccon tech="nuxt"></tech-iccon>
    <span>Nuxt.js</span>
  </li>
  <li>
    <tech-iccon tech="tailwindcss"></tech-iccon>
    <span>TailwindCSS for styles</span>
  </li>
  <li>Netlify for deploy</li>
  <li>Wordpress used as headless CMS</li>
</ul>
