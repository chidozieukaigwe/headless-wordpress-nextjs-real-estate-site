# Hot Dang Homes — Headless WordPress + Next.js

Production-ready starter for a headless WordPress site using Next.js and WPGraphQL.

**What this project is**

- A Next.js frontend that fetches data from a headless WordPress backend (WPGraphQL).
- Uses static generation (`getStaticProps`) and an Apollo GraphQL client for data fetching.

**Why use this**

- Fast, SEO-friendly frontend with Next.js static rendering and incremental updates.
- Keeps WordPress as a content-authoring system while serving a modern React frontend.

**Contents**

- `pages/` — Next.js pages (SSG/SSR routes).
- `public/` — Static assets.
- `styles/` — Global styles (Tailwind + custom CSS).
- `client.js` — Apollo Client configuration used across pages.

**Prerequisites**

- Node.js 18+ and npm or Yarn.
- A WordPress site with the WPGraphQL plugin installed and the GraphQL endpoint available.

Getting started

- Clone the repo and install dependencies:

```bash
npm install
# or
# yarn
```

- Create a `.env.local` at the project root and add these environment variables (example names):

```
NEXT_PUBLIC_WORDPRESS_URL=https://your-wp-site.com
NEXT_PUBLIC_GRAPHQL_URL=https://your-wp-site.com/graphql
# Optional: auth token or other keys used by your Apollo client
WP_AUTH_TOKEN=your_token_here
```

- Run the dev server:

```bash
npm run dev
```

Data fetching notes

- This project uses an Apollo client (see `client.js`) and example queries in pages like `pages/index.js`.
- If you see `ReferenceError: gql is not defined`, import `gql` at the top of the file where you use it:

```javascript
import { gql } from "@apollo/client";
// or
import gql from "graphql-tag";
```

Build & production

- Build for production:

```bash
npm run build
npm run start
```

- For deployment (recommended: Vercel)
  - Set the same environment variables in your deployment provider.
  - Configure the build command to `npm run build` and the start command to `npm run start` (or use Vercel's defaults).

Apollo / GraphQL configuration

- The Apollo client is expected to live in `client.js` at the project root and export a configured client used by pages.
- Ensure `NEXT_PUBLIC_GRAPHQL_URL` (or the variable you use inside `client.js`) points to your WPGraphQL endpoint.

Troubleshooting

- `gql is not defined`: add `import { gql } from '@apollo/client'` or `import gql from 'graphql-tag'`.
- Network / CORS errors: confirm the WPGraphQL endpoint is reachable from your frontend host and CORS allows requests.
- 404s / missing data: check your GraphQL queries in `pages/*` match your WordPress schema (fields, types, and node names).

Recommendations for production

- Use incremental static regeneration (ISR) for pages that need periodic updates instead of always rebuilding.
- Add monitoring/logging for build failures and data-fetch timeouts.
- Configure caching and a CDN for static assets.

Contributing

- Open an issue or submit a PR with improvements or bug fixes.

License

- MIT
