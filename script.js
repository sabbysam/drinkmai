(function () {
  /**
   * Waitlist provider: Formsubmit, for now.
   * Mail goes to hello@drinkmai.com.
   * This is the only endpoint. Replace it when the provider changes.
   */
  var MAI_FORM_ENDPOINT = "https://formsubmit.co/hello@drinkmai.com";

  var SHARE_URL = "https://drinkmai.com";
  var SHARE_TEXT = "Light as sea spray. Calm as matcha. Join the first drop.";
  var STORAGE = "mai-joined";
  var DISMISS = "mai-popup-dismissed";

  var path = location.pathname.replace(/\/index\.html$/, "/");
  var onHome = path === "/" || path === "";

  if (location.hash === "#waitlist" && !onHome) {
    location.replace("/#waitlist");
    return;
  }

  function formAjaxEndpoint(endpoint) {
    var marker = "://formsubmit.co/";
    var at = endpoint.indexOf(marker);
    if (at === -1) return null;
    if (endpoint.indexOf("://formsubmit.co/ajax/") !== -1) return endpoint;
    return endpoint.slice(0, at) + marker + "ajax/" + endpoint.slice(at + marker.length);
  }

  var params = new URLSearchParams(window.location.search);

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (err) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (err) { /* ignore */ }
  }

  function alreadyJoined() {
    return params.get("joined") === "1" || params.get("joined") === "true" || storageGet(STORAGE) === "waitlist";
  }

  function cafeJoined() {
    return params.get("joined") === "cafe" || storageGet(STORAGE) === "cafe";
  }

  function dismissed() {
    return storageGet(DISMISS) === "1" || alreadyJoined() || cafeJoined();
  }

  function pageName() {
    if (path.indexOf("404") !== -1) return "404";
    if (path.indexOf("story") !== -1) return "Story";
    if (path.indexOf("the-drop") !== -1) return "FAQ";
    if (path.indexOf("privacy") !== -1) return "Privacy";
    return "Home";
  }

  function start() {
  if (!document.getElementById("join-modal") && document.body) {
  document.body.insertAdjacentHTML("beforeend", [
    '<dialog id="join-modal" class="join-modal" aria-labelledby="join-title">',
    '  <div class="join-frame">',
    '    <button type="button" class="join-x" data-join-close aria-label="Close">',
    '      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    '    </button>',
    '    <div class="join-card" data-join-card>',
    '      <div class="join-scene" aria-hidden="true">',
    '        <span class="join-wire"></span>',
    '        <span class="join-lantern join-lantern-paper"></span>',
    '        <span class="join-lantern join-lantern-sea"></span>',
    '        <span class="join-lantern join-lantern-coral"></span>',
    '        <span class="join-lantern join-lantern-ink"></span>',
    '        <picture>',
    '          <source type="image/webp" srcset="assets/can/mai-1x.webp 1x, assets/can/mai-2x.webp 2x" />',
    '          <img class="join-can" src="assets/can/mai-1x.png" srcset="assets/can/mai-1x.png 1x, assets/can/mai-2x.png 2x" alt="" width="257" height="702" />',
    '        </picture>',
    '      </div>',
    '      <div class="join-shade" aria-hidden="true"></div>',
    '      <div class="join-copy">',
    '        <h2 id="join-title" class="join-headline">Join the<br />first drop</h2>',
    '        <p class="join-dek">Denver first.</p>',
    '        <div data-join-intro>',
    '          <button type="button" class="join-submit" data-join-reveal>Join the first drop</button>',
    '        </div>',
    '        <div data-mai-form-wrap>',
    '          <form class="join-form" data-mai-form="waitlist" method="POST" hidden>',
    '            <input type="hidden" name="_subject" value="Mai first drop waitlist" />',
    '            <input type="hidden" name="_captcha" value="false" />',
    '            <input type="hidden" name="_template" value="table" />',
    '            <input type="hidden" name="_next" value="https://drinkmai.com/?joined=1" />',
    '            <div class="hp" aria-hidden="true">',
    '              <label for="hp-join">Leave blank</label>',
    '              <input id="hp-join" type="text" name="_honey" tabindex="-1" autocomplete="off" />',
    '            </div>',
    '            <input type="hidden" name="form" value="First drop waitlist" />',
    '            <input type="hidden" name="page" value="Home" />',
    '            <label class="join-field"><span>Email</span>',
    '              <input id="email-join" name="email" type="email" autocomplete="email" inputmode="email" required />',
    '            </label>',
    '            <button type="button" class="join-more" data-join-more aria-expanded="false">More (optional)</button>',
    '            <div class="join-more-panel" data-join-more-panel hidden>',
    '              <label class="join-field"><span>City</span>',
    '                <select id="city-join" name="city">',
    '                  <option value="Denver" selected>Denver</option>',
    '                  <option value="Portland">Portland</option>',
    '                  <option value="San Francisco">San Francisco</option>',
    '                  <option value="Los Angeles">Los Angeles</option>',
    '                  <option value="Seattle">Seattle</option>',
    '                  <option value="New York">New York</option>',
    '                  <option value="Other">Other</option>',
    '                </select>',
    '              </label>',
    '              <div class="join-field">',
    '                <span id="interest-label">Interest</span>',
    '                <div class="join-chips" role="radiogroup" aria-labelledby="interest-label">',
    '                  <label class="join-chip"><input type="radio" name="interest" value="Drinker" />Drinker</label>',
    '                  <label class="join-chip"><input type="radio" name="interest" value="Café" />Café</label>',
    '                  <label class="join-chip"><input type="radio" name="interest" value="Retail shop" />Retail shop</label>',
    '                </div>',
    '              </div>',
    '              <label class="join-check"><input type="checkbox" data-cafe-toggle /> I’m a café / shop</label>',
    '              <div class="join-cafe" data-cafe-fields hidden>',
    '                <label class="join-field"><span>Venue</span>',
    '                  <input id="venue-join" name="venue" type="text" autocomplete="organization" disabled />',
    '                </label>',
    '                <label class="join-field"><span>Note</span>',
    '                  <textarea id="note-join" name="note" rows="2" disabled></textarea>',
    '                </label>',
    '              </div>',
    '            </div>',
    '            <button class="join-submit" type="submit" data-join-submit>Join the first drop</button>',
    '          </form>',
    '          <div class="join-thanks" data-mai-success data-success="waitlist" hidden role="status">',
    '            <p>You’re on the list. We’ll email you when the first drop is ready.</p>',
    '            <p><a href="https://www.instagram.com/drink.maimatcha/">Follow along @drink.maimatcha</a></p>',
    '          </div>',
    '          <div class="join-thanks" data-mai-success data-success="cafe" hidden role="status">',
    '            <p>Got it. We’ll write when we’re ready to talk about stocking Mai.</p>',
    '          </div>',
    '          <p class="form-error" data-mai-error hidden role="alert"></p>',
    '        </div>',
    '        <p class="join-privacy">We use your information in accordance with our <a href="privacy.html">privacy policy</a>.</p>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</dialog>'
  ].join(""));
  }

  var dialog = document.getElementById("join-modal");
  if (!dialog) return;
  var card = dialog.querySelector("[data-join-card]");
  var headline = document.getElementById("join-title");
  var intro = dialog.querySelector("[data-join-intro]");
  var form = dialog.querySelector("form[data-mai-form]");
  var wrap = dialog.querySelector("[data-mai-form-wrap]");
  var cafeToggle = dialog.querySelector("[data-cafe-toggle]");
  var cafeFields = dialog.querySelector("[data-cafe-fields]");
  var venue = dialog.querySelector("#venue-join");
  var note = dialog.querySelector("#note-join");
  var moreBtn = dialog.querySelector("[data-join-more]");
  var morePanel = dialog.querySelector("[data-join-more-panel]");
  var subject = form.querySelector('input[name="_subject"]');
  var formKind = form.querySelector('input[name="form"]');
  var pageInput = form.querySelector('input[name="page"]');
  var submitBtn = dialog.querySelector("[data-join-submit]");
  var revealBtn = dialog.querySelector("[data-join-reveal]");
  var lastFocus = null;
  var autoDone = false;

  pageInput.value = pageName();
  form.action = MAI_FORM_ENDPOINT;

  function setNext() {
    var next = form.querySelector('input[name="_next"]');
    if (!next) return;
    var url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    url.searchParams.set("joined", cafeToggle.checked ? "cafe" : "1");
    next.value = url.toString();
  }

  function setMore(open) {
    if (morePanel) morePanel.hidden = !open;
    if (moreBtn) moreBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function currentInterest() {
    var checked = form.querySelector('input[name="interest"]:checked');
    return checked ? checked.value : "";
  }

  function syncCafe() {
    var on = cafeToggle.checked;
    cafeFields.hidden = !on;
    venue.disabled = !on;
    note.disabled = !on;
    venue.required = on;
    subject.value = on ? "Mai café / retail inquiry" : "Mai first drop waitlist";
    formKind.value = on ? "Café / retail" : "First drop waitlist";
    form.setAttribute("data-mai-form", on ? "cafe" : "waitlist");
    submitBtn.textContent = on ? "Tell us you’re interested" : "Join the first drop";
    if (on && !currentInterest()) {
      var cafeChip = form.querySelector('input[name="interest"][value="Café"]');
      if (cafeChip) cafeChip.checked = true;
    }
    setNext();
  }

  function showSuccess(kind) {
    intro.hidden = true;
    form.hidden = true;
    headline.hidden = false;
    headline.textContent = kind === "cafe" ? "We’ll be in touch." : "You’re on the list.";
    wrap.querySelectorAll("[data-mai-success]").forEach(function (node) {
      node.hidden = node.getAttribute("data-success") !== kind;
    });
    var error = wrap.querySelector("[data-mai-error]");
    if (error) error.hidden = true;
    storageSet(STORAGE, kind);
    storageSet(DISMISS, "1");
    card.classList.add("is-form", "is-thanks");
  }

  function showIntro() {
    headline.hidden = false;
    headline.innerHTML = "Join the<br />first drop";
    intro.hidden = false;
    form.hidden = true;
    wrap.querySelectorAll("[data-mai-success]").forEach(function (node) { node.hidden = true; });
    card.classList.remove("is-form", "is-thanks");
    cafeToggle.checked = false;
    setMore(false);
    syncCafe();
  }

  function showForm(cafe) {
    headline.hidden = false;
    headline.innerHTML = cafe ? "Pouring in<br />Denver first." : "Join the<br />first drop";
    intro.hidden = true;
    form.hidden = false;
    wrap.querySelectorAll("[data-mai-success]").forEach(function (node) { node.hidden = true; });
    card.classList.add("is-form");
    card.classList.remove("is-thanks");
    cafeToggle.checked = !!cafe;
    setMore(!!cafe);
    syncCafe();
  }

  function openJoin(mode) {
    if (!dialog) return;
    lastFocus = document.activeElement;
    autoDone = true;
    if (mode === "success-cafe" || (mode === "cafe" && cafeJoined())) {
      showSuccess("cafe");
    } else if (mode === "success" || ((mode === "intro" || mode === "form") && alreadyJoined())) {
      showSuccess("waitlist");
    } else if (mode === "cafe") {
      showForm(true);
    } else if (mode === "form") {
      showForm(false);
    } else {
      showIntro();
    }
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.body.classList.add("modal-open");
    hideSticky();
    window.setTimeout(function () {
      var target = null;
      if (!form.hidden) target = dialog.querySelector("#email-join");
      else if (!intro.hidden) target = revealBtn;
      else target = dialog.querySelector("[data-join-close]");
      if (target) target.focus();
    }, 0);
  }

  function closeJoin() {
    if (dialog.open && typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  dialog.addEventListener("close", function () {
    storageSet(DISMISS, "1");
    document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    refreshSticky();
  });

  function focusables() {
    var nodes = dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])");
    return Array.prototype.filter.call(nodes, function (el) {
      if (el.tabIndex < 0) return false;
      if (el.closest("[hidden]")) return false;
      var style = window.getComputedStyle(el);
      return style.visibility !== "hidden" && style.display !== "none";
    });
  }

  dialog.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || !dialog.open) return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    var active = document.activeElement;
    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeJoin();
  });

  dialog.querySelector("[data-join-close]").addEventListener("click", closeJoin);

  revealBtn.addEventListener("click", function () {
    showForm(false);
    var email = dialog.querySelector("#email-join");
    if (email) email.focus();
  });

  cafeToggle.addEventListener("change", syncCafe);

  document.querySelectorAll("[data-join-open]").forEach(function (btn) {
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-controls", "join-modal");
    btn.addEventListener("click", function () {
      var straight = document.body.hasAttribute("data-join-straight") || btn.hasAttribute("data-join-email");
      openJoin(btn.hasAttribute("data-join-cafe") ? "cafe" : straight ? "form" : "intro");
    });
  });

  async function postForm(target) {
    var honey = target.querySelector('input[name="_honey"]');
    if (honey && honey.value) return { ok: true, bot: true };

    var ajax = formAjaxEndpoint(MAI_FORM_ENDPOINT);
    if (!ajax) throw new Error("No ajax endpoint");

    var body = new FormData(target);
    var ctrl = new AbortController();
    var timer = window.setTimeout(function () { ctrl.abort(); }, 6000);
    var res = await fetch(ajax, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: body,
      signal: ctrl.signal
    });
    window.clearTimeout(timer);

    var type = res.headers.get("content-type") || "";
    if (!type.includes("json")) throw new Error("Not JSON");

    var payload = null;
    try { payload = await res.json(); } catch (err) { payload = null; }

    if (!res.ok) {
      var msg = payload && (payload.message || payload.error);
      throw new Error(msg || "Request failed");
    }
    return payload || { ok: true };
  }

  setNext();
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    syncCafe();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    var error = wrap.querySelector("[data-mai-error]");
    if (error) error.hidden = true;

    var kind = cafeToggle.checked ? "cafe" : "waitlist";
    postForm(form)
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
        showSuccess(kind);
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
        HTMLFormElement.prototype.submit.call(form);
      });
  });

  if (params.get("joined") === "cafe") {
    openJoin("success-cafe");
  } else if (params.get("joined") === "1" || params.get("joined") === "true") {
    openJoin("success");
  } else if (location.hash === "#waitlist") {
    openJoin(alreadyJoined() ? "success" : (document.body.hasAttribute("data-join-straight") ? "form" : "intro"));
  } else if (dialog.open) {
    autoDone = true;
    if (dialog.getAttribute("data-join-mode") === "cafe") showForm(true);
    else if (dialog.getAttribute("data-join-mode") === "form") showForm(false);
    else if (!form.hidden) {
      card.classList.add("is-form");
      syncCafe();
    }
    if (!form.hidden) {
      var emailOpen = dialog.querySelector("#email-join");
      if (emailOpen) emailOpen.focus();
    }
  } else if (!dismissed() && !location.hash) {
    var timer = window.setTimeout(tryAuto, 8000);
    function tryAuto() {
      if (autoDone || dismissed() || dialog.open) return;
      autoDone = true;
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      openJoin(document.body.hasAttribute("data-join-straight") ? "form" : "intro");
    }
    function onScroll() {
      if (autoDone || dismissed() || dialog.open) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 48 && window.scrollY / max >= 0.5) tryAuto();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.querySelectorAll("[data-share]").forEach(function (row) {
    var copyBtn = row.querySelector("[data-share-copy]");
    var nativeBtn = row.querySelector("[data-share-native]");

    if (nativeBtn && typeof navigator.share === "function") {
      nativeBtn.hidden = false;
      nativeBtn.addEventListener("click", function () {
        navigator.share({ title: "Mai", text: SHARE_TEXT, url: SHARE_URL }).catch(function () { /* cancel */ });
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyBtn.textContent = "Link copied";
        window.setTimeout(function () { copyBtn.textContent = "Copy link"; }, 1800);

        var ta = document.createElement("textarea");
        ta.value = SHARE_URL;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, SHARE_URL.length);
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        document.body.removeChild(ta);
        if (!ok && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(SHARE_URL).catch(function () { /* ignore */ });
        }
      });
    }
  });

  var sticky = document.querySelector("[data-sticky-cta]");
  var inlineCtas = document.querySelectorAll("[data-inline-cta]");

  function hideSticky() {
    if (!sticky) return;
    sticky.hidden = true;
    document.body.classList.remove("has-sticky");
  }

  function revealSticky() {
    if (!sticky) return;
    if (dialog.open || alreadyJoined()) {
      hideSticky();
      return;
    }
    if (window.matchMedia("(max-width: 859px)").matches) {
      sticky.hidden = false;
      document.body.classList.add("has-sticky");
    } else {
      hideSticky();
    }
  }

  function refreshSticky() {
    if (!sticky) return;
    if (dialog.open || alreadyJoined()) hideSticky();
  }

  if (sticky) {
    if (inlineCtas.length && "IntersectionObserver" in window) {
      var visibleCtas = new Set();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visibleCtas.add(entry.target);
          else visibleCtas.delete(entry.target);
        });
        if (visibleCtas.size || alreadyJoined() || dialog.open) hideSticky();
        else revealSticky();
      }, { threshold: 0.2 });
      inlineCtas.forEach(function (el) { io.observe(el); });
    } else if (!alreadyJoined()) {
      revealSticky();
    }

    window.addEventListener("resize", function () {
      if (!window.matchMedia("(max-width: 859px)").matches || dialog.open) hideSticky();
    });
  }

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel-track");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
    var dotsWrap = root.querySelector("[data-carousel-dots]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    if (!track || slides.length < 2) return;

    var index = 0;
    var startX = 0;
    var deltaX = 0;
    var dragging = false;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show image " + (i + 1));
      dot.addEventListener("click", function () { go(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.querySelectorAll(".carousel-dot")) : [];

    function go(n) {
      index = (n + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        if (i === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); });
    if (next) next.addEventListener("click", function () { go(index + 1); });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === "ArrowRight") go(index + 1);
    });

    function onStart(x) {
      dragging = true;
      startX = x;
      deltaX = 0;
    }

    function onMove(x) {
      if (!dragging) return;
      deltaX = x - startX;
    }

    function onEnd() {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(deltaX) > 40) go(index + (deltaX < 0 ? 1 : -1));
      deltaX = 0;
    }

    track.addEventListener("touchstart", function (event) {
      onStart(event.changedTouches[0].clientX);
    }, { passive: true });
    track.addEventListener("touchmove", function (event) {
      onMove(event.changedTouches[0].clientX);
    }, { passive: true });
    track.addEventListener("touchend", onEnd);

    go(0);
  });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
