# Project data is fetched from GitHub at build time

The site is a static prerender on Netlify, so Project data (description, languages, homepage, archived state) is fetched from the GitHub API during the build, not per request. Any fetch failure (renamed-away, deleted or private repository, API outage, rate limit) fails the build instead of silently dropping the Project: Netlify keeps serving the last good deploy, and the build log names the broken repository. A weekly GitHub Actions cron calls a Netlify build hook so the data doesn't go stale between commits. Builds authenticate with a token (a Netlify secret on Netlify, the built-in `GITHUB_TOKEN` in CI) because unauthenticated calls from shared build IPs hit the 60-requests-per-hour limit.

## Considered Options

- **Runtime fetch (SSR or a serverless function)**: always fresh, but adds a server and cold starts to a site that is otherwise fully static, and puts GitHub's availability on the request path.
- **Skip failed Projects and keep building**: the build never breaks, but a missing Project can go unnoticed for months.
