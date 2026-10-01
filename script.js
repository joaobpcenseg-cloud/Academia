const WHATSAPP_NUMBER = "SEU_NUMERO_AQUI";

const WHATSAPP_MESSAGES = {
  geral:
    "Olá! Conheci a Falcon Gym pelo site e gostaria de saber mais sobre os planos.",
  planos: "Olá! Vi os planos da Falcon Gym e gostaria de saber mais.",
  aulas:
    "Olá! Conheci as aulas da Falcon Gym pelo site e gostaria de saber mais.",
};

function getWhatsAppUrl(type) {
  const message = WHATSAPP_MESSAGES[type] || WHATSAPP_MESSAGES.geral;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function initWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const type = link.getAttribute("data-whatsapp");
    link.href = getWhatsAppUrl(type);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function hideBrokenImages() {
  document.querySelectorAll("img").forEach((img) => {
    const hide = () => {
      img.hidden = true;
      const figure = img.closest("figure");
      if (figure && !figure.querySelector("img:not([hidden])")) {
        figure.hidden = true;
      }
    };

    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsApp();
  initMobileNav();
  initReveal();
  hideBrokenImages();
});
