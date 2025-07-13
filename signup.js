// ✅ Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Sign-Up Form Submission Handling
const form = document.getElementById("signup-form");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const email = form["email"].value;
  const password = form["password"].value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      message.style.color = "green";
      message.textContent = "✅ Signup successful!";

      // Optionally redirect
      // window.location.href = "dashboard.html";

      form.reset();
    })
    .catch((error) => {
      message.style.color = "red";
      message.textContent = `❌ ${error.message}`;
    });
});
