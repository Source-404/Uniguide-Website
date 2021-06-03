const btnSCrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// show me more
btnSCrollTo.addEventListener("click", (e) => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

// delegation nav-scroll
document.querySelector(".main-nav").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-links")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Reveal sections

const allSections = document.querySelectorAll(".sections");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});
