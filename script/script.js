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
document.querySelector(".contact-form").addEventListener("submit", function(e) {
  var response = grecaptcha.getResponse();
  
  if (response.length === 0) {
    e.preventDefault();
    alert("täytä CAPTCHA");
  }
});
const messageContainer = document.getElementById("messageContainer");

    document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();
      
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };
      
      /* make sure to replace the xxxxxxx with the form id you created on fabform.io */
      
      fetch('https://fabform.io/f/zz3Ovmf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success === "true") {
          messageContainer.innerHTML = "<p style='color: green;'>Form submitted successfully!</p>";
        } else {
          throw new Error('Server response indicates failure');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        messageContainer.innerHTML = "<p style='color: red;'>An error occurred while submitting the form.</p>";
      });
    });