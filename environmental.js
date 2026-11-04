const progressButtons = [...document.querySelectorAll(".environmental-progress button")];
const sections = [...document.querySelectorAll(".environment-section")];

const setCurrent = id => progressButtons.forEach(button => {
  button.setAttribute("aria-current", String(button.dataset.target === id));
});

progressButtons.forEach(button => button.addEventListener("click", () => {
  document.getElementById(button.dataset.target).scrollIntoView({behavior:"smooth"});
}));

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setCurrent(visible.target.id);
}, {rootMargin:"-25% 0px -55% 0px", threshold:[0.1, 0.5, 0.9]});

sections.forEach(section => observer.observe(section));

function updateFromScroll() {
  const marker = window.scrollY + window.innerHeight * 0.35;
  const current = sections.reduce((selected, section) =>
    section.offsetTop <= marker ? section : selected, sections[0]);
  setCurrent(current.id);
}

window.addEventListener("scroll", updateFromScroll, {passive:true});
window.addEventListener("resize", updateFromScroll);
updateFromScroll();
