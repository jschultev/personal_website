document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const slider = toggle.querySelector(".toggle-slider");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "dark";
 
  root.setAttribute("data-theme", savedTheme);
 
  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
});