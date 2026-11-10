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
    status.textContent = "Viestiä lähetetään...";
    status.className = "form-sending";

    try {
        const response = await fetch("https://ronik.life/api/contact.php", {
            method: "POST",
            body: new FormData(form)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Something went wrong.");
        }

        status.textContent = "Kiitos! Viestisi on lähetetty.";
        status.className = "form-success";

        form.reset();

    } catch (error) {
        console.error("Contact form error:", error);

        status.textContent = "Sorry, something went wrong. Please try again later.";
        status.className = "form-error";

    } finally {
        submitButton.disabled = false;
    }
});