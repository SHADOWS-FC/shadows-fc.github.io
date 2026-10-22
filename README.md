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

- Detailed player list, preferred spellings, and confirmed identity mappings.
- Original club logo and labelled player/team photos. The screenshot attachments
  were visible in chat but did not have downloadable file paths in the workspace.
  Do not substitute generated images for the original club assets.
- Confirmation of the season year; dates intentionally show day/month only.
- The standalone selfie is excluded at the club's request.

Club-confirmed profiles are shown first, followed by names from the latest
matchday post that have not yet been confirmed individually. The original
matchday selection is stored separately so new player confirmations do not
rewrite match history. Positions and permanent shirt numbers are added only
when supplied by the club. Prior draft interview answers are not published as
actual player quotes. Lettermarks are typographic placeholders, not the
original club crests.

Confirmed so far: Sotiris Giotis (#1, GK), Chatziamanetoglou Giorgos (#82, GK),
Troka Giorgos (#9, CB), Babakos Dimitris (#11, CB), Zachos Giannis (#5, CB),
Chatzinikolaou Christos (#28, CM), and Chatziamanetoglou Dinos (#7, RW).
Their named portrait images are visible in chat, but the originals have not
been delivered as downloadable files to the execution workspace. Photos stay
unset until an original-file upload (for example a ZIP of portraits) is provided.
The UI supports original portraits as soon as `photo` paths are assigned.

### Visual assets

The night pitch background is generated atmospheric artwork, not a photograph
of Star Sport Club. The MVP shirt is a conceptual vector illustration in the
club colours, not a product photo. Both will sit alongside original club and
player assets once those files are available. Roboto Condensed is bundled from
Fontsource 5.3.0 under the SIL Open Font License (see `assets/FONT-LICENSE.txt`).
The build embeds the graphics and fonts, so the downloadable HTML has no
runtime CDN dependencies.

## Hosting

This is a static site: deploy the repository root to a static host, with no build
command required, or run `npm run build` and publish `dist/` for a single-file
deployment. The site is live at https://zachos7.github.io/SHADOWS-FC/ using
GitHub Pages from main and the root folder. No custom domain is configured.
Use the existing checkout in cloud tasks; no Git worktree is needed.
