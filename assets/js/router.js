/**
 * =====================================================
 * HISTORY API ROUTER (FRONTEND ONLY)
 * =====================================================
 * - No frameworks
 * - No backend assumptions
 * - Clean, predictable behavior
 * =====================================================
 */

const appOutlet = document.getElementById("app-content");

/**
 * Map routes to page files
 */
const ROUTES = {
    "/": "home.html",
    "/features": "features.html",
    "/wiki": "wiki.html",
    "/rules": "rules.html",
    "/download": "download.html",
    "/community": "community.html",
    "/apply": "apply.html"
};

/**
 * Load a page into the app outlet
 */
async function loadPage(path, replaceState = false) {
    // Maintenance mode override
    if (window.SITE_CONFIG.MAINTENANCE_MODE && path !== "/maintenance") {
        path = "/maintenance";
    }

    const pageFile =
        ROUTES[path] ||
        (path.startsWith("/admin") ? path.replace("/admin/", "admin/") + ".html" : null);

    const finalFile = pageFile
        ? `/pages/${pageFile}`
        : "/pages/404.html";

    try {
        const response = await fetch(finalFile, { cache: "no-store" });

        if (!response.ok) {
            throw new Error("Page not found");
        }

        const html = await response.text();
        appOutlet.innerHTML = html;

        if (replaceState) {
            history.replaceState({}, "", path);
        } else {
            history.pushState({}, "", path);
        }

        // Page loaded hook (used later)
        document.dispatchEvent(new CustomEvent("page:loaded", { detail: { path } }));

    } catch (err) {
        console.error("[Router]", err);
        appOutlet.innerHTML = "<h1 style='padding:40px'>Page failed to load</h1>";
    }
}

/**
 * Handle link clicks
 */
document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;

    const href = link.getAttribute("href");

    // Ignore external links
    if (!href.startsWith("/")) return;

    e.preventDefault();
    loadPage(href);
});

/**
 * Handle browser navigation (back / forward)
 */
window.addEventListener("popstate", () => {
    loadPage(window.location.pathname, true);
});

/**
 * Initial load
 */
document.addEventListener("DOMContentLoaded", () => {
    loadPage(window.location.pathname, true);
});
