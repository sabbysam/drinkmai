# Apps Script spam filter

Paste this into the Apps Script project bound to the **Mai signups** sheet (Extensions → Apps Script). The site cannot stop a POST that skips the page, so `doPost` needs the same rules as `script.js`.

The browser already drops the campaign before `fetch`: a filled `_honey` field, a submit with no real key or pointer, a submit in the first instant the form is open, a venue that is only a brand name, or a note that is a price ask. Blocked submits still show the thank-you and never call this script. Direct POSTs skip all of that. This filter is what catches them.

Use the Chrome V8 runtime (Project settings → Enable Chrome V8 runtime). The note checks use `String.normalize` and Unicode property escapes, which the old Rhino runtime does not run.

Saving the script does not update a versioned web app deployment. After you paste, Deploy → Manage deployments → edit the live deployment → New version.

## Rules

`maiSpamReason_` returns a reason string, or `""` when the row should be saved and emailed as usual. The first match wins.

| Reason | When |
| --- | --- |
| `honeypot` | `_honey` is not empty. |
| `junk-venue` | Venue is a brand or junk name, after case, punctuation, and filler words (`inc`, `llc`, `store`, `shop`, `cafe`, `coffee`, …) are stripped. `Apple`, `Nokia`, `Google`, `FBI`, `AliExpress`, `Wallmart`, and `Walmart` match. So do `Apple Store` and `Google LLC`. `Applewood Coffee` and `Crema Coffee House` do not. |
| `price-note` | The note is a short price ask, including the “I wanted to know your price” line in other languages, or it is gibberish (or almost nothing) plus `drinkmai.com`. A longer note that is actually about stocking, carrying, delivery, or the shop is kept, even if it mentions price. An empty note is kept. |
| `token` | `mai_token` is missing or not `<13-digit ms>.<hash>` from `maiTokenHash`, or the timestamp is more than 2 minutes ahead or more than 12 hours old. |
| `rate-limit` | This email already has 3 accepted signups in the cache window. |

City left on Denver, and a blank interest, are what the campaign sends. They are not reasons by themselves. The page fills interest with Café when the café box is checked, so a blank interest means the POST did not come through that script. A person who submits without JavaScript can also leave interest blank; the venue and note rules still cover the campaign, and the token rule covers other direct POSTs.

A rejected row is appended to a **Spam** tab and is not written to the signups sheet and not emailed. The response still looks like success: JSON `{ "ok": true }` when `ajax=1` (the page’s `fetch`), otherwise a short thank-you page. `_next` is used only when it is an `https://drinkmai.com` URL.

The page’s timing and “did a person actually click or type” checks are not repeated here. A direct POST can claim whatever it wants. The token is the proof that the page’s script ran `maiTokenHash` at submit time. Pepper is `mai-drop-1`. Known vector: `maiTokenHash("1700000000000") === "3cb10ce0"`, so the field would be `1700000000000.3cb10ce0`. Keep the pepper, the junk list, and the note checks in step with `script.js`.

No-JavaScript submits have no token, so they land on Spam and still see the thank-you page. The live page always submits with JavaScript.

### Rate limit

`CacheService.getScriptCache()` keeps a count per lowercase email under `mai1:<email>` for 3600 seconds. Each accepted signup refreshes that hour, because `cache.put` resets the TTL. The fourth accepted attempt in the window is `rate-limit`. Two requests at the same moment can both read the same count; that is close enough. If CacheService throws, the signup is allowed through so a cache outage does not eat a real row. Call `maiNoteSignup_` only after a row has passed the filter, on the path that writes the real sheet.

## Paste

Put the guard at the top of the existing `doPost`, before the row is appended and before the email is sent. Leave the existing “drop a bad email” check where it is, on the accept path.

```javascript
function doPost(e) {
  var fields = maiFields_(e);
  var reason = maiSpamReason_(fields);
  if (reason) {
    maiRecordSpam_(fields, reason);
    return maiQuietOk_(fields);
  }

  maiNoteSignup_(fields.email);

  // Existing behavior stays under this line: drop an invalid email,
  // append the signup row, and email Sam.
}
```

Paste the rest of this file into the same project. Names match `script.js` on purpose.

