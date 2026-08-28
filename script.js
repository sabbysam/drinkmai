(function () {
  const SHARE_URL = "https://drinkmai.com";
  const SHARE_TEXT = "Calm energy. No chaos. Mai is lightly sparkling matcha — join the first drop.";
  const ENDPOINT = "https://formsubmit.co/ajax/sbwinston@gmail.com";
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
    const caption = wrap.querySelector("[data-mai-caption]");
    const error = wrap.querySelector("[data-mai-error]");
    if (form) form.hidden = true;
    if (caption) caption.hidden = true;
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
    if (waitlist && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        const onScreen = entries.some(function (entry) { return entry.isIntersecting; });
        if (onScreen || alreadyJoined()) hideSticky();
        else revealSticky();
      }, { threshold: 0.18 });
      io.observe(waitlist);
    } else if (!waitlist) {
      revealSticky();
    }

    window.addEventListener("resize", function () {
      if (!window.matchMedia("(max-width: 719px)").matches) hideSticky();
    });
  }
})();
