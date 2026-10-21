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

  function formAjaxEndpoint(endpoint) {
    var marker = "://formsubmit.co/";
    var at = endpoint.indexOf(marker);
    if (at === -1) return null;
    if (endpoint.indexOf("://formsubmit.co/ajax/") !== -1) return endpoint;
    return endpoint.slice(0, at) + marker + "ajax/" + endpoint.slice(at + marker.length);
  }

  var params = new URLSearchParams(window.location.search);

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
    var form = wrap.querySelector("form");
    var success = wrap.querySelector("[data-mai-success]");
    var captions = wrap.querySelectorAll("[data-mai-caption]");
    var error = wrap.querySelector("[data-mai-error]");
    if (form) form.hidden = true;
    captions.forEach(function (caption) { caption.hidden = true; });
    if (error) error.hidden = true;
    if (success) success.hidden = false;
    if (kind) storageSet(kind);
  }

  function setNext(form) {
    var next = form.querySelector('input[name="_next"]');
    if (!next) return;
    var url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    var kind = form.getAttribute("data-mai-form") === "cafe" ? "cafe" : "1";
    url.searchParams.set("joined", kind);
    next.value = url.toString();
  }

  async function postForm(form) {
    var honey = form.querySelector('input[name="_honey"]');
    if (honey && honey.value) return { ok: true, bot: true };

    var ajax = formAjaxEndpoint(MAI_FORM_ENDPOINT);
    if (!ajax) throw new Error("No ajax endpoint");

    var body = new FormData(form);
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

  document.querySelectorAll("form[data-mai-form]").forEach(function (form) {
    form.action = MAI_FORM_ENDPOINT;
    setNext(form);
    var wrap = form.closest("[data-mai-form-wrap]") || form.parentElement;
    var kind = form.getAttribute("data-mai-form") === "cafe" ? "cafe" : "waitlist";

    if (kind === "waitlist" && alreadyJoined()) showSuccess(wrap, "waitlist");
    if (kind === "cafe" && cafeJoined()) showSuccess(wrap, "cafe");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      var original = button ? button.textContent : "";
      if (button) {
        button.disabled = true;
        button.textContent = "Sending…";
      }

      var error = wrap.querySelector("[data-mai-error]");
      if (error) error.hidden = true;

      postForm(form)
        .then(function () {
          showSuccess(wrap, kind);
        })
        .catch(function () {
          if (button) {
            button.disabled = false;
            button.textContent = original;
          }
          HTMLFormElement.prototype.submit.call(form);
        });
    });
  });

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
  var formWraps = document.querySelectorAll("[data-mai-form-wrap]");

  function hideSticky() {
    if (!sticky) return;
    sticky.hidden = true;
    document.body.classList.remove("has-sticky");
  }

  function revealSticky() {
    if (!sticky) return;
    if (window.matchMedia("(max-width: 859px)").matches) {
      sticky.hidden = false;
      document.body.classList.add("has-sticky");
    } else {
      hideSticky();
    }
  }

  if (sticky) {
    if (formWraps.length && "IntersectionObserver" in window) {
      var visibleForms = new Set();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visibleForms.add(entry.target);
          else visibleForms.delete(entry.target);
        });
        if (visibleForms.size || alreadyJoined()) hideSticky();
        else revealSticky();
      }, { threshold: 0.2 });
      formWraps.forEach(function (wrap) { io.observe(wrap); });
    } else {
      revealSticky();
    }

    window.addEventListener("resize", function () {
      if (!window.matchMedia("(max-width: 859px)").matches) hideSticky();
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
})();
