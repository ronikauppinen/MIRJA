document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click",function(e){
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        })
    })
    link.addEventListener("click", function(e){
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        })
    })
})

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".overlay");

function openMenu() {
  navLinks.classList.add("active");
  hamburger.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");

  hamburger.setAttribute("aria-expanded", "true");

  const firstLink = navLinks.querySelector("a");
  if (firstLink) {
    firstLink.focus();
  }
}

function closeMenu() {
  navLinks.classList.remove("active");
  hamburger.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");

  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.contains("active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
    hamburger.focus();
  }
});

const navbar = document.querySelector(".navbar");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});
const form = document.querySelector(".contact-form");
const status = document.querySelector("#form-status");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    submitButton.disabled = true;

    status.hidden = false;
    status.textContent = "Lähetetään viestiä...";
    status.className = "form-sending";

    try {
        const response = await fetch("https://ronik.life/api/contact.php", {
            method: "POST",
            body: new FormData(form)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Viestin lähettäminen epäonnistui.");
        }

        // Empty the form
        form.reset();

        // Show confirmation
        status.hidden = false;
        status.textContent = "Kiitos viestistäsi! Viestisi on lähetetty onnistuneesti.";
        status.className = "form-success";

    } catch (error) {
        console.error("Contact form error:", error);

        status.hidden = false;
        status.textContent = "Viestin lähettäminen epäonnistui. Yritä myöhemmin uudelleen.";
        status.className = "form-error";

    } finally {
        submitButton.disabled = false;
    }
});