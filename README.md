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

- `data.js`: matches, scorer names, confirmed player profiles, historical matchday squad, shirt numbers, aliases, and club announcements.
- `app.js`: Greek and English translations and interactions.
- `styles.css`: base layout and responsive rules.
- `editorial.css`: photo-led homepage, condensed typography, match cards and responsive layout.
- `black-pink.css`: the black/pink club palette, dark cards and match/player dialogs.
- `gallery.css`: the two-photo gallery and full-viewport museum room.
- `theme.css`: Dark/Light controls and the white/pink Light palette.
- `background-details.css`: broad diagonal black/pink background stripes.
- `assets/`: self-hosted graphics and fonts, including the font licence.
- `index.html`: team photo gallery, latest-first results, scorer leaderboard, and complete squad.

All match records were transcribed from club screenshots. Scorer totals are
computed from those records; joint leading scorers receive the same rank.
Match scores and scorer totals are tested for consistency.

### Homepage and navigation

The homepage has four sections, in this order: a gallery of the two supplied
team photographs, matches from newest to oldest, all-time recorded scorers, then
all 13 confirmed players. There are no search boxes, filter/sort controls, sponsor
panels or intervening promotional sections. Player portraits retain their
original photographic backgrounds.

The squad is grouped into goalkeepers (GK), defenders (CB), midfielders (CM/CAM)
and forwards (RW/LW/ST), preserving the confirmed position on each player card.
All 13 profiles remain available: 2 goalkeepers, 3 defenders, 2 midfielders and
6 forwards.

The compact gallery uses a black/pink photo card with thumbnail navigation.
Visitors can use arrows, indicator buttons, thumbnails, horizontal scrolling,
touch swipes or mouse dragging; the focused gallery supports Left/Right and
Home/End. Clicking a photograph or its museum button opens a full-viewport
exhibition room: the complete original image is framed on a museum wall,
with spotlights, panel details and a perspective floor. Previous/next controls,
arrow keys and Escape remain available. Enter on the focused gallery opens the selected photograph. The viewer
restores focus on closing and keeps the gallery selection in sync. There is no
automatic advancement. Controls follow reduced-motion settings, announce the
current photograph and retain the selected image across layout/language changes.

Only the two team photographs are presented in a compact SHADOWS Museum
setting within the existing homepage gallery, with an immersive room on opening
either photo. The exhibition wall, spotlight, floor and frame are decorative CSS. Player portraits remain in the squad
section; the navigation, matches, scorers and announcements retain their earlier
interface. There is no separate Museum page or photograph category browser.

The active club crest is the supplied black/pink image at
`assets/logos/shadows-fc-2026.jpeg`, used in the header, footer, match cards,
match details and browser icon. It is copied without alteration. Club crests
use consistent padded display areas with their original artwork and colours.
The refreshed 2026 club crests retain their black canvases; Legrena keeps
its purple canvas. The other supplied crests are retained for future fixtures. No background masking or automatic image modification is applied. The black/pink theme covers
both homepage and announcements, with brighter outcome colours for dark cards.
The background uses broad diagonal black/deep-pink stripes with unequal widths.

The upper-right Dark/Light buttons switch the existing interface between the
original dark palette (default) and white/pink surfaces. Photographs and supplied
logos retain their original colours. The same controls are available inside
the museum. The choice is stored under `shadows-theme` when browser storage is
available, and applied in the document head before styles load to avoid a
dark flash on a returning Light visit. With storage disabled, switching still
works for the current page. Language, navigation and content are independent
of the selected appearance.

Matches are paginated at eight per page, always in descending round order.
In match cards, details and player histories, a win colours only the SHADOWS
goal number green; a loss colours only the opponent number red. The other number
stays neutral. A draw colours both numbers grey. Result letters and accessible labels also convey
the outcome.
Old search/filter/sort/view URL parameters are ignored and removed, so links
from the earlier archive cannot silently hide matches or players. Scorer totals
always cover the complete recorded match list, including matches on other pages.

Each match/player/scorer dialog retains its shareable URL. Browser Back returns
through the match-to-player drill-down; the copy-link button has a selectable
text fallback when clipboard access is unavailable. Click scorer names or player
cards to explore their scoring histories and the corresponding matches.

The Announcements navigation link opens a separate newsroom view at
`#announcements`, leaving the homepage order intact. Entries are read from
`announcements` in `data.js`, newest `order` first, and open as full statements
with shareable `?announcement=…#announcements` links. Each record has a unique
`id`, an increasing `order`, translated `title` and `summary` objects, and a
`body` object containing paragraph arrays under `el` and `en`. If a translation
is missing, the supplied language is shown. Only add a `date` when confirmed.
An optional `photo` path and translated `photoAlt` object pair an announcement
with its original photograph.

The first entry is the official statement regarding Sotiris, transcribed from
the club-supplied Instagram caption screenshot. Its original Greek wording,
paragraphs and closing signature are retained, including when the interface is
in English. No publication date is inferred. The accompanying embroidered-crest
photograph at `assets/announcements/sotiris-statement.jpg` is the separate image
supplied with the statement, copied without alteration; the caption screenshot
is used only as the text source.

To add results, append records to `matches` in `data.js` with a unique `id`, an
increasing chronological `round`, the confirmed day/month, opponent, score and
scorers. Rounds determine chronology across New Year; no season year is inferred.
Scoring histories count games with recorded goals, rather than appearances.

