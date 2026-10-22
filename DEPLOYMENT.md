# GitHub Pages

The club has authorised publication of this website to GitHub Pages.

Publish the **main** branch, **/(root)** folder, using GitHub Pages' branch
deployment. The root already contains the HTML, CSS, JavaScript, images and
fonts. No build step or package installation is required. `.nojekyll` prevents
unnecessary Jekyll processing. All asset URLs are relative so the project path
`/SHADOWS-FC/` works without changes.

The expected project address is `https://zachos7.github.io/SHADOWS-FC/`. This is
an expected address, not a statement that publication has completed. Confirm
GitHub's Pages configuration, deployment status, and an actual successful
response before announcing the site as live.

## Activation

An administrator can select **Settings → Pages → Build and deployment → Deploy
from a branch → main → /(root) → Save** in the repository, or activate the same
configuration through the GitHub Pages API using existing authorised access.

Do not change repository visibility, force-push, or add credentials to source.
If the repository's plan does not support Pages, report the limitation rather
than changing visibility without authorisation.

## Verification

Verify the published homepage and these relative assets return successfully:

- `styles.css` and `editorial.css`
- `app.js` and `data.js`
- `assets/night-pitch.png` and `assets/shadows-shirt.svg`

In a browser, verify the pitch imagery, pink title, four results, score detail
dialogs, language switch, player search, and mobile menu. Existing data tests
run with `npm test`. Check that the match page totals are 21 goals scored and
25 conceded, and Mike is displayed as Mixalis.
