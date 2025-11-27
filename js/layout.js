(function () {
    // capisco se sono in /html/ (pagina interna) o in root (home)
    const isSubpage = window.location.pathname.includes("/html/");
    const basePath = isSubpage ? ".." : ".";

    const headerHolder = document.getElementById("site-header");
    if (!headerHolder) return;

    // carico la navbar
    fetch(basePath + "/partials/nav.html")
        .then((res) => res.text())
        .then((html) => {
            headerHolder.innerHTML = html;

            // SISTEMO GLI HREF in base alla posizione
            const links = headerHolder.querySelectorAll(".nav-link");
            links.forEach((link) => {
                const href = isSubpage ? link.dataset.sub : link.dataset.root;
                if (href) link.setAttribute("href", href.trim());
            });

            // bottone "Ordina" → contatti
            const cta = headerHolder.querySelector(".nav-cta");
            if (cta) {
                const contactHref = isSubpage
                    ? "contatti.html"
                    : "html/contatti.html";

                cta.addEventListener("click", () => {
                    window.location.href = contactHref;
                });
            }

            // evidenzio il link attivo
            const current = document.body.dataset.page;
            if (!current) return;

            const active = headerHolder.querySelector(
                '.nav-link[data-page="' + current + '"]'
            );
            if (active) active.classList.add("nav-link--active");
        })
        .catch((err) => console.error("Errore caricamento navbar:", err));
})();