Match details also show text-only lineups transcribed from the club graphics.
The first three matches have starting sevens; Unathletico additionally lists
Babakos T. as a substitute and Zachos as head coach. The Aston Voula lineup uses
the handwritten Rothos correction at LW. Savralliolid lists its eight-player
matchday squad and three coaching staff separately. Printed names, matchday
numbers and historical positions are preserved without guessing unconfirmed
profile aliases or assuming a listed substitute came on. The supplied lineup
graphics are not published as images.
The club later corrected Savralliolid's coaching staff: Καρβούνης replaces Giotis.

Zachos Giannis (#5) was injured against Legrena on 29/09. Match details and his
profile show “Estimated absence: 1.5 months”, with the injury date stated
separately and an
approximate return in mid-November. The site does not infer a medical diagnosis,
a season year or that he has already returned.

The team photographs at `assets/team.jpg` and `assets/team-celebration.jpg` are
the original attachments supplied by the club. Both are copied without
alteration; CSS frames them in the gallery. The added photograph is displayed
in full, including the trophy, medals and shirts. No date or competition win is
inferred from that photograph.
All player portraits and opponent crests are also the club-supplied originals.

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
as MVP against Savralliolid. The club subsequently confirmed Troka against
Legrena, Rothos against Aston Voula, and Mike (the confirmed Mixalis alias)
against Unathletico. MVP display names are kept as supplied by the club.

### Content still to add

- Confirmation of the season year; dates intentionally show day/month only.
- The standalone selfie is excluded at the club's request.

The published squad contains the **13 club-confirmed player profiles**. The
club confirmed that this is the complete current roster. The original matchday
selection is stored separately and does not add unconfirmed players to the
current squad or rewrite match history. Positions and permanent shirt numbers
are added only when supplied by the club. Prior draft interview answers are not published as
actual player quotes. The club plays in **Master League in Voula**, as confirmed
by the club. Supplied crests are used for SHADOWS FC, Aston Voula, Unathletico
and Savralliolid, together with the separately supplied Legrena FC crest.

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
for Gkoumas Konstantinos, used in his profile.
The standalone build embeds the portraits
as well as other images and fonts; it requires no additional image requests.

The stylesheet, application and data URLs carry a release version in
`index.html` and the `app.js` import. Bump them together when publishing a
visual release so returning visitors receive matching markup and styles.
The standalone builder accepts these versioned URLs.

### Visual assets

The eight original logos from `LOGOS.rar` and the separately supplied Legrena
crest are saved in `assets/logos/`; see
[logo provenance](assets/logos/README.md) for the confirmed mappings.
The club crest also appears as the browser icon. Crests use a common size and
light canvas in the match centre and match dialogs.
CSS keeps original image proportions and blends white image backgrounds into
the card; the Unathletico canvas has its empty outer corners clipped for display. Unused logos are retained
for future fixtures without creating results or standings.

The homepage uses the original team photograph supplied by the club.
The older generated night-pitch artwork is retained as an unused asset.
All displayed player portraits are the original club-supplied files. Roboto Condensed is bundled from
Fontsource 5.3.0 under the SIL Open Font License (see `assets/FONT-LICENSE.txt`).
The build embeds the graphics and fonts, so the downloadable HTML has no
runtime CDN dependencies.

## Hosting

This is a static site: deploy the repository root to a static host, with no build
command required, or run `npm run build` and publish `dist/` for a single-file
deployment. The site is live at https://zachos7.github.io/SHADOWS-FC/ using
GitHub Pages from main and the root folder. No custom domain is configured.
Use the existing checkout in cloud tasks; no Git worktree is needed.

### Classical museum room

The two-photo museum uses a self-hosted generated virtual Greek gallery background
with marble columns and statues. `greek-museum.css` affects only the open museum.
Directional artwork movement and room parallax simulate moving between exhibits.
Navigation queues only the latest destination; closing cancels pending movement.
Reduced-motion users see immediate photo changes, and resizing settles movement.
Original team photographs, homepage, match records and Dark/Light choices are unchanged.

### Player careers

Zachos (#5) has a seven-line career list, with labels and slash-separated ranges
reproduced exactly as subsequently supplied by the club: 2006/2016 -
A.O.Vouliagmenis; 2016/2017 - Astera Varis; 2018 - Frontistirio Prisma;
2019/2020 - Covid 19; 2021/2022 - Klassiko Chiou; 2023 - DNP;
2024/2026 - Shadows FC. There is no biography paragraph, additional career
heading, loan label, goal column, or explanatory note. The same supplied lines
appear in either interface language. Recorded-match scoring statistics remain
separate and unchanged. The club-uploaded originals AOV.jpeg, ASTERAS.png and KLASIKO.jpeg are shown beside their matching career lines, together with the SHADOWS crest.

### Crest presentation

crest-display.css presents original logos on consistent padded canvases.
SHADOWS uses black, Legrena purple, Unathletico cream, and other opponents
white. Artwork is contained without arbitrary shield clipping or blend modes.
The prior automatic background masking was removed at the club’s request.
The seven supplied career lines remain unchanged. The three club-uploaded career logos are displayed with their original backgrounds. Altered generated substitutes are not published.

Career logos were supplied directly through GitHub upload commit 672c4da.
Their artwork is unmodified and contained in small neutral, navy or black
canvases. Non-playing rows have no invented organisation badges.

As a temporary club-approved entry, each of the other twelve profiles displays
`2026 - Shadows FC` with the original SHADOWS crest. Their goal totals are not
invented. `currentShadowsCareer()` returns independent data for each profile;
replace its call with the supplied history when that player’s details arrive.
Zachos retains his complete seven-line career and its four supplied crests.
