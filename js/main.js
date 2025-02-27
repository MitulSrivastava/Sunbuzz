// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Navbar Scroll Behavior
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-shrink");
    } else {
      navbar.classList.remove("navbar-shrink");
    }
  });

  // Theme Toggle Functionality
  const lightModeIcon = document.getElementById("light-mode");
  const darkModeIcon = document.getElementById("dark-mode");
  const body = document.body;

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
  }

  // Toggle light/dark theme
  lightModeIcon.addEventListener("click", function () {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  });

  darkModeIcon.addEventListener("click", function () {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  });

  // Handle testimonial slider (if you add more testimonials later)
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  if (testimonialItems.length > 1) {
    // Basic slider functionality could be added here
    // For a more robust solution, consider using a library like Swiper.js
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Initialize AOS again after any dynamic content loads
  document.addEventListener("lazyloaded", function () {
    AOS.refresh();
  });

  // Remove the testimonial dots and slide controls
  const testimonialTrack = document.querySelector(".testimonial-track");

  // Clone first two testimonials and append to end for seamless loop
  const firstTwo = testimonialTrack.querySelectorAll(
    ".testimonial-item:nth-child(-n+2)"
  );
  firstTwo.forEach((item) => {
    const clone = item.cloneNode(true);
    testimonialTrack.appendChild(clone);
  });
});

function openProjectModal(projectData) {
  const modal = document.getElementById("projectModal");

  // Add stats data to the projectData object when calling openProjectModal
  modal.querySelector(".project-stats").innerHTML = `
    <div class="stat-item">
      <h3>LEADS</h3>
      <span class="stat-number">${projectData.stats?.leads || "150+"}</span>
      <p class="stat-label">Generated Monthly</p>
    </div>
    <div class="stat-item">
      <h3>CLIENTS</h3>
      <span class="stat-number">${projectData.stats?.clients || "45+"}</span>
      <p class="stat-label">Closed Deals</p>
    </div>
    <div class="stat-item">
      <h3>SALES</h3>
      <span class="stat-number">${projectData.stats?.sales || "180%"}</span>
      <p class="stat-label">Revenue Growth</p>
    </div>
  `;

  // Update modal content with project data
  modal.querySelector(".project-description").textContent =
    projectData.description;
  modal.querySelector(".project-contribution").textContent =
    projectData.contribution;
  modal.querySelector(".client-name").textContent = projectData.client;
  modal.querySelector(".project-category").textContent = projectData.category;
  modal.querySelector(".project-date").textContent = projectData.date;

  // Update software list
  const softwareList = modal.querySelector(".software-list");
  softwareList.innerHTML = projectData.software
    .map((sw) => `<span>${sw}</span>`)
    .join("");

  // Update view project link
  modal.querySelector(".view-project").href = projectData.projectUrl;

  // Show modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target == modal) {
    closeModal();
  }
};
