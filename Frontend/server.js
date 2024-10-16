let lastScroll = window.scrollY;
const navbar = document.getElementById("nav");
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    navbar.classList.add("hiddenNav");
  } else {
    navbar.classList.remove("hiddenNav");
  }

  lastScroll = currentScroll;
});
