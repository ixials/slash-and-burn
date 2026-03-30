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
  const content = poem.querySelectorAll(".interactive-content");

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

  if (content) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            content.forEach((item) => {
              item.classList.remove("visible");
            });
          }
        });
      },
      { threshold: 0 },
    );
    observer.observe(poem);
  }
});

const music = document.getElementById("bg-music");

document.querySelectorAll(".interactive-text").forEach((element) => {
  element.addEventListener("click", () => {
    music.play();
  });
});

document.getElementById("jinzhi").addEventListener("click", function () {
  const section = document.getElementById("jinzhi-content");
  section.classList.toggle("visible");
});

document.getElementById("jia").addEventListener("click", function () {
  const section = document.getElementById("jia-content");
  section.classList.toggle("visible");
});

document.getElementById("mary").addEventListener("click", function () {
  const section = document.getElementById("mary-content");
  section.classList.toggle("visible");
});

document.getElementById("puerto-reyes").addEventListener("click", function () {
  const section = document.getElementById("puerto-reyes-content");
  section.classList.toggle("visible");
});

document.getElementById("iguazu").addEventListener("click", function () {
  const section = document.getElementById("iguazu-content");
  section.classList.toggle("visible");
});
