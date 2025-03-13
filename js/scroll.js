document.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const sections = document.querySelectorAll("section");
    let currentSectionIndex = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        currentSectionIndex = index;
      }
    });

    let nextSectionIndex;
    if (delta > 0) {
      nextSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    } else {
      nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
    }

    sections[nextSectionIndex].scrollIntoView({ behavior: "smooth" });
  },
  { passive: false }
);
