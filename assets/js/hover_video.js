/* Simples Vorwärtsspielen
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.video-hover video').forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // zurückspulen
    });
  });
});
*/

/* Vorwärts und Rückwärts funktioniert (mit 2 Videos)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.video-hover').forEach(container => {
    const forward = container.querySelector('.forward');
    const reverse = container.querySelector('.reverse');

    forward.currentTime = 0;
    reverse.pause();
    reverse.currentTime = 0;

    // ▶️ Hover rein
    container.addEventListener('mouseenter', () => {
      reverse.pause();
      reverse.currentTime = 0;
      reverse.style.opacity = 0;

      forward.currentTime = 0;
      forward.style.opacity = 1;
      forward.play();
    });

    // ⏪ Hover raus
    container.addEventListener('mouseleave', () => {
      const t = forward.currentTime % forward.duration;
      forward.pause();

      reverse.currentTime = reverse.duration - t;

      reverse.onseeked = () => {
        reverse.style.opacity = 1;
        reverse.play();

        // Forward langsam ausblenden (statt sofort)
        forward.style.opacity = 0;
        reverse.onseeked = null;
      };

      reverse.onended = () => {
        reverse.pause();
        reverse.currentTime = 0;
        reverse.style.opacity = 0;

        forward.currentTime = 0;
        forward.style.opacity = 1;
      };
    });
  });
});
*/
document.addEventListener("DOMContentLoaded", () => {
  const isDesktopLike =
    window.matchMedia("(any-hover: hover)").matches &&
    window.matchMedia("(any-pointer: fine)").matches;

  document.querySelectorAll(".video-hover .scrub-video").forEach((video) => {
    const container = video.closest(".video-hover");

    if (isDesktopLike) {
      // -----------------------------
      // DESKTOP → GSAP Scrubbing
      // -----------------------------
      const init = () => {
        const dur = video.duration;
        if (!dur || !isFinite(dur)) return;

        video.pause();
        video.currentTime = 0;

        if (video._tl) video._tl.kill();

        const tl = gsap.to(video, {
          currentTime: dur,
          duration: dur,
          ease: "none",
          paused: true,
        });
        video._tl = tl;

        container.addEventListener("mouseenter", () => tl.play());
        container.addEventListener("mouseleave", () => tl.reverse());

        tl.eventCallback("onReverseComplete", () => tl.pause(0));
      };

      if (video.readyState >= 2) init();
      else video.addEventListener("loadeddata", init, { once: true });
    } else {
      // -----------------------------
      // MOBILE → Poster + Loop + Klick = Play/Pause
      // -----------------------------
      video.setAttribute("poster", "Bilder/CS1_adobe.jpeg"); // 🔹 nur Mobile
      video.setAttribute("loop", "");
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0;

      // 👉 Toggle Play/Pause beim Antippen
      video.addEventListener("click", () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  });
});






