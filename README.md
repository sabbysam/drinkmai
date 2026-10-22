# Mai

Lightly sparkling matcha with a pinch of real sea salt. Quiet bubbles. Calm energy.

Live site: https://drinkmai.com

## Preview locally

From the repo root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 and walk Home and Privacy. The site is one page: hero, What’s in the can (`#ingredients`), story (`#story`), questions (`#faq`), and Denver / cafés (`#cafes`). The header is the wordmark and one “Join the first drop” button, with no nav links.

Old pages are redirect stubs, since GitHub Pages has no server redirects: `story.html` → `/#story`, `the-drop.html` and `/faq/` → `/#faq`. Keep them so old links still land.

Home links use `/`, not `index.html`, so Search Console does not treat them as two URLs. `privacy.html` stays relative.

## Product facts (locked)

Real matcha. Caffeine comes naturally from the matcha. No milligram number. A pinch of real sea salt, for flavor. Lightly sparkling, quiet bubbles. Sugar line, everywhere it is stated: “About 4g of sugar” per can, lightly sweetened, not unsweetened and not sugar-free. 330ml can. Pre-launch: no shop, no price, no launch date. Denver cafés first, then specialty shops. Final prototype round, and starting to look for a co-packer. Founders: Sam and Stephen.

Do not add caffeine mg, sodium mg, calories, prices, dates, flavor names, or supplier names. Leave a `TODO(Sam)` instead.

Instagram: [instagram.com/drink.maimatcha](https://www.instagram.com/drink.maimatcha/).

`assets/founders.svg` is the brand mark (two cans, a peach sun), not a portrait. When a real photo of Sam and Stephen lands, keep this SVG as a small badge on it.

## GitHub Pages

Pages deploys from `main` at `/` to the custom domain in `CNAME` (`drinkmai.com`). Do not change hosting or DNS from this repo’s pages. Keep `CNAME` and `googlee25e976873824933.html`.

## Waitlist

One join sheet, a modal on every page. It posts through [Formsubmit](https://formsubmit.co) to `hello@drinkmai.com`. The endpoint lives in one place: `MAI_FORM_ENDPOINT` at the top of `script.js`. Swap that string when the provider changes.

“Join the first drop” opens the sheet. A café or shop can check “I’m a café / shop” in that same sheet to add venue and a note. There is no second form and no separate signup page. `#waitlist` on any page other than home redirects to `/#waitlist`, which opens the sheet.

The sheet auto-opens once, after about 8 seconds or halfway down the page, unless it was already dismissed or someone already joined (`localStorage` keys `mai-popup-dismissed` and `mai-joined`).

The first live submission to a new Formsubmit address sends an activation email to `hello@drinkmai.com`. Open it, or later signups will not arrive.

A test submit should land in that inbox:

- Waitlist subject: `Mai first drop waitlist` (email, optional city, optional interest).
- Café subject: `Mai café / retail inquiry` (email, optional city, optional interest, venue, optional note).
- Success stays in the sheet when the ajax call works. If it falls back to a full post, Formsubmit returns to `?joined=1` (waitlist) or `?joined=cafe` (café).
