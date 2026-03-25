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
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const overlay = document.querySelector(".overlay")


hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

overlay.addEventListener("click", () => {
  navLinks.classList.remove("active");
  hamburger.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
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