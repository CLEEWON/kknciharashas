const config = window.KKN_CONFIG || {};

/* =========================
   HEADER & MOBILE MENU
========================= */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  },
  { passive: true }
);

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("open");

  navLinks?.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.classList.remove("open");
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* =========================
   FILTER PROGRAM
========================= */

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const selectedCategory = button.dataset.filter;

    document.querySelectorAll(".program-card").forEach((card) => {
      const categories = String(card.dataset.category || "")
        .split(" ")
        .filter(Boolean);

      const shouldShow =
        selectedCategory === "all" ||
        categories.includes(selectedCategory);

      card.hidden = !shouldShow;
    });
  });
});

/* =========================
   REVEAL ANIMATION
========================= */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   NUMBER COUNTER
========================= */

const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) {
        return;
      }

      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      const suffix = element.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();

      const updateNumber = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent =
          Math.round(target * eased).toLocaleString("id-ID") +
          suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          element.dataset.done = "1";
        }
      };

      requestAnimationFrame(updateNumber);
      numberObserver.unobserve(element);
    });
  },
  {
    threshold: 0.5
  }
);

document.querySelectorAll("[data-count]").forEach((element) => {
  numberObserver.observe(element);
});

/* =========================
   GALLERY LIGHTBOX
========================= */

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");

    if (!lightbox || !lightboxImage || !image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox?.classList.remove("open");
  document.body.style.overflow = "";
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/* =========================
   CONFIG LINKS & TEXT
========================= */

document.querySelectorAll("[data-config-link]").forEach((element) => {
  const key = element.dataset.configLink;

  if (config[key]) {
    element.href = config[key];
  }
});

document.querySelectorAll("[data-config-text]").forEach((element) => {
  const key = element.dataset.configText;

  if (config[key]) {
    element.textContent = config[key];
  }
});

/* =========================
   CONTACT FORM
========================= */

document
  .querySelector(".contact-form")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const message = [
      "Halo Tim KKN Desa Ciharashas,",
      "",
      `Nama: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      "",
      String(form.get("message") || "")
    ].join("\n");

    const whatsappNumber = String(config.whatsapp || "")
      .replace(/\D/g, "");

    if (!whatsappNumber) {
      alert("Nomor WhatsApp belum diatur di config.js.");
      return;
    }

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener");
  });

/* =========================
   TEAM DATA
========================= */

const teamMembers = [
  {
    name: "Syaban",
    role: "Koordinator Desa",
    photo: "assets/images/team-syaban.jpeg"
  },
  {
    name: "Azzahra",
    role: "Wakil Koordinator Desa",
    photo: "assets/images/team-azzahra.jpg"
  },
  {
    name: "Sabine",
    role: "Sekretaris I",
    photo: "assets/images/team-sabin.jpg"
  },
  {
    name: "Najma",
    role: "Sekretaris II",
    photo: "assets/images/team-najma.jpg"
  },
  {
    name: "Widya",
    role: "Bendahara",
    photo: "assets/images/team-widya.jpg"
  },
  {
    name: "Rini",
    role: "Koordinator Acara",
    photo: "assets/images/team-rini.jpg"
  },
  {
    name: "Fajar",
    role: "Koordinator Humas",
    photo: "assets/images/team-fajar.jpeg"
  },
  {
    name: "Ziad",
    role: "Koordinator Publikasi dan Dokumentasi",
    photo: "assets/images/team-ziad.jpeg"
  },
  {
    name: "Rizky",
    role: "Koordinator Logistik",
    photo: "assets/images/team-kiki.jpg"
  },
  {
    name: "Charlee",
    role: "Divisi Acara",
    photo: "assets/images/team-charlee.jpg"
  },
  {
    name: "Alsina",
    role: "Divisi Acara",
    photo: "assets/images/team-alsina.jpg"
  },
  {
    name: "Zahra",
    role: "Divisi Acara",
    photo: "assets/images/team-zahra.jpg"
  },
  {
    name: "Ayu",
    role: "Divisi Humas",
    photo: "assets/images/team-ayu.jpg"
  },
  {
    name: "Reva",
    role: "Divisi Humas",
    photo: "assets/images/team-reva.jpg"
  },
  {
    name: "Arif",
    role: "Logistik",
    photo: "assets/images/team-arip.jpg"
  },
  {
    name: "Nabil",
    role: "PDD",
    photo: "assets/images/team-nabil.jpg"
  },
  {
    name: "Sri Justika",
    role: "PDD",
    photo: "assets/images/team-sri.jpg"
  }
];

/* =========================
   TEAM EXTEND BUTTON
========================= */

const teamGrid = document.querySelector("#teamGrid");
const teamToggle = document.querySelector("#teamToggle");

let teamRendered = false;
let teamCloseTimer;

function renderTeam() {
  if (teamRendered || !teamGrid) return;

  teamGrid.innerHTML = teamMembers
    .map(
      (member) => `
        <article class="team-card">
          <div class="team-image">
            <img
              src="${member.photo}"
              alt="Foto ${member.name}"
              loading="lazy"
              decoding="async"
              width="400"
              height="500"
              onerror="this.onerror=null; this.src='assets/logo-mark.png';"
            >
          </div>

          <div class="team-copy">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
          </div>
        </article>
      `
    )
    .join("");

  teamRendered = true;
}

teamToggle?.addEventListener("click", () => {
  if (!teamGrid) return;

  const isOpen =
    teamToggle.getAttribute("aria-expanded") === "true";

  clearTimeout(teamCloseTimer);

  if (!isOpen) {
    renderTeam();

    teamGrid.hidden = false;
    teamToggle.setAttribute("aria-expanded", "true");
    teamToggle.textContent = "Sembunyikan Tim ↑";

    requestAnimationFrame(() => {
      teamGrid.classList.add("is-open");
    });

    return;
  }

  teamGrid.classList.remove("is-open");
  teamToggle.setAttribute("aria-expanded", "false");
  teamToggle.textContent = "Lihat Semua Tim ↓";

  teamCloseTimer = setTimeout(() => {
    teamGrid.hidden = true;
  }, 350);
});