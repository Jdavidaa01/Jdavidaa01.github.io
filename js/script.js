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
})();
