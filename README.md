# Mai

Lightly sparkling matcha. Calm energy. No chaos.

Live site: https://drinkmai.com

## Preview locally

From the repo root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 and walk Home, Story, FAQ (`the-drop.html`), and Privacy. Relative URLs are required so the custom domain and the GitHub project path both work.

## Product facts (locked)

Sugar is about 4g per can — lightly sweetened, not unsweetened or sugar-free. Caffeine is naturally occurring from the matcha; do not invent a milligram number. Carbonation is low and quiet. First drop is café-first in Seattle, then specialty shops; the waitlist hears first. Do not invent a launch date or a can price. Instagram is live at [instagram.com/drink.maimatcha](https://www.instagram.com/drink.maimatcha/).

`assets/founders.svg` is the brand mark in the Home circle and Story 4:5 frames — two cans, a peach sun. Not a portrait of Sam and Stephen. The frame geometry stays put if a real photo lands later.

## GitHub Pages

Pages deploys from `main` at `/` to the custom domain in `CNAME` (`drinkmai.com`). After a merge:

- https://drinkmai.com
- https://www.drinkmai.com
- https://sabbysam.github.io/drinkmai

Do not replace relative URLs with root-absolute `/…` paths. Keep `CNAME` and `googlee25e976873824933.html`.

## Waitlist

The first-drop and café forms POST to `hello@drinkmai.com` through [Formsubmit](https://formsubmit.co) (`https://formsubmit.co/hello@drinkmai.com`). Changing the address requires activating Formsubmit again: the first live submission sends an Activate Form email to `hello@drinkmai.com`. Open that mail, or later signups will not arrive.
