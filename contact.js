document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("✅ Your message has been sent! Thank you.");
    form.reset();
  });
});
