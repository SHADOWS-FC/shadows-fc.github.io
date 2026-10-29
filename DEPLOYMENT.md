# GitHub Pages

The club has authorised publication of this website to GitHub Pages.

Publish the **main** branch, **/(root)** folder, using GitHub Pages' branch
deployment. The root already contains the HTML, CSS, JavaScript, images and
fonts. No build step or package installation is required. `.nojekyll` prevents
unnecessary Jekyll processing. All asset URLs are relative, so both the team
site's root and the original project path `/SHADOWS-FC/` work without changes.

The team repository is `shadows-fc/shadows-fc.github.io` and its expected Pages
address is `https://shadows-fc.github.io/`. The original repository and site at
`https://zachos7.github.io/SHADOWS-FC/` are retained during migration. The new
address is an expected address, not a statement that publication has completed. Confirm
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

- `styles.css`, `editorial.css` and `theme.css`
- `app.js`, `data.js` and `i18n.js`
- `assets/team.jpg` and `assets/team-celebration.jpg`
- `assets/logos/shadows-fc-2026.jpeg`
- `assets/announcements/coaching-staff.png`

In a browser, verify the two-photo gallery and museum, five results and their
detail dialogs, homepage standings, scorers, grouped player profiles,
announcements, all four languages, dark/light themes and mobile layout.
Existing data tests run with `npm test`. Recorded match totals are 28 goals
scored and 29 conceded; the club-supplied standings retain 27 goals scored.
Mike is displayed as Mixalis. Check that shared player, match and announcement
links use the new domain and reopen the same details.
