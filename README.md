<p align="center">Bento Porfolio</p>

#### The WHY?

Maintain a portfolio and updating it is boring.

You are just adding and deleting sections. Moving things around. Adding and deleting new sections. Sure you could use some site to do it... but do you want to?

Bento Portfolio makes it so you can move the components around and then hit save. At least that's what it's going to be when finished. Specifically, it's aiming to abstract the layout so you can just focus on the content.

Hungry for something good? Try Bento Portfolio.

#### Key Features:

-   Minimal styling (make it your own!)
-   Accessible, semantic HTML markup
-   Blazingly Fast
-   Responsive & SEO-friendly with canonical URLs, OpenGraph data and Meta tags.
-   Made with NextJS and TailwindCSS

---

#### Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example).

If you want to deploy on Netlify, use the following build command under site settings:

```bash
npm run build
```

You also want to make sure the publish directory is out.

---

#### Getting Started

Change into the project directory and run the following command:

```bash
npm run dev
# or
yarn dev
```

---

#### Update Site Metadata (config.ts)

```js
export const SITE: Site = {
    siteUrl: "Your Site URL.",
    author: "Your Author",
    desc: "Your Description",
    title: "Your Title",
    ogImage: "Your OG Image",
    keywords: "Your keywords"
};
```

---

#### Update Colors

You can update the colors in tailwind configuration file.

---

#### Update Favicon

Update the manifest.json file and the icons under the public/images/icons folder.

You can use free tools online such as https://realfavicongenerator.net/ to quickly generate all the different icon sizes and favicon.ico file.

---

#### Acknowledgements

Images from https://shots.so/ and https://icons8.com/.
Logo used from https://logoipsum.com/.

---

Forked from [chrstnl](https://chrstnl.com/)
