(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px" }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const placeholderUrl = (label) => {
    const safeLabel = encodeURIComponent(label || "Gambar Rocket Stove");
    return `https://placehold.co/1200x900/e8efe6/174c3a?text=${safeLabel}`;
  };

  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        if (image.dataset.fallbackApplied === "true") return;

        image.dataset.fallbackApplied = "true";
        image.src = placeholderUrl(image.dataset.fallback);
      },
      { once: false }
    );
  });

  const modal = document.querySelector(".prototype-modal");
  const modalImage = modal?.querySelector("img");
  const modalCaption = modal?.querySelector("figcaption");
  const modalClose = modal?.querySelector(".prototype-modal-close");
  const imageButtons = document.querySelectorAll("[data-modal-image]");
  let lastTrigger = null;

  const closeModal = () => {
    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = "";
    lastTrigger?.focus();
  };

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!modal || !modalImage || !modalCaption) return;

      const sourceImage = button.querySelector("img");
      lastTrigger = button;
      modalImage.src = sourceImage?.currentSrc || button.dataset.modalImage || "";
      modalImage.alt = sourceImage?.alt || button.dataset.modalTitle || "";
      modalCaption.textContent = button.dataset.modalTitle || "";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      modalClose?.focus();
    });
  });

  modalClose?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });
})();
