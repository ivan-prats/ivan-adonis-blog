---
title: 'Ibizaprojects.es website: redesigning and moving from Wordpress in a month'
slug: redesigning-ibiza-projects
category: Freelance
teaser: 'Frontend freelance project: applying a redesign to Ibiza Projects into
  the Jamstack'
description: How Ambar Amill and I re-designed and deployed ibizaprojects.es in
  record time, while keeping the costs down and the quality top-notch
published: true
date: '2020-09-11'
---

## Summary

A great friend (and designer) of mine: [Ambar Amill](https://www.ambaramill.com/), asked me mid-august if I knew anybody to program her re-design of the website [ibizaprojects.es](https://www.ibizaprojects.es) for [@Virginia Charneco](https://www.instagram.com/virbri/). At first I thought of turning it down, but then I remembered than I've been wanting to get a taste of deploying a real site into the [Jamstack](https://jamstack.org/) and see the pros & cons that would emerge. So I asked her to give me more details about the project and I thought that the project could be a great fit so I accepted.

This blopost aims to explain the reasons behind this choice, and how was the designing and developping workflow to be able to go from the old [single-page Wordpress powered site](http://wp.ibizaprojects.es), to the [newly designed and deployed one](https://www.ibizaprojects.es), in less than month. While driving the hosting costs down, and greatly improving the site performance:

## Ibiza Projects and its needs

> Ibiza Projects is a platform born to connect professionals from the Fashion, Sport, Nutrition, Gastronomy, Beauty, Art, Business, and Personal Growth worlds. Not only living inside the Ibiza island, but from outside as well.
>
> Virginia Charneco - Founder & Director

<div class="w-80 mx-auto">

![Ibiza Projects: Fashion, Sport, Nutrition, Gastronomy, Beauty, Art, Business, and Personal Growth.    Gif taken from their About page.]({{currentEnv.assetsBaseUrl}}/images/blog/ibizaprojects/about.gif)

</div>

The old website only had one page, that explained that Ibiza Projects focused on events & workshops around professionals.

Virginia thought that the current style and design of her website didn't represent her vision for Ibiza Projects any more. She also had more to communicate:

- new [productions&experiences](https://ibizaprojects.netlify.app/productions-and-experiences/) she had produced under the Ibiza Projects brand and wanted to showcase them
- new information on the [project](https://ibizaprojects.netlify.app/projects/1) to be done and had to be postponed (for global health reasons)
- talented professionals from Ibiza that to amplify through her voice

Virginia knew what she wanted to say, and she needed Ambar to know _how_ to communicate it, and me to implement it all. The keypoints and needs of Virginia were:

1. **Deadline**: Virginia wanted to have it live by mid september so she could make the most of it and get new projects & clients by the start of fall 2020. So one month to design **and** develop it.
2. **Static structure**: the project is basically a "Corporate" website to showcase the amazing [Ibiza Projects](https://ibizaprojects.netlify.app/about). So purely frontend: no blogging, commenting, complex server side actions, etc... Virginia expressed that she didn't even want to upload / change the contents often.
3. **No platform / technology preference**: Virginia didn't care on how the website should work. Just that _it_ should work fast, bueautifully, and seamlessly. This could have been a problem if she insisted on using Wordpress (or any other standart CMS) to host the website
4. **Low cost**: at that point, the idea and brand of Ibiza Projects was just getting getting born, so Virginia couln't afford to spend a huge quantity on development, hosting, and maintaining the site.

With everything we needed to do on the table, we organized ourselves to deliver.

## The workflow

In order to have the website ready in record time, while maintaining the highest standart of quality, we needed to follow a smart workflow that would ensure that all 3 of us are always doing something. And not waiting for each other to finish their part of the project to continue with another.

We followed, for each separate page of the new website, the following workflow. And in each step, there was always one person that was in charged of passing it to the next one:

1. **Design process in Figma**. In charge: the designer (Ambar)
2. **Design revision in Figma**. In charge: the client (Virginia), dev also has an input to ensure the next step goes smoothly
3. **Development in a preview website**. In charge: the developer (me)
4. **Development revision with the designer**. In charge: the designer. This step is to ensure a correct implementation of the design _according to the designer_. As well as necessary compromises to reach the deadline as well as not go overboard in billed hours.
5. **Development revision with the client**. In charge: the client.

### The design process and revision

[Ambar Amill](https://www.ambaramill.com/) is a great designer with an unbelievable work ethic. But, in web design, it doesn't matter how good is the design if the dev assigned to implement it doesn't understand it, or if it's too hard / complex to apply.

That is where [Figma](https://www.figma.com/) comes handy. We relied heavily on it for the design process to visually share and prototype the design. This allowed us to quickly get feedback and input from the client, as well as make changes on the fly (without the need to email back and ford huge files).

Figma is also great for the developer (me). Not only it gives me all the numbers we need to transform the design into code (border radius, size in pixels...), but it allows as well to capture the intended behaviour and navigation through it's ["prototyping" feature](https://www.figma.com/prototyping/).

Let's take for example the design of the Project#1 page for mobile devices:

<div class="mx-auto">

![Figma screencapture of the Project#1 page. We can see something on the left saying 'user mobile height' and two screens. As well as some light arrows.]({{currentEnv.assetsBaseUrl}}/images/blog/ibizaprojects/screencapture-figma-project-1.png)

</div>

It's not too clear what are the different screens and how are they connected. But, as soon as you activate the Prototype feature, things get clearer:

![Figma screencapture showing prototyping feature]({{currentEnv.assetsBaseUrl}}/images/blog/ibizaprojects/figma-prototype.gif)

Now it makes more sense: we can see a static navigation bar that allows the user to navigate between the screens, as well as the height the image and navigation bar should have.

### Last minute and unaccounted changes

Getting sudden or late change requests is hard. Even more in the freelance / agency world.

You want the client to love the work you are doing for them, but you also shouldn't work more hours than the ones you have agreed upon with the client. And those two things shouldn't be a problem... in a world where clients know exactly what they want (to the pixel level), and developers know exactly the time (to the minute) that is going to take to build and deploy it.

Should be easy enough to see that we don't live in that world.

In our world: we have to compromise. And, in my experience, what has worked the best with me to reach better compromises with the client & designer are the following:

- **quick and lots of previews**. The sooner they see how the website looks in real devices, the sooner they will see what works and what doesn't. And, then, the least hours you will have to do to reach the best possible result. As well as the sooner you will see real-world bugs arise. And believe me: you will.
- **empathy, from all sides**. We are all on the same boat. The client wants something build that she/he loves and is going to bring her/him more clients,brand... And both the developer and the designer are human beings that want to: get something out in the world that is both beautiful and works great for its users, and get paid fairly for it. If all parties understand this, and all parties are decent empathic human beings, then we will reach great compromises (even if we stumble upon some disagreements in between). Don't be afraid to defend your posture and interests (as a designer or developer), but remember the other side's as well.

This particular project went great in this aspect. We managed to correct most things in time thanks to the quick Figma prototyping and often deploys I made. Which put the design and implementation out for the rashest test of all: the real world.

## Technology choice: why the Jamstack and not another Wordpress

(If you don't know what is the [Jamstack](https://jamstack.org/), or you don't quite understand how it's different than the typical Wordpress site: [get in touch!](#footer))

I decided to go with developing a static site because I thought it was a great match for the [client's needs](#the-project-and-needs-of-ibiza-projects):

1. Static sites have a the best quick and friendly dev experience
2. No need for complex CMS's
3. I could pick the static site generator of my choice (so I could work the fastest and still keep the highest quality)
4. Cheap, fast, and secure to host and deploy in any CDN (Netlify in this case)

As well as...

### Performance

> Any decently made Jamstack site will always be faster and cheaper than it's equivalent in Wordpress.

![Google Lighthouse scores. The new static website (with 5 times more pages and content, as well as using videos and more images) on the left, and the old Wordpress website on the right.]({{currentEnv.assetsBaseUrl}}/images/blog/ibizaprojects/screencapture-lighthouse-new-vs-old.png)

You can check the [live Google Lighthouse score of IbizaProjects](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fibizaprojects.netlify.app%2F), and compare it to your website if you want.

A lot of time has gone into getting that score, applying things like:

- Lazyloading videos and images to reduce server response and first contentful paint time
- Compressing images (png) and videos (mp4) to ensure a good delivery to all devices, while reducing time and data consumed
- Prefetching link after page load, so the user navigation seems even more seamless. While not affecting the initial payload at all

If you don't understand your Lighthouse score, or have any questions regarding it: [feel free to get in touch](#footer)

### Technologies used

- [Nuxt.js](https://nuxtjs.org/): for generating the static site, and [TailwindCSS](https://tailwindcss.com/) to quickly applying the design
- [Netlify](https://www.netlify.com/): for hosting it _almost for free_
- [Figma](https://www.figma.com/) so that Ambar would be able to quickly design it, alongside Virginia (for client validation and input) and me (for dev input and speed of developing)

## Conclusions

Perhaps the hardest part for me was how to tackle the hero-video on the home page. I had never worked with high-display vidoes and walking the rope between "the video takes too long to load" and "the resolution is too bad", while not using high-end expensive video CDN's... was hard. But I do think that the end result speaks for itself.

But all considered: the project went great. The website is fast, beautiful, cheap to maintain, secure, scalable... And all in less than a month by a designer and a developer.

And, the most important thing at that, Virginia (the client) ended up loving it. Mainly because:

- her taste and Ambar's style were a good match from the beginning
- we followed an Agile way of prototyping and showing her real results fast. So we could iterate fast on the things that didn't clicked at the beginning
- building it in a stack and framework I was already familiar with (Nuxt), I could manage to implement the design almost perfectly. While maintaining top-notch performance at a high speed (and most importantly: actually enjoying it in the process!)

I couldn't ask for more.

_Except..._

### Jamstack shortcomings + future changes to Ibizaprojects.es

The deadline and project so far has been a static "corporate" website. No CMS envolved, no dynamic content. Which has worked great with the Jamstack architecture: the results speak for themselves and we are all happy with them.

_But_, towards the end of the project, Virginia was so happy with the end result that she started talking about a second phase of the project: a blog with comments and forum for the users of Ibiza Projects.

And while this is _super_ standard in the Web, and even more coming from Wordpress background, I did realize that this is where the Jamstack starts to fall short as of today. Right now there is no database, no server logic, no CMS. This has allowed us to go fast, be performant, and maintain a high fidelity design. But how do we proceed now that we require them?

I have some cool ideas, so expect another blog post soon!
