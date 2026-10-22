# SHADOWS FC

A responsive Greek / English club website. Plain HTML, CSS, and JavaScript;
no framework, package downloads, API keys, or database required.

## Run locally

Requires Python 3 to serve files. Node 18+ is needed only for the data tests.

```sh
cd /workspace/SHADOWS-FC
npm run dev
```

The server uses port 3000. Use `python3 -m http.server 3000 --bind 127.0.0.1`
if a loopback-only server is preferred. Opening `index.html` as a local file
does not work because JavaScript modules require an HTTP server.

```sh
npm test
```

For a single downloadable HTML file:

```sh
npm run build
```

The resulting `dist/index.html` includes all code, styles, and the favicon;
nothing is fetched from a CDN. Serve it with `npm run dev` at the `/dist/` path,
or publish `dist/` on a static host. The original source files are kept
separately for editing. Managed cloud browsers block `file:` navigation;
browser validation here uses HTTP.

## Content and updates

- `data.js`: matches, scorer names, confirmed player profiles, historical matchday squad, shirt numbers, and aliases.
- `app.js`: Greek and English translations and interactions.
- `styles.css`: base layout and responsive rules.
- `editorial.css`: photographic hero, condensed typography, match cards, and visual identity.
- `assets/`: self-hosted graphics and fonts, including the font licence.
- `index.html`: homepage, results, MVP, leaderboard, latest squad, and club details.

All match records were transcribed from club screenshots. Scorer totals are
computed from those records; joint leading scorers receive the same rank.
Match scores and scorer totals are tested for consistency.

### Browsing a full season

The match centre supports opponent search, month and win/draw/loss filters,
chronological or SHADOWS-goal sorting, and cards or compact list views. Results
are paginated at eight matches per page. The selection summary and scorer table
use **all filtered matches**, including those on other pages; the season summary
and player histories always cover the full record. The scope is displayed next
to each set of statistics.

Filters, sort, view and page are kept in the URL. Refreshing or sharing the link
restores them. Each match/player/scorer dialog has its own shareable URL; browser
Back returns through the match-to-player drill-down. Copy-link has a selectable
text fallback when the clipboard is unavailable. Recent-form buttons and scorer
names link directly to match details and scoring histories.

To add results, append records to `matches` in `data.js` with a unique `id`, an
increasing `round`, the confirmed day/month, opponent, score and scorer list.
The latest-result card, totals, month choices, form and rankings update from the
records. Rounds determine chronology across New Year; no season year is inferred.
The existing dated MVP feature remains a historical highlight. Player scoring
histories count **games with recorded goals**, not appearances. Do not infer
assists, lineups, or appearances from scorer lists.

Data tests cover combined filters, draws, chronology across New Year, aliases,
scoring-history reconciliation and a 40-game synthetic season. Browser checks
also exercised 40 temporary fixtures without adding them to the published data.

### Confirmed information

| Match date | Opponent | Score (SHADOWS first) | SHADOWS scorers |
| --- | --- | --- | --- |
| 29/09 | Legrena FC | 4–5 | Gkoumas 1, Dinos 1, Zachos 1, Galanis 1 |
| 06/10 | Aston Voula | 5–6 | Rothos 3, Tasos 1, Xatzi 1 |
| 12/10 | Unathletico FC | 5–8 | Mike 2, Dinos 1, Gkoumas 1, Stavros 1 |
| 21/10 | Savralliolid FC | 7–6 | Gkoumas 3, Dinos 2, Rothos 2 |

The club confirmed that **Mike = Mixalis**, displayed as Mixalis. Original
source names remain in the match data. Other aliases are not merged without
confirmation. Duplicate screenshots are counted once. Gkoumas was confirmed
as MVP against Savralliolid. Earlier MVPs are unknown, not presumed absent.

### Content still to add

- Legrena FC crest; no matching logo has been supplied yet.
- Confirmation of the season year; dates intentionally show day/month only.
- The standalone selfie is excluded at the club's request.

The published squad contains the **13 club-confirmed player profiles**. The
club confirmed that this is the complete current roster. The original matchday
selection is stored separately and does not add unconfirmed players to the
current squad or rewrite match history. Positions and permanent shirt numbers
are added only when supplied by the club. Prior draft interview answers are not published as
actual player quotes. The club plays in **Master League in Voula**, as confirmed
by the club. Supplied crests are used for SHADOWS FC, Aston Voula, Unathletico
and Savralliolid. Legrena retains a typographic lettermark pending its crest.

Confirmed so far: Sotiris Giotis (#1, GK), Chatziamanetoglou Giorgos (#82, GK),
Troka Giorgos (#9, CB), Babakos Dimitris (#11, CB), Zachos Giannis (#5, CB),
Chatzinikolaou Christos (#28, CM), Chatziamanetoglou Dinos (#7, RW), and
Marfa Mixalis (#8, LW), Stavros Kalogiropoulos (#14, CAM), and Kobas Gavrilos
(#69, ST), Rothos Ioannis (#22, ST), Gkoumas Konstantinos (#6, ST), and
Tasos Babakos (#10, ST).
Mixalis is linked to the previously confirmed Mike alias; Stavros
Kalogiropoulos is linked to the recorded scorer Stavros.
The club supplied an updated `SHD.rar` containing 13 original JPEGs. All 13 are copied
without alteration to `assets/players/` and displayed in player cards and
profile dialogs. The club confirmed that `10.jpeg` is Tasos Babakos (#10),
linked to the recorded scorer Tasos. The updated archive supplies `6.jpeg`
for Gkoumas Konstantinos, used in his profile and the MVP feature.
The standalone build embeds the portraits
as well as other images and fonts; it requires no additional image requests.

The stylesheet, application and data URLs carry a release version in
`index.html` and the `app.js` import. Bump them together when publishing a
visual release so returning visitors receive matching markup and styles.
The standalone builder accepts these versioned URLs.

### Visual assets

All eight original logos from `LOGOS.rar` are saved in `assets/logos/`; see
[logo provenance](assets/logos/README.md) for the confirmed mappings.
The club crest also appears as the browser icon. Crests use a common size and
light canvas in the match centre, latest-result card and match dialogs.
CSS keeps original image proportions and blends white image backgrounds into
the card; the Unathletico canvas has its empty outer corners clipped for display. Unused logos are retained
for future fixtures without creating results or standings.

The night pitch background is generated atmospheric artwork, not a photograph
of Star Sport Club. All player portraits and the MVP photo are the original
club-supplied files. Roboto Condensed is bundled from
Fontsource 5.3.0 under the SIL Open Font License (see `assets/FONT-LICENSE.txt`).
The build embeds the graphics and fonts, so the downloadable HTML has no
runtime CDN dependencies.

## Hosting

This is a static site: deploy the repository root to a static host, with no build
command required, or run `npm run build` and publish `dist/` for a single-file
deployment. The site is live at https://zachos7.github.io/SHADOWS-FC/ using
GitHub Pages from main and the root folder. No custom domain is configured.
Use the existing checkout in cloud tasks; no Git worktree is needed.
