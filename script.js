document.addEventListener("DOMContentLoaded", () => {
  const frames = Array.from(document.querySelectorAll(".poem-frame"));
  const prevBtn = document.getElementById("prev-poem");
  const nextBtn = document.getElementById("next-poem");
  const music = document.getElementById("bg-music");

  let current = frames.findIndex((f) => f.classList.contains("active"));
  if (current === -1) current = 0;

  let zTop = 10;

  function bringToFront(popup) {
    zTop += 1;
    popup.style.zIndex = zTop;
    document
      .querySelectorAll(".popup.focused")
      .forEach((p) => p.classList.remove("focused"));
    popup.classList.add("focused");
  }

  function resetPopupPosition(popup) {
    popup.style.left = "";
    popup.style.top = "";
    popup.style.right = "";
    popup.style.bottom = "";
    popup.style.transform = "";
    popup.style.zIndex = "";
    popup.classList.remove("focused");
  }

  function makeDraggable(popup) {
    const handle = popup.querySelector(".mac-titlebar");
    if (!handle) return;

    handle.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".traffic-light.close")) return;
      bringToFront(popup);

      const frameEl = popup.offsetParent || popup.parentElement;
      const frameRect = frameEl.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      let left = popupRect.left - frameRect.left;
      let top = popupRect.top - frameRect.top;

      popup.style.left = `${left}px`;
      popup.style.top = `${top}px`;
      popup.style.right = "auto";
      popup.style.bottom = "auto";
      popup.style.transform = "none";

      const startX = e.clientX;
      const startY = e.clientY;
      const originLeft = left;
      const originTop = top;

      handle.setPointerCapture(e.pointerId);

      function onMove(ev) {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        popup.style.left = `${originLeft + dx}px`;
        popup.style.top = `${originTop + dy}px`;
      }

      function onUp(ev) {
        handle.releasePointerCapture(ev.pointerId);
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", onUp);
      }

      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", onUp);
    });

    popup.addEventListener("pointerdown", () => bringToFront(popup));
  }

  document.querySelectorAll(".popup").forEach(makeDraggable);

  function goTo(index, goingForward) {
    if (index === current) return;

    const oldFrame = frames[current];
    const newIndex = (index + frames.length) % frames.length;
    const newFrame = frames[newIndex];

    const enterClass = goingForward ? "enter-right" : "enter-left";
    const exitClass = goingForward ? "exit-left" : "exit-right";

    newFrame.classList.remove(
      "active",
      "exit-left",
      "exit-right",
      "enter-left",
      "enter-right",
    );
    newFrame.style.transition = "none";
    newFrame.classList.add(enterClass);

    void newFrame.offsetWidth;

    newFrame.style.transition = "";

    requestAnimationFrame(() => {
      oldFrame.classList.remove("active");
      oldFrame.classList.add(exitClass);

      newFrame.classList.remove(enterClass);
      newFrame.classList.add("active");
    });

    current = newIndex;

    setTimeout(() => {
      oldFrame.classList.remove("exit-left", "exit-right");
    }, 550);
  }

  prevBtn.addEventListener("click", () => goTo(current - 1, false));
  nextBtn.addEventListener("click", () => goTo(current + 1, true));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(current + 1, true);
    if (e.key === "ArrowLeft") goTo(current - 1, false);
  });

  // Interactive text buttons open their matching popup
  document.querySelectorAll(".interactive-text").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const popup = document.getElementById(`${target}-popup`);
      if (!popup) return;
      const wasVisible = popup.classList.contains("visible");
      popup.classList.toggle("visible");
      btn.classList.toggle("is-active", !wasVisible);
      if (!wasVisible) {
        bringToFront(popup);
      } else {
        resetPopupPosition(popup);
      }
    });
  });

  // Close popups
  document.querySelectorAll(".popup [data-close]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const popup = btn.closest(".popup");
      popup.classList.remove("visible");
      const relatedBtn = document.querySelector(
        `.interactive-text[data-target="${popup.id.replace("-popup", "")}"]`,
      );
      if (relatedBtn) relatedBtn.classList.remove("is-active");
    });
  });

  // start background music on first interaction
  const startMusic = () => {
    if (music) music.play().catch(() => {});
    document.removeEventListener("click", startMusic);
  };
  document.addEventListener("click", startMusic);
});
