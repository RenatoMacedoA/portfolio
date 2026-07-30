/* =========================
   UTILITÁRIOS
========================= */
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* =========================
   HEADER (SCROLL EFFECT)
========================= */
const header = $("header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add("rolagem");
  } else {
    header.classList.remove("rolagem");
  }
});

/* =========================
   CURSOR PERSONALIZADO
========================= */
const cursor = $("#cursor");
const ring = $("#cursor-ring");

// Só ativa se os elementos existirem
if (cursor && ring) {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    ring.style.left = x + "px";
    ring.style.top = y + "px";
  });

  // Efeito em links e botões
  $$("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      ring.style.opacity = "0";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.opacity = "1";
    });
  });
}

/* =========================
   MENU MOBILE
========================= */
const btnMenuMobile = document.querySelector('#btn-menu__mobile');
const line1 = document.querySelector('.line-menumobile-1');
const line2 = document.querySelector('.line-menumobile-2');
const menuMobile = document.querySelector('#menu__mobile');

const body = document.querySelector('body');

if (btnMenuMobile) {
  btnMenuMobile.addEventListener("click", () => {
    line1.classList.toggle('ativo1');
    line2.classList.toggle('ativo2');
    menuMobile.classList.toggle('abrir');
    body.classList.toggle('no-overflow');
  });
}

// FECHAR MENU MOBILE AO CLICAR NO LINK
const linksMobile = document.querySelectorAll('#menu__mobile a');

linksMobile.forEach(link => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('abrir');
    line1.classList.remove('ativo1');
    line2.classList.remove('ativo2');
    body.classList.remove('no-overflow');
  });
});

/* =========================
   TYPEWRITER (EFEITO DIGITAÇÃO)
========================= */
const typeElement = $("#typeWriter");

const words = ["Desenvolvedor Front-End", "Web Designer", "UI Designer"];

if (typeElement) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      typeElement.textContent = currentWord.substring(0, charIndex) + "|";

      if (charIndex >= currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
      }
    } else {
      charIndex--;
      typeElement.textContent = currentWord.substring(0, charIndex) + "|";

      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}


/* =========================
   EFEITO SLIDER
========================= */
const content = document.querySelector(".marquee__content");
const clone = content.cloneNode(true);

document.querySelector(".marquee__track").appendChild(clone);



/* =========================
   SKILLS (RECARREGA NO SCROLL + HOVER)
========================= */

const skillCards = document.querySelectorAll(".skills__card");

skillCards.forEach((card) => {
  const fill = card.querySelector(".skills__fill");
  if (!fill) return;

  const level = fill.dataset.level;

  function animateBar() {
    fill.style.transition = "none";
    fill.style.width = "0%";

    void fill.offsetWidth; // Força reflow para reiniciar a transição CSS

    fill.style.transition = "width 1s ease";
    fill.style.width = level + "%";
  }

  function resetBar() {
    fill.style.transition = "width 0.3s ease";
    fill.style.width = "0%";
  }

  /* =========================
     ANIMA/RESET NO SCROLL (SOBE E DESCE)
  ========================= */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateBar();
        } else {
          resetBar();
        }
      });
    },
    {
      threshold: 0.2, // Anima assim que 20% do card aparece
    }
  );

  observer.observe(card);

  /* =========================
     HOVER (REINICIA A ANIMAÇÃO)
  ========================= */
  card.addEventListener("mouseenter", () => {
    animateBar();
  });
});

/* =========================
   ANIMAÇÕES GERAIS (SCROLL)
========================= */
const animatedElements = $$(".hidden, .hidden-left, .hidden-right, .pop");

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

animatedElements.forEach((el) => animationObserver.observe(el));

/* =========================
   HERO (APARIÇÃO DO TEXTO)
========================= */
const heroText = $(".hero__text");

if (heroText) {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.15,
    }
  );

  heroObserver.observe(heroText);
}

/* ==========================================================================
   ACTIVE MENU ON SCROLL
   ========================================================================== */

// Altura do header fixo
const HEADER_HEIGHT = 60;

// Links do menu
const links = document.querySelectorAll(".js-link");

// Sections com id
const sections = document.querySelectorAll("main section[id]");

// Atualiza o link ativo
function updateActiveLink() {
  const scrollPosition = window.scrollY + HEADER_HEIGHT + 1;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    const isCurrentSection =
      scrollPosition >= sectionTop && scrollPosition < sectionBottom;

    if (!isCurrentSection) return;

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${section.id}`;
      link.classList.toggle("active", isActive);
    });
  });
}

// Atualiza durante o scroll
window.addEventListener("scroll", updateActiveLink);

// Atualiza ao carregar a página
updateActiveLink();

/* =========================
   CATEGORIAS DE SKILL (ÍCONE DINÂMICO)
========================= */
const leftIcon = document.querySelector(".skill__left-icon i");

const skillCategories = document.querySelectorAll(".skills__category");

if (leftIcon && skillCategories.length > 0) {
  const categoryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        leftIcon.className = `bi ${entry.target.dataset.icon}`;
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-30% 0px -30% 0px",
    }
  );

  skillCategories.forEach((category) => categoryObserver.observe(category));
}