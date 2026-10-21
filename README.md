# Mai

Lightly sparkling matcha with a pinch of real sea salt. Quiet bubbles. Calm energy.

Live site: https://drinkmai.com

## Preview locally

From the repo root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 and walk Home, Story, FAQ (`the-drop.html`), and Privacy. `/faq/` refreshes to `/the-drop.html#faq` (GitHub Pages has no server redirects).

Home links use `/`, not `index.html`, so Search Console does not treat them as two URLs. Other pages stay relative (`story.html`, `the-drop.html`, `privacy.html`).

## Product facts (locked)

Real matcha. Caffeine comes naturally from the matcha. No milligram number. A pinch of real sea salt, for flavor. Lightly sparkling, quiet bubbles. Sugar line, everywhere it is stated: “About 4g of sugar” per can, lightly sweetened, not unsweetened and not sugar-free. 330ml can. Pre-launch: no shop, no price, no launch date. Seattle cafés first, then specialty shops. Final prototype round, and starting to look for a co-packer. Founders: Sam and Stephen.

Do not add caffeine mg, sodium mg, calories, prices, dates, flavor names, or supplier names. Leave a `TODO(Sam)` instead.

Instagram: [instagram.com/drink.maimatcha](https://www.instagram.com/drink.maimatcha/).

`assets/founders.svg` is the brand mark (two cans, a peach sun), not a portrait. When a real photo of Sam and Stephen lands, keep this SVG as a small badge on it.

## GitHub Pages

Pages deploys from `main` at `/` to the custom domain in `CNAME` (`drinkmai.com`). Do not change hosting or DNS from this repo’s pages. Keep `CNAME` and `googlee25e976873824933.html`.

## Waitlist

Both forms post through [Formsubmit](https://formsubmit.co) to `hello@drinkmai.com`. The endpoint lives in one place: `MAI_FORM_ENDPOINT` at the top of `script.js`. Swap that string when the provider changes.

The first live submission to a new Formsubmit address sends an activation email to `hello@drinkmai.com`. Open it, or later signups will not arrive.

A test submit should land in that inbox:

- Waitlist subject: `Mai first drop waitlist` (email, optional city, optional interest).
- Café subject: `Mai café / retail inquiry` (venue, city, email, optional note).
- Success on the page does not jump when the ajax call works. If it falls back to a full post, Formsubmit returns to `?joined=1` (waitlist) or `?joined=cafe` (café).