```javascript
var JUNK_VENUE = {
  apple: 1, nokia: 1, google: 1, fbi: 1, aliexpress: 1, wallmart: 1, walmart: 1,
  amazon: 1, microsoft: 1, samsung: 1, facebook: 1, instagram: 1, meta: 1,
  nike: 1, sony: 1, huawei: 1, xiaomi: 1, alibaba: 1, ebay: 1, shein: 1,
  temu: 1, wish: 1, adidas: 1, nvidia: 1, netflix: 1, tiktok: 1, twitter: 1,
  openai: 1, intel: 1, oracle: 1, adobe: 1, paypal: 1
};

var VENUE_FILLER = {
  inc: 1, llc: 1, ltd: 1, co: 1, corp: 1, company: 1, the: 1, official: 1,
  store: 1, shop: 1, cafe: 1, coffee: 1, house: 1, tea: 1, brand: 1, online: 1
};

var PRICE_LATIN = /\b(prices?|pricing|precios?|precos?|prezz[oi]|prix|preise?|prijzen|prijs|priset|pris|hinta|ceny|cenas?|cenu|cene|preturi|pretul|pret|harga|fiyat\w*|preco)\b/;
var PRICE_PHRASE = /\b(how much|quanto costa|quanto custa|cuanto cuesta|combien|wie ?viel|hoeveel|berapa|your price|the price|know your price)\b/;
var PRICE_MARKS = ["τιμή", "τιμη", "τιμές", "τιμες", "ფას", "цена", "цену", "цены", "ценой", "цене", "ціна", "ціну", "ціни", "价格", "价钱", "价位", "価格", "値段", "가격", "سعر", "ثمن", "कीमत", "दाम", "ราคา", "giá"];

function maiFields_(e) {
  var params = (e && e.parameter) || {};
  function pick(name) {
    var value = params[name];
    if (value == null) return "";
    return String(value).trim();
  }
  return {
    email: pick("email"),
    city: pick("city"),
    interest: pick("interest"),
    venue: pick("venue"),
    note: pick("note"),
    form: pick("form"),
    page: pick("page"),
    honey: pick("_honey"),
    token: pick("mai_token"),
    ajax: pick("ajax"),
    next: pick("_next")
  };
}

function maiSpamReason_(fields) {
  if (fields.honey) return "honeypot";
  if (venueIsJunk(fields.venue)) return "junk-venue";
  if (noteIsSpam(fields.note)) return "price-note";
  if (!maiTokenOk_(fields.token)) return "token";
  if (maiRateLimited_(fields.email)) return "rate-limit";
  return "";
}

function venueIsJunk(name) {
  var raw = String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (!raw) return false;
  var words = raw.split(/\s+/).filter(function (word) { return !VENUE_FILLER[word]; });
  if (!words.length) return false;
  if (JUNK_VENUE[words.join("")]) return true;
  if (words.length === 1 && JUNK_VENUE[words[0]]) return true;
  return false;
}

function foldLatin(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function hasPriceCue(note) {
  var folded = foldLatin(note);
  if (PRICE_LATIN.test(folded) || PRICE_PHRASE.test(folded)) return true;
  for (var i = 0; i < PRICE_MARKS.length; i++) {
    if (note.indexOf(PRICE_MARKS[i]) !== -1) return true;
  }
  return false;
}

function looksGibberish(note) {
  var latin = foldLatin(note).replace(/drinkmai\.com/g, " ").replace(/https?:\/\/\S+/g, " ");
  latin = latin.replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
  var letters = latin.replace(/[^a-z]/g, "");
  if (!letters) return false;
  if (letters.length < 6) return !/[aeiouy]/.test(letters);
  var vowels = letters.replace(/[^aeiouy]/g, "").length;
  if (vowels / letters.length < 0.2) return true;
  var words = latin.split(" ").filter(Boolean);
  var weird = 0;
  for (var i = 0; i < words.length; i++) {
    if (words[i].length >= 4 && !/[aeiouy]/.test(words[i])) weird++;
  }
  return words.length > 0 && weird >= Math.max(1, Math.ceil(words.length * 0.5));
}

function nonLatinRatio(note) {
  var letters = String(note || "").match(/\p{L}/gu);
  if (!letters || !letters.length) return 0;
  var non = 0;
  for (var i = 0; i < letters.length; i++) {
    if (!/\p{Script=Latin}/u.test(letters[i])) non++;
  }
  return non / letters.length;
}

function isSubstantive(note) {
  return /\b(stock|stocking|carry|carrying|wholesale|delivery|invoice|pastry|menu|bakery|roaster|roastery|address|neighborhood|colfax|larimer|hours|our cafe|our café|our shop|our store|our bakery|we have|we're a|we are a)\b/i.test(note);
}

function noteIsSpam(note) {
  var raw = String(note || "").trim();
  if (!raw) return false;
  var price = hasPriceCue(raw);
  var inquiry = isSubstantive(raw);
  var site = /drinkmai\.com/i.test(raw);
  var leftover = raw.replace(/https?:\/\/\S+/gi, " ").replace(/drinkmai\.com/ig, " ").replace(/\s+/g, " ").trim().length;
  if (price && !inquiry && raw.length <= 220) return true;
  if (!inquiry && nonLatinRatio(raw) >= 0.45 && price && raw.length <= 280) return true;
  if (site && (price || looksGibberish(raw) || leftover < 24 || (nonLatinRatio(raw) >= 0.35 && raw.length <= 220))) return true;
  return false;
}

function maiTokenHash(ts) {
  var s = String(ts) + ".mai-drop-1";
  var h = 5381;
  for (var i = 0; i < s.length; i++) {
    h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  }
  return h.toString(16);
}

function maiTokenOk_(token) {
  var parts = String(token || "").split(".");
  if (parts.length !== 2) return false;
  if (!/^\d{13}$/.test(parts[0])) return false;
  if (maiTokenHash(parts[0]) !== parts[1]) return false;
  var ts = parseInt(parts[0], 10);
  if (!ts) return false;
  var now = Date.now();
  if (ts > now + 2 * 60 * 1000) return false;
  if (now - ts > 12 * 60 * 60 * 1000) return false;
  return true;
}

function maiRateKey_(email) {
  var clean = String(email || "").toLowerCase().replace(/\s+/g, "");
  if (!clean || clean.length > 180) return "";
  return "mai1:" + clean;
}

function maiRateLimited_(email) {
  var key = maiRateKey_(email);
  if (!key) return false;
  try {
    var raw = CacheService.getScriptCache().get(key);
    return (parseInt(raw || "0", 10) || 0) >= 3;
  } catch (err) {
    return false;
  }
}

function maiNoteSignup_(email) {
  var key = maiRateKey_(email);
  if (!key) return;
  try {
    var cache = CacheService.getScriptCache();
    var n = parseInt(cache.get(key) || "0", 10) || 0;
    cache.put(key, String(n + 1), 3600);
  } catch (err) { /* fail open: a cache miss must not drop a real signup */ }
}

function maiPlain_(value) {
  var text = String(value || "");
  if (/^[=+\-@]/.test(text)) return "'" + text;
  return text;
}

function maiSpamSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Spam");
  if (!sheet) sheet = ss.insertSheet("Spam");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Submitted", "Reason", "Email", "City", "Interest", "Venue", "Note", "Page", "Form"]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function maiRecordSpam_(fields, reason) {
  try {
    maiSpamSheet_().appendRow([
      new Date(),
      reason,
      maiPlain_(fields.email),
      maiPlain_(fields.city),
      maiPlain_(fields.interest),
      maiPlain_(fields.venue),
      maiPlain_(fields.note),
      maiPlain_(fields.page),
      maiPlain_(fields.form)
    ]);
  } catch (err) { /* still return the quiet success page */ }
}

function maiSafeNext_(next) {
  if (next && /^https:\/\/drinkmai\.com(\/|$|\?)/.test(next)) return next;
  return "https://drinkmai.com/?joined=1";
}

function maiEscape_(value) {
  return String(value).replace(/[&<>"']/g, function (ch) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
  });
}

function maiQuietOk_(fields) {
  if (fields.ajax === "1") {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var next = maiEscape_(maiSafeNext_(fields.next));
  return HtmlService.createHtmlOutput(
    '<!doctype html><meta charset="utf-8"><title>Mai</title><p>Thanks. <a href="' + next + '">Back to Mai</a>.</p>'
  );
}
```

Check the vector from the script editor after pasting (Run → `maiTokenSelfCheck_`, or add a temporary function):

```javascript
function maiTokenSelfCheck_() {
  if (maiTokenHash("1700000000000") !== "3cb10ce0") {
    throw new Error("mai_token hash does not match script.js");
  }
}
```

You can delete `maiTokenSelfCheck_` after it passes. It is not part of `doPost`.
