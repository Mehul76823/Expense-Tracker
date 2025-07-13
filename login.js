document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // 🔐 Demo validation: replace with real authentication later
    const demoUser = {
      email: "user@example.com",
      password: "password123"
    };

    if (email === demoUser.email && password === demoUser.password) {
      alert("✅ Login successful! Redirecting...");
      // Simulate redirect (e.g., to dashboard)
      window.location.href = "index.html";
    } else {
      alert("❌ Invalid email or password. Please try again.");
    }
  });
});

