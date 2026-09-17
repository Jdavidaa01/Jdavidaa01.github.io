// Desplazamiento suave al navegar por anclas internas.
// El contenido es completamente legible y funcional sin este script.
(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var navLinks = document.querySelectorAll('.title-block__nav a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href").slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      if (history.pushState) {
        history.pushState(null, "", "#" + targetId);
      }
    });
  });

  // Aparición progresiva de secciones al hacer scroll.
  // Si no hay soporte de IntersectionObserver o el usuario prefiere menos
  // movimiento, las secciones simplemente quedan visibles (comportamiento
  // por defecto en el CSS), sin bloquear el contenido.
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(".reveal");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (target) {
      target.classList.add("will-animate");
      observer.observe(target);
    });
  }
})();
