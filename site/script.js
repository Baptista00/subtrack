document.documentElement.classList.add("js");

(() => {
  "use strict";

  const initialize = () => {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });

    const header = document.querySelector(".site-header");

    if (header) {
      const updateHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      };

      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    const menuToggle = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    if (menuToggle && mobileMenu) {
      let menuIsOpen = mobileMenu.classList.contains("is-open");

      const setMenuState = (isOpen, restoreFocus = false) => {
        menuIsOpen = isOpen;
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
          "aria-label",
          isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação",
        );
        mobileMenu.classList.toggle("is-open", isOpen);

        if (
          !isOpen &&
          (restoreFocus || mobileMenu.contains(document.activeElement))
        ) {
          menuToggle.focus({ preventScroll: true });
        }
      };

      setMenuState(menuIsOpen);

      menuToggle.addEventListener("click", () => {
        setMenuState(!menuIsOpen);
      });

      mobileMenu.querySelectorAll("a[href]").forEach((link) => {
        link.addEventListener("click", () => {
          setMenuState(false);
        });
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuIsOpen) {
          event.preventDefault();
          setMenuState(false, true);
        }
      });

      document.addEventListener("click", (event) => {
        const target = event.target;

        if (
          menuIsOpen &&
          target instanceof Node &&
          !menuToggle.contains(target) &&
          !mobileMenu.contains(target)
        ) {
          setMenuState(false);
        }
      });
    }

    document.querySelectorAll(".faq-question").forEach((question, index) => {
      const panelId = question.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : question.nextElementSibling;

      if (!panel) {
        return;
      }

      const initiallyExpanded = index === 0;
      question.setAttribute("aria-expanded", String(initiallyExpanded));
      panel.hidden = !initiallyExpanded;

      question.addEventListener("click", () => {
        const isExpanded = question.getAttribute("aria-expanded") === "true";
        question.setAttribute("aria-expanded", String(!isExpanded));
        panel.hidden = isExpanded;
      });
    });

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8%",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
