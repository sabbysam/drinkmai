(function () {
  const SHARE_URL = "https://drinkmai.com";
  const SHARE_TEXT = "Calm energy. No chaos. Mai is lightly sparkling matcha — join the first drop.";
  const ENDPOINT = "https://formsubmit.co/ajax/hello@drinkmai.com";
  const STORAGE = "mai-joined";

  const params = new URLSearchParams(window.location.search);

  function storageGet() {
    try { return localStorage.getItem(STORAGE); } catch (err) { return null; }
  }

  function storageSet(value) {
    try { localStorage.setItem(STORAGE, value); } catch (err) { /* ignore */ }
  }

  function alreadyJoined() {
    return params.get("joined") === "1" || params.get("joined") === "true" || storageGet() === "waitlist";
  }

  function cafeJoined() {
    return params.get("joined") === "cafe" || storageGet() === "cafe";
  }

  function showSuccess(wrap, kind) {
    const form = wrap.querySelector("form");
    const success = wrap.querySelector("[data-mai-success]");
    const captions = wrap.querySelectorAll("[data-mai-caption]");
    const error = wrap.querySelector("[data-mai-error]");
    if (form) form.hidden = true;
    captions.forEach(function (caption) { caption.hidden = true; });
    if (error) error.hidden = true;
    if (success) success.hidden = false;
    if (kind) storageSet(kind);
  }

  function setNext(form) {
    const next = form.querySelector('input[name="_next"]');
    if (!next) return;
    const url = new URL(window.location.href);
    const kind = form.getAttribute("data-mai-form") === "cafe" ? "cafe" : "1";
    url.searchParams.set("joined", kind);
    url.hash = "";
    next.value = url.toString();
  }

  async function postForm(form) {
    const honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) return { ok: true, bot: true };

    const body = new FormData(form);
    const ctrl = new AbortController();
    const timer = window.setTimeout(function () { ctrl.abort(); }, 6000);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: body,
      signal: ctrl.signal
    });
    window.clearTimeout(timer);

    const type = res.headers.get("content-type") || "";
    if (!type.includes("json")) throw new Error("Not JSON");

    let payload = null;
    try { payload = await res.json(); } catch (err) { payload = null; }

    if (!res.ok) {
      const msg = payload && (payload.message || payload.error);
      throw new Error(msg || "Request failed");
    }
    return payload || { ok: true };
  }

  document.querySelectorAll("form[data-mai-form]").forEach(function (form) {
    setNext(form);
    const wrap = form.closest("[data-mai-form-wrap]") || form.parentElement;
    const kind = form.getAttribute("data-mai-form") === "cafe" ? "cafe" : "waitlist";

    if (kind === "waitlist" && alreadyJoined()) showSuccess(wrap, "waitlist");
    if (kind === "cafe" && cafeJoined()) showSuccess(wrap, "cafe");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      const original = button ? button.textContent : "";
      if (button) {
        button.disabled = true;
        button.textContent = "Joining…";
      }

      const error = wrap.querySelector("[data-mai-error]");
      if (error) error.hidden = true;

      postForm(form)
        .then(function () {
          showSuccess(wrap, kind);
        })
        .catch(function () {
          // AJAX is often Cloudflare-challenged; native POST still reaches Formsubmit.
          if (button) {
            button.disabled = false;
            button.textContent = original;
          }
          HTMLFormElement.prototype.submit.call(form);
        });
    });
  });

  const shareHtml =
    '<button type="button" class="button-ghost" data-share-copy>Copy link</button>' +
    '<button type="button" class="button-ghost" data-share-native hidden>Share</button>';

  document.querySelectorAll("[data-share]").forEach(function (row) {
    if (!row.innerHTML.trim()) row.innerHTML = shareHtml;

    const copyBtn = row.querySelector("[data-share-copy]");
    const nativeBtn = row.querySelector("[data-share-native]");

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

        const ta = document.createElement("textarea");
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

  const sticky = document.querySelector("[data-sticky-cta]");
  const waitlist = document.querySelector("#waitlist");
  const waitlistIsForm = !!(waitlist && waitlist.querySelector("form[data-mai-form]"));

  function hideSticky() {
    if (!sticky) return;
    sticky.hidden = true;
    document.body.classList.remove("has-sticky");
  }

  function revealSticky() {
    if (!sticky) return;
    if (window.matchMedia("(max-width: 719px)").matches) {
      sticky.hidden = false;
      document.body.classList.add("has-sticky");
    } else {
      hideSticky();
    }
  }

  if (sticky) {
    if (waitlistIsForm && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        const onScreen = entries.some(function (entry) { return entry.isIntersecting; });
        if (onScreen || alreadyJoined()) hideSticky();
        else revealSticky();
      }, { threshold: 0.18 });
      io.observe(waitlist);
    } else if (!waitlistIsForm) {
      revealSticky();
    }

    window.addEventListener("resize", function () {
      if (!window.matchMedia("(max-width: 719px)").matches) hideSticky();
    });
  }

  document.querySelectorAll("[data-slot-img]").forEach(function (img) {
    const slot = img.closest(".media-slot");
    if (slot) slot.classList.add("is-empty");

    function missing() {
      img.hidden = true;
      if (slot) slot.classList.add("is-empty");
    }

    function present() {
      if (!img.naturalWidth) {
        missing();
        return;
      }
      img.hidden = false;
      if (slot) slot.classList.remove("is-empty");
    }

    img.addEventListener("error", missing);
    img.addEventListener("load", present);
    if (img.complete) present();
  });

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    const track = root.querySelector(".carousel-track");
    const slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
    const dotsWrap = root.querySelector("[data-carousel-dots]");
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    if (!track || slides.length < 2) return;

    let index = 0;
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show image " + (i + 1));
      dot.addEventListener("click", function () { go(i); });
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.querySelectorAll(".carousel-dot")) : [];

    function go(n) {
      index = (n + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
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

    track.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch") return;
      onStart(event.clientX);
    });
    window.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") return;
      onMove(event.clientX);
    });
    window.addEventListener("pointerup", function (event) {
      if (event.pointerType === "touch") return;
      onEnd();
    });

    go(0);
  });
})();
