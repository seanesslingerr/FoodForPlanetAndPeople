const sections = [...document.querySelectorAll(".protein-section")];
const progressButtons = [...document.querySelectorAll(".progress-track button")];
const PROTEINS = ["Beef", "Cheese", "Pork", "Chicken", "Eggs", "Tofu", "Peas", "Nuts"];
const saved = JSON.parse(localStorage.getItem("proteinProfile") || "{}");
const weight = Number.isFinite(saved.weight) ? saved.weight : 0.5;
const savedChoices = Object.fromEntries(Object.entries(saved.choices || {}).map(([name, choice]) => [
  name, choice === "no" ? "already" : choice
]));
const profile = {
  planetScore: Number.isFinite(saved.planetScore) ? saved.planetScore : Math.round((1-weight)*100),
  choices: savedChoices
};
const choiceDeltas = {yes:5, already:0, no:-5};

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

function saveProfile() {
  localStorage.setItem("proteinProfile", JSON.stringify({
    weight, planetScore:profile.planetScore, choices:profile.choices, completed:true
  }));
}

function renderReview() {
  const planetScore = Math.round(profile.planetScore);
  document.getElementById("planet-score").textContent = `${planetScore}%`;
  document.getElementById("protein-score").textContent = `${100 - planetScore}%`;
  document.querySelectorAll(".choice-status").forEach(status => {
    status.textContent = scoreSummary();
  });
  document.getElementById("review-list").innerHTML = PROTEINS
    .filter(protein => profile.choices[protein])
    .map(protein => {
      const choice = profile.choices[protein];
      const label = choice === "yes" ? "Yes, I would" :
        choice === "already" ? "I already do" : "No";
      return `<li><b>${protein}</b><span>${label}</span></li>`;
    })
    .join("") || "<li><span>No changes selected yet.</span></li>";
}

function scoreSummary() {
  const planetScore = Math.round(profile.planetScore);
  return `Protein score: ${100 - planetScore}% · Planet score: ${planetScore}%.`;
}

document.querySelectorAll(".choice").forEach(choice => {
  const section = choice.closest(".protein-section");
  const name = section.dataset.protein;
  choice.querySelectorAll("[data-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const previous = profile.choices[name];
      profile.choices[name] = button.dataset.choice;
      const delta = choiceDeltas[button.dataset.choice] - (choiceDeltas[previous] || 0);
      profile.planetScore = Math.max(0, Math.min(100, profile.planetScore + delta));
      choice.querySelectorAll("[data-choice]").forEach(item => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      saveProfile();
      renderReview();
    });
  });
  const savedChoice = profile.choices[name];
  if (savedChoice) {
    choice.querySelector(`[data-choice="${savedChoice}"]`).setAttribute("aria-pressed", "true");
  }
});

renderReview();
