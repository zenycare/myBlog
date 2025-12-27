/* ===== REVEAL ===== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ===== SKILL BAR ===== */
const skillBars = document.querySelectorAll(".bar-fill");
let skillDone = false;

function animateSkills() {
  const skills = document.getElementById("skills");
  if (!skills) return;

  const top = skills.getBoundingClientRect().top;
  if (top < window.innerHeight - 100 && !skillDone) {
    skillBars.forEach((bar) => {
      const target = parseInt(bar.dataset.percent || "0", 10);
      // animate width
      bar.style.width = target + "%";
      bar.classList.add("play");

      // animate numeric counter inside the bar (if .percent exists)
      const percentEl = bar.closest(".bar")
        ? bar.closest(".bar").querySelector(".percent")
        : null;
      if (percentEl) {
        let current = 0;
        const duration = 1100;
        const stepTime = 30;
        const steps = Math.max(1, Math.floor(duration / stepTime));
        const step = Math.max(1, Math.floor(target / steps));
        const iv = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(iv);
          }
          percentEl.textContent = current + "%";
        }, stepTime);
      }

      // cleanup play class
      setTimeout(() => bar.classList.remove("play"), 1400);
    });
    skillDone = true;
  }
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

/* ===== LOADING SKELETON FOR BLOG ===== */
function showBlogSkeletons() {
  const blogSection = document.getElementById("blog");
  if (!blogSection) return;

  const grid = blogSection.querySelector(".grid");
  if (!grid) return;

  // create skeleton wrapper
  const skeletonWrapper = document.createElement("div");
  skeletonWrapper.className = "skeleton-grid";

  // create a couple of skeleton cards matching expected layout
  for (let i = 0; i < 2; i++) {
    const s = document.createElement("div");
    s.className = "skeleton-card";
    skeletonWrapper.appendChild(s);
  }

  // insert skeletons before the real grid and hide real posts
  grid.style.visibility = "hidden";
  grid.parentNode.insertBefore(skeletonWrapper, grid);

  // simulate loading delay then remove skeletons
  setTimeout(() => {
    skeletonWrapper.remove();
    grid.style.visibility = "";
    // reveal posts with small fade
    grid.querySelectorAll(".post-card").forEach((p, idx) => {
      p.style.opacity = 0;
      p.style.transform = "translateY(8px)";
      setTimeout(() => {
        p.style.transition = "opacity 300ms ease, transform 300ms ease";
        p.style.opacity = 1;
        p.style.transform = "";
      }, 80 * idx);
    });
  }, 700);
}

window.addEventListener("load", showBlogSkeletons);
/* ===== FILTER BLOG ===== */
function filterPosts(type, btn) {
  const cards = document.querySelectorAll(".post-link");

  cards.forEach((card) => {
    const article = card.querySelector(".post-card");

    if (type === "all" || article.classList.contains(type)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // xử lý active button
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}
