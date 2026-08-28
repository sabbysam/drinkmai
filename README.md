# Mai

Lightly sparkling matcha. Calm energy. No chaos.

Live site: https://drinkmai.com

## Preview locally

From the repo root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 and walk Home, Story, FAQ (`the-drop.html`), and Privacy. Relative URLs are required so the custom domain and the GitHub project path both work.

## Fill-in spots

Search the repo for `[PLACEHOLDER]`. Those are facts that are not live yet: launch window, caffeine, sugar, price, vegan/clean-label, where it’s sold, and Instagram URL. Do not invent a handle or numbers in the meantime.

`assets/founders.jpg` is an interim still-life of two cans — not a portrait of Sam and Stephen. Drop a real photo over that same path when you have one; the Home circle and Story 4:5 frame stay put.

## GitHub Pages

Pages deploys from `main` at `/` to the custom domain in `CNAME` (`drinkmai.com`). After a merge:

- https://drinkmai.com
- https://www.drinkmai.com
- https://sabbysam.github.io/drinkmai

Do not replace relative URLs with root-absolute `/…` paths. Keep `CNAME` and `googlee25e976873824933.html`.

## Waitlist

The first-drop and café forms POST to `hello@drinkmai.com` through [Formsubmit](https://formsubmit.co) (`https://formsubmit.co/hello@drinkmai.com`). Changing the address requires activating Formsubmit again: the first live submission sends an Activate Form email to `hello@drinkmai.com`. Open that mail, or later signups will not arrive.
