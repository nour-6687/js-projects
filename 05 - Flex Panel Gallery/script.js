const eachPanel = document.querySelectorAll(".panel");

function togglePanel() {
  this.classList.toggle("open");
}

function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    // OLD (buggy):
    // The issue! When you double-click, it triggers the open class twice, which toggles it on then off, but open-active only toggles once (because the transition only fires once), causing them to get out of sync.
    // this.classList.toggle("open-active");

    // NEW (fixed):
    // Instead of toggling open-active, we should add it when opening and remove it when closing.
    // Now open-active depends on open being present, so they always stay in sync!
    if (this.classList.contains("open")) {
      this.classList.add("open-active");
    } else {
      this.classList.remove("open-active");
    }
  }
}

eachPanel.forEach((panel) => {
  panel.addEventListener("click", togglePanel);
  panel.addEventListener("transitionend", toggleActive);
});
