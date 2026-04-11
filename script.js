// ======== MUSIC ========

const music = document.getElementById("bg-music");

document.querySelectorAll(".interactive-text").forEach((element) => {
  element.addEventListener("click", () => {
    music.play();
  });
});

// ======== HORIZONTAL SCROLL ========

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

// ======== POEMS ========

const poems = document.querySelectorAll(".poem");
const isHoverDevice = window.matchMedia("(hover: hover)").matches;

poems.forEach((poem) => {
  let blurTimeout;
  const text = poem.querySelector(".poem-text");
  const content = poem.querySelectorAll(".interactive-content");

  if (isHoverDevice) {
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
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            text.classList.add("revealed");
          } else {
            text.classList.remove("revealed");

            content.forEach((item) => {
              item.classList.remove("visible");
            });
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(poem);
  }
});

document.getElementById("jinzhi").addEventListener("click", function () {
  const section = document.getElementById("jinzhi-content");
  section.classList.toggle("visible");
});

document.getElementById("jia").addEventListener("click", function () {
  const section = document.getElementById("jia-content");
  section.classList.toggle("visible");
});

document.getElementById("beach").addEventListener("click", function () {
  const section = document.getElementById("beach-content");
  section.classList.toggle("visible");
});

document.getElementById("blue-waves").addEventListener("click", function () {
  const section = document.getElementById("blue-waves-content");
  section.classList.toggle("visible");
});

document.getElementById("sea").addEventListener("click", function () {
  const section = document.getElementById("sea-content");
  section.classList.toggle("visible");
});

document.getElementById("momentum").addEventListener("click", function () {
  const section = document.getElementById("momentum-content");
  section.classList.toggle("visible");
});

document.getElementById("puerto-reyes").addEventListener("click", function () {
  const section = document.getElementById("puerto-reyes-content");
  section.classList.toggle("visible");
});

document.getElementById("point-blank").addEventListener("click", function () {
  const section = document.getElementById("point-blank-content");
  section.classList.toggle("visible");
});
