const sections = [...document.querySelectorAll(".protein-section")];
const progressButtons = [...document.querySelectorAll(".progress-track button")];

function setCurrent(id) {
  progressButtons.forEach(button => {
    button.setAttribute("aria-current", String(button.dataset.target === id));
  });
}

progressButtons.forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.target).scrollIntoView({ behavior: "smooth" });
  });
});

const observer = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setCurrent(visible.target.id);
}, { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.5, 0.9] });

sections.forEach(section => observer.observe(section));
setCurrent(sections[0].id);
