/* ===============================
SMOOTH SCROLL NAVIGATION
=============================== */

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* ===============================
NAVBAR ACTIVE LINK ON SCROLL
=============================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});


/* ===============================
FADE IN ANIMATION ON SCROLL
=============================== */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(60px)";
  section.style.transition = "all 0.8s ease";
  observer.observe(section);
});


/* ===============================
CONTACT FORM SUBMIT (LOADER + SUCCESS)
=============================== */

const form = document.getElementById("contactForm");
const loader = document.getElementById("loader");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // show loader
    if (loader) loader.style.display = "block";
    if (successMsg) successMsg.style.display = "none";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {

      /* ============================
         OPTION 1 → BACKEND FETCH
         (Apps Script / Server)
         Uncomment if using backend
      ============================ */

      /*
      const formData = new FormData(form);

      await fetch("YOUR_WEB_APP_URL", {
        method: "POST",
        body: formData
      });
      */


      /* ============================
         OPTION 2 → MAILTO (no backend)
      ============================ */

      let subject = "Portfolio Contact from " + name;

      let body =
        "Name: " + name + "%0D%0A" +
        "Email: " + email + "%0D%0A%0D%0A" +
        "Message: " + message;

      window.location.href =
        "mailto:tanushreepardhi93@gmail.com?subject=" +
        subject + "&body=" + body;

      // fake delay for loader UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      // success message
      if (loader) loader.style.display = "none";
      if (successMsg) {
        successMsg.style.display = "block";
        successMsg.style.opacity = "1";
      }

      form.reset();

    } catch (err) {
      alert("Something went wrong!");
      if (loader) loader.style.display = "none";
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}


/* ===============================
SUCCESS MESSAGE AUTO HIDE
=============================== */

if (successMsg) {
  setInterval(() => {
    if (successMsg.style.display === "block") {
      successMsg.style.opacity = "0";
      setTimeout(() => successMsg.style.display = "none", 500);
    }
  }, 4000);
}


/* ===============================
BUTTON RIPPLE EFFECT (FIXED)
=============================== */

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function (e) {

    const ripple = document.createElement("span");

    const rect = this.getBoundingClientRect();

    ripple.style.position = "absolute";
    ripple.style.left = (e.clientX - rect.left - 50) + "px";
    ripple.style.top = (e.clientY - rect.top - 50) + "px";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.4)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";

    this.style.position = "relative";
    this.style.overflow = "hidden";

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});


/* ===============================
PAGE LOADER AUTO HIDE (OPTIONAL)
=============================== */

window.addEventListener("load", () => {
  const pageLoader = document.getElementById("pageLoader");
  if (pageLoader) pageLoader.style.display = "none";
});


/* ===============================
TYPING EFFECT
=============================== */

const typingText = "Welcome to My Portfolio";
let i = 0;

function typeEffect() {
  const el = document.getElementById("typing");
  if (!el) return;

  if (i < typingText.length) {
    el.innerHTML += typingText.charAt(i);
    i++;
    setTimeout(typeEffect, 70);
  }
}

typeEffect();
