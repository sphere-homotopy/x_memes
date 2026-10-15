# Unified analytics for x_memes

## What we measure

Use one privacy-first Cloudflare Web Analytics site for the whole GitHub Pages host.

Project pageviews are separated by path:
- Mirrors: `/x_memes/`
- Millionaire: `/x_memes/millionaire/`
- Custom Boob: `/x_memes/custom-boob/`
- Mushroom Revenge: `/x_memes/mushroom-revenge/`

Acquisition experiments use first-party route paths instead of UTM parameters:
- Reddit: `/x_memes/go/millionaire/reddit/`
- Hacker News: `/x_memes/go/millionaire/hacker-news/`
- Product Hunt: `/x_memes/go/millionaire/product-hunt/`

Ko-fi click intents use first-party route paths before redirecting to Ko-fi:
- Millionaire: `/x_memes/go/kofi/millionaire/`
- Mirrors: `/x_memes/go/kofi/mirrors/`
- Custom Boob: `/x_memes/go/kofi/custom-boob/`
- Mushroom Revenge: `/x_memes/go/kofi/mushroom-revenge/`

This makes project/source attribution readable from path/referrer dimensions and avoids relying on cross-site cookies.

## Activation

`analytics.js` is intentionally fail-closed until a Cloudflare Web Analytics token is configured.

1. In Cloudflare Web Analytics, add `sphere-homotopy.github.io` as a non-proxied site.
2. Copy the site token from the generated beacon snippet.
3. Put that value into `CLOUDFLARE_WEB_ANALYTICS_TOKEN` in `/analytics.js`.
4. Verify a normal project pageview and one `/go/kofi/.../` click appear in Web Analytics before public seeding.

No other project file should need a provider-specific token.

## New projects

New top-level web toys must include `support.css`, `analytics.js`, the shared Ko-fi support control, and their own `go/kofi/<project>/` tracked redirect. See `AGENTS.md` for the exact markup. The automatically discovered project checks in `support.test.mjs` enforce this on pull requests and pushes to `main`; they validate integration but do not inject markup at build time.

## Reading the experiment

For Millionaire seeding, compare:
- visits landing from each `/go/millionaire/<source>/` route;
- resulting pageviews on `/x_memes/millionaire/`;
- Ko-fi click intents at `/x_memes/go/kofi/millionaire/`;
- platform-native engagement on the seed post.

Do not infer historical traffic from this setup. Before the analytics loader and tracked routes existed, this repository recorded neither pageviews nor Ko-fi outbound clicks, so those counts are not recoverable from the site itself.

## Privacy / scope

Do not add fingerprinting, user IDs, email capture, session replay, or cross-site identity stitching. This setup is for aggregate product/distribution measurement only.
