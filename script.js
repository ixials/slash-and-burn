horizontalContainer = document.querySelector(".container");

horizontalContainer.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    if (
      (event.deltaY > 0 && event.deltaX < event.deltaY) ||
      (event.deltaY < 0 && event.deltaX > event.deltaY)
    ) {
      horizontalContainer.scrollLeft += event.deltaY;
    }
  },
  { passive: false },
);

const poems = document.querySelectorAll(".poem");

poems.forEach((poem) => {
  let blurTimeout;
  const text = poem.querySelector(".poem-text");
  text.addEventListener("mouseenter", () => {
    clearTimeout(blurTimeout);
    blurTimeout = setTimeout(() => {
      text.classList.add("revealed");
    }, 500);
  });
  text.addEventListener("mouseleave", () => {
    clearTimeout(blurTimeout);
    blurTimeout = setTimeout(() => {
      text.classList.remove("revealed");
    }, 500);
  });
});
