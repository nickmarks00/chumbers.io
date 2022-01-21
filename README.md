# Chumbers.io

This is a website I made in the summer of 2021 to host a collection of essays, posts and other content I wrote and am writing.

[View the site](https://chumbers.io)

Make and run a local copy -

```bash
git clone https://github.com/nickmarks00/chumbers.io.git
npm install
```

## Tech Stack

[chumbers.io](https://chumbers.io) uses a conventional JAMStack.

### Next.js

This website is powered by [Next.js](https://nextjs.org). It is built using the `npx create-next-app` command. I also used the `--with-tailwind` flag for out of the box [Tailwind.css](https://tailwindcss.com) styling (and TypeScript).

Whilst most of the site is built statically or hydrated on the server (using `getStaticProps` or `getServerSideProps`), the variable methods for getting props that Next offers adds a lot of control for future features that I may implement.

At the moment, it made it very easy to render the source markdown using a`next-mdx-remote` along with a series of `rehype` and `remark` plugins to handle rendering LaTeX.

### Apollo GraphQL

The site pulls data from the content server using [GraphQL](https://graphql.com) as the querying layer, in particular [ApolloGraphQL](https://apollographql.com). The latter features a really intuitive and powerful query playground that allows you to interface with your data.

### Vercel

It is only logical that a Next.js app should be deployed with [`Vercel`](https://vercel.com). Compared to a competitor, like Netfliy, I much prefer the UI and the feature set seems slightly further progressed.

### Headless CMS

I write essays locally using a tool such as [Obsidian](https://obsidian.md) that promotes networked thought and note-taking. Importantly, it renders in Markdown which I can easily copy and paste into my headless CMS of choice.

For this project, I chose to use [GraphCMS](https://graphcms.com) because of its use of GraphQL for super fast querying. Their modelling schema also contain a wide variety of field types, including more advanced ones like model references that allow me to reflect the linking present in the authoring of the content (with Obsidian) in the final product.

Whilst this Next.js project is configured with `fallback:true` on dynamic page routes, meaning new posts will be pulled automatically into the site after being published on the first load, GraphCMS also has an integration with Vercel that allows you to re-deploy a given build from within the content editing page.
