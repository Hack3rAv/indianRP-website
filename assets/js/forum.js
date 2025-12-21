document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".forum-category");

    dropdowns.forEach(drop => {
        const btn = drop.querySelector(".forum-cat-btn");

        btn.addEventListener("click", e => {
            e.stopPropagation();
            drop.classList.toggle("open");
        });
    });

    document.addEventListener("click", () => {
        dropdowns.forEach(drop => drop.classList.remove("open"));
    });
});
