(function () {
  const form = document.querySelector("[data-waitlist-form]");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = form.querySelector('input[type="email"]');
    if (!email || !email.checkValidity()) {
      if (email) email.reportValidity();
      return;
    }

    form.hidden = true;
    const note = document.querySelector("[data-waitlist-note]");
    if (note) {
      note.classList.add("form-success");
      note.textContent = "You're on the list. We'll write when the first drop is ready.";
    }
  });
})();
