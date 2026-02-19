const title = document.getElementById("mainTitle");
// Calculate the initial distance from the top of the page to the title
const stickyTop = title.offsetTop;

window.addEventListener("scroll", () => {
    // Check if the scroll position has passed the title's original position
    if (window.scrollY >= stickyTop) {
        title.classList.add("fixed");
    } else {
        title.classList.remove("fixed");
    }
});