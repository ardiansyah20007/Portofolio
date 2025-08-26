// Theme toggle with persistence
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "🌞";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
}

const saved = localStorage.getItem("theme");
if (saved) applyTheme(saved);

themeToggle.addEventListener("click", () => {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// Copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll + staggered cards
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stagger project cards
        if (entry.target.classList.contains("projects")) {
          const cards = entry.target.querySelectorAll(".project-card");
          cards.forEach((card, i) => {
            const delay = i * 120;
            card.style.transitionDelay = delay + "ms";
            setTimeout(() => card.classList.add("visible"), delay);
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Hover tilt effect
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 3}deg) rotateY(${
      x * 4
    }deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});