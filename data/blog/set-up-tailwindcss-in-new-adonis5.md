---
title: 'Set up TailwindCSS in Adonis 5'
slug: set-up-tailwindcss-in-new-adonis5
category: AdonisJS 5 Tutorial
teaser: 'Install and configure in under 5 minutes TailwindCSS using the default asset manager that comes with Adonis v5: Webpack Encore.'
description: 'Install and configure in under 5 minutes TailwindCSS using the default asset manager that comes with Adonis v5: Webpack Encore.'
published: true
date: '2021-05-24'
---

# Installing TailwindCSS in a new AdonisJS 5 project with the default Webpack Encore

I love [TailwindCSS](https://tailwindcss.com/), and I love AdonisJS, so it only makes sense that anybody should be able to set them up togheter. Right?

I've found other guides that use [Laravel Mix for the asset handling](https://github.com/wahyubucil/adonis-mix-asset#readme), but none that use the [default Webpack Encore package](https://docs.adonisjs.com/guides/assets-manager) that comes with the new v5 of the framework. Which suprised me quite a bit because, having tried both ways, I find Encore's syntax, webpack-dev-server, and logs way more pleasant to work with.

## 1 Install PostCSS through Encore

According to TailwindCSS's the [general instalation guide](https://tailwindcss.com/docs/installation): the best thing is to use postcss. And Adonis makes it easy through the Encore package [official guide](https://docs.adonisjs.com/guides/assets-manager#setup-postcss).

First we install the postcss-loader:

```bash
npm i -D postcss-loader
```

Then we create `postcss.config.js` in the root directory of the project:

```javascript
// postcss.config.js
module.exports = {
  plugins: {},
}
```

Finally: we enable the PostCSS loader inside the `webpack.config.js` file. Depending on your when and how you installed Encore: you will just have to uncomment the following lines:

```diff
/*
|---------------------------------------------------------------
| CSS loaders
|---------------------------------------------------------------
|
| Uncomment one of the following line of code to enable support for
| PostCSS or CSS.
|
*/
- // Encore.enablePostCssLoader()
- // Encore.configureCssLoader(() => {})
+ Encore.enablePostCssLoader()
+ Encore.configureCssLoader(() => {})
```

## 2 Install the necessary Tailwind dependencies

Stated as per the [official documentation](https://tailwindcss.com/docs/installation#install-tailwind-via-npm)

```bash
npm install -D tailwindcss@latest autoprefixer@latest
```

## 3 Add Tailwind as a PostCSS plugin

For this: you just need to create a `postcss.config.js` file mentioning TailwindCSS and autoprefixer in your root folder:

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 4 Create your TailwindCSS configuration file

The following command will initiate the file `tailwind.config.js` in your project directory:

```bash
npx tailwindcss init
```

## 5 Add the styles that Webpack & PostCSS will build

Before we change the actual styles: if you have a bare new AdonisJS application, and the developper server running (with `npm run dev`), you should see the default initial page going to [http://localhost:3333](http://localhost:3333):

![Initial Adonis screen]({{currentEnv.assetsBaseUrl}}/images/blog/tailwindcss/initial-screen-adonis-5-app.png)

Now go to `app.css`. You will probably find there the styles of that screen.

Delete everything and paste the imports that PostCSS (through Webpack) will use to build all the TailwindCSS styles:

```css
/* app.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

Save the file. If you had your webpack-dev-server: the page will hot-reload automatically (give it some good 5 seconds to build all utility classes for the first time) and you will see the same screen, but with minimum styles:

![Initial Adonis screen with bare TailwindCSS styles applied]({{currentEnv.assetsBaseUrl}}/images/blog/tailwindcss/screenshot-tailwindcss-initial-screen-adonis-5-app.png)

🎉 Congratulations! You successfully installed TailwindCSS in your Adonis 5 app.

## Bonus: setting up purge for production

In order for PostCSS to know where to look for the TailwindCSS classes to maintain in production: we need to tell it where to look.

All sufficiently complex apps tend to contain at least a bit of utility classes everywhere. For that reason I recommend the following setup:

```diff
// tailwind.config.js
module.exports = {
+  purge: [
+    './resources/views/**/*.edge',
+    './resources/css/**/*.css',
+    './resources/js/**/*.js',
+    './resources/js/**/*.ts',
+  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

## Bonus: watching for changes in tailwind.config.js

This is not that necessary if you don't update much your `tailwind.config.js` file. But, in case you do, by adding the following lines to your `webpack.config.js`: the webpack-dev-server will detect whenever the tailwind config file is updated and reboot itself accordingly:

```diff
// webpack.config.js
  /**
    * Enable live reload and add views directory
    */
  options.liveReload = true
  options.static.push({
    directory: join(__dirname, './resources/views'),
    watch: true,
  })
+  options.static.push({
+    directory: join(__dirname, './tailwind.config.js'),
+    watch: true,
+  })

```

## Doubts or having trouble?

Packages, machines, and every person's situation is unique. If you got stuck somewhere, or you think there are steps missing: feel free to [drop me an email](mailto:ivanprats@hey.com), a [DM on Twitter](https://twitter.com/ivanprats94), or leave an issue on the [public GitHub repo](https://github.com/ivan-prats/add-tailwindcss-to-adonis5-with-webpack-encore) I made with this tutorial.
