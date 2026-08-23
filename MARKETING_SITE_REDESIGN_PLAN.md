# Localizer Marketing Site Redesign Plan

## Goal

Redesign the public Localizer website around the product's real local-first workflow, make the open-source MIT model explicit, add trustworthy policy and support pages, and publish complete machine-readable discovery files.

The dashboard remains a separate desktop-only workspace at `/projects`. Public marketing and policy pages remain responsive and readable on phones, tablets, and desktop screens.

## Product truth to communicate

- Localizer is an open-source localization workflow for iOS projects.
- The current implemented workflow connects the browser dashboard to a local CLI during development.
- Local source files stay under the CLI's control. The dashboard receives normalized localization data, not unrestricted filesystem access.
- Development workspaces persist locally without an account.
- Production authentication, hosted sync, native source parsing, automatic translation, and GitHub pull-request automation are future work unless the implementation says otherwise.
- The repository is licensed under the MIT License.

## Design direction

The site will use the localization catalog itself as the signature artifact. The first screen will compose real source strings, locale values, review states, and a catalog path into one editorial translation surface. It will not use a generic two-column SaaS hero, fake macOS chrome, a decorative code window, an icon-card grid, a pricing block, or a gradient call-to-action slab.

The visual system will use:

- A disciplined ink, paper-white, and deep teal palette with no blue-to-purple gradients or generic gray surfaces.
- Large typographic contrast and an asymmetric but aligned editorial composition.
- Purpose-built localization marks and file geometry instead of icons placed in colored tiles.
- Tonal depth, restrained directional shadows, and explicit focus states.
- Motion only where it explains translation flow or responds to interaction, with content visible by default and a reduced-motion fallback.
- Short, plain-language copy grounded in current product behavior.

## Public routes

- `/`: redesigned marketing home.
- `/support`: setup help, common fixes, project links, and honest support boundaries.
- `/privacy`: current data behavior for the public site, local development dashboard, CLI, and third-party links.
- `/terms`: website and software terms, MIT license relationship, acceptable use, disclaimers, and change handling.
- `/license`: readable open-source summary linked to the canonical repository license.

Each route will have a focused Server Component page with unique metadata. Reusable public navigation, footer, legal layout, and brand artifact components will each live in their own file.

## Search and machine-readable discovery

- Add canonical metadata, Open Graph data, and page-specific titles and descriptions.
- Add `sitemap.ts` covering every indexable public page.
- Add `robots.ts` that permits public content and excludes development dashboard and API paths.
- Add a web manifest with accurate standalone metadata and brand colors.
- Add `llms.txt` and `llms-full.txt` with concise and expanded project context for agents.
- Add a helpful public 404 page.
- Add structured data only where it truthfully describes the open-source software project.
- Keep the site URL configurable and give local development a safe fallback.

## Open-source project files

- Confirm or add the canonical MIT `LICENSE` text.
- Add a `SECURITY.md` with a private-reporting-first process that does not ask people to disclose vulnerabilities in public issue details.
- Update the README and existing feature documentation so the marketing claims match the implementation.
- Add a dedicated marketing-site feature document with routes, component tree, copy boundaries, metadata, and maintenance notes.

## Separate reusable development guidance

Create `/Users/starship/Downloads/development-guidance.md` as a platform-neutral local-first development standard. It will cover:

- Full account-free access in development without pretending a user is authenticated.
- Local workspace identity and storage adapters for web, iOS, Android, desktop, and cross-platform apps.
- Repository and capability boundaries that allow optional production auth and sync later.
- OpenCut and Localizer implementation patterns and the reasons they differ.
- Security gates that prevent development no-auth behavior from silently becoming a production bypass.
- Data migration, backup/export, testing, acceptance criteria, and a copy-ready implementation brief.

## Implementation sequence

1. Inventory the current marketing routes, shared shell, assets, metadata, tests, and open-source files.
2. Establish product claims and policy copy from implemented behavior and authoritative sources.
3. Build the public design system and shared shell using atomic files.
4. Rebuild the home page around the real localization artifact.
5. Add support, privacy, terms, license, and not-found routes.
6. Add metadata, sitemap, robots, manifest, structured data, and LLM discovery files.
7. Add or update repository and feature documentation.
8. Create the reusable Downloads guidance document.
9. Run formatting, type checking, linting, tests, and a production build.
10. Verify every page and interactive control in a real browser at 375, 768, 1024, and 1440 pixel widths.
11. Re-read the anti-slop law point by point, repair every visual or copy violation found, and repeat validation.
12. Commit the complete change and push `main` to `origin`.

## Acceptance criteria

- The home page is visually specific to localization and could not be swapped onto a generic developer product.
- The first viewport is composed deliberately, contains no clipped content, and remains usable at every public breakpoint.
- Public copy is simple, human, and accurate about what works today.
- All visible controls and links work with a real click and have keyboard-visible focus states.
- Privacy, terms, support, and license pages are readable, linked from the shared site shell, and have route-specific metadata.
- The site clearly identifies Localizer as MIT-licensed open source without implying warranties the license does not provide.
- Sitemap, robots, manifest, `llms.txt`, and `llms-full.txt` return valid content.
- The dashboard remains desktop-only while the marketing and policy pages remain responsive.
- No content depends on an entrance animation to become visible.
- No unapproved production data collection, account requirement, customer claim, testimonial, price, support address, or future feature is invented.
- The reusable development guidance works as an implementation standard for web, native mobile, desktop, and cross-platform projects.
- Repository checks pass, browser console errors are resolved, the worktree is clean, and `origin/main` contains the final commit.
