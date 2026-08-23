# Public marketing site

## Purpose

The public Localizer site describes the implemented local development workflow without presenting prototype or planned work as available. It is responsive at narrow and wide viewports. The connected workspace at `/projects` stays desktop-only and is documented separately in [desktop-only-dashboard.md](./desktop-only-dashboard.md).

## Design

The home route uses a localization catalog as the signature artifact. It shows a source string, reviewed locale rows, and the generated catalog path instead of a generic dashboard mockup. The public palette is deep green-black, paper-white, and tonal teal. Content is visible by default, and the catalog uses only a brief hover-state transition that is removed by `prefers-reduced-motion`.

## Routes

- `/`: public overview and one dashboard action.
- `/support`: current setup, CLI commands, limitations, issue reporting, and private security reporting.
- `/privacy`: current local storage and conditional hosted-operation behavior.
- `/terms`: website expectations and the MIT boundary.
- `/license`: plain-language MIT summary and links to the canonical text.
- `not-found.tsx`: helpful public 404 page.

## Metadata and discovery

`src/features/marketing/site/getSiteUrl.ts` accepts only validated http(s) values from `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, or `VERCEL_URL`. It falls back to localhost only in development and test. Production without a valid public origin omits canonical URLs, Open Graph URLs, sitemap entries, robots sitemap output, and schema URL rather than publishing localhost. `createPageMetadata.ts` applies the available canonical, Open Graph, and Twitter data for public routes. The root page additionally emits truthful `SoftwareApplication` structured data.

`src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/manifest.ts` provide Next.js metadata routes. Robots excludes dashboard and API areas. `public/llms.txt` and `public/llms-full.txt` state the product's current scope and important boundaries for language models.

## File map

```text
src/features/marketing/components/  public shell, catalog artifact, legal article, and home sections
src/features/marketing/pages/       route-specific public pages
src/features/marketing/site/        canonical URL and metadata helpers
src/app/{support,privacy,terms,license}/  thin route files with page metadata
src/app/{sitemap,robots,manifest}.ts      discovery metadata routes
public/llms*.txt                    AI-readable product context
LICENSE                             canonical MIT license text
SECURITY.md                         private vulnerability reporting process
```

## Content boundaries

Copy must stay aligned with the local CLI/dashboard implementation. Public dashboard actions appear only in development or test; production sends visitors to local setup support. Do not claim published npm installation, hosted authentication, automatic translation, remote repository import, pull-request automation, or production storage unless those capabilities are actually shipped. Do not add a support email or SLA without a real maintained support channel.
