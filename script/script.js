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

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector("#name_for_form").value;
    const email = document.querySelector("#email_for_form").value;
    const message = document.querySelector("#message_for_form").value;

    fetch("https://ronik.life/api/contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});