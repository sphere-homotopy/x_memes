# Repository conventions for interactive web toys

Every standalone playable/interactive project placed at the repository root (`index.html`) or in a top-level `<project>/index.html` directory must include the existing Ko-fi support and analytics infrastructure. Do not publish a new HTML page without these pieces.

For `<project>/index.html`:

1. Add `<link rel="stylesheet" href="../support.css">` and `<script src="../analytics.js"></script>` in the document head.
2. Put the following immediately below the toy or its instructions, inside the main content container:

   `<div class="support-project-wrap"><a class="support-project" href="../go/kofi/<project>/" target="_blank" rel="noopener noreferrer">Support this project ↗</a></div>`

3. Create `go/kofi/<project>/index.html`, using `go/kofi/millionaire/index.html` as the template. It must load `../../../analytics.js`, be `noindex,nofollow`, and redirect after the short tracking delay to `https://ko-fi.com/sphere_homotopy`.
4. Add the project link to `README.md` and its tracked route to `docs/analytics.md`.

For the root Mirrors page, use `./` in place of `../`, and the existing `mirrors` tracking slug. Do not change `support.css` or create another support-button style when the shared style works.

The `support.test.mjs` suite automatically discovers all standalone top-level projects and checks the required stylesheet, script, button, and tracked redirect. The CI workflow checks them on pull requests and pushes to `main`. Run `node --test support.test.mjs tracking-routes.test.mjs` before publishing. If the support check fails, fix the missing integration rather than excluding the page from discovery.
