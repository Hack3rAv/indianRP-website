document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".wiki-search");
    const sections = document.querySelectorAll(".wiki-section");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        sections.forEach(section => {
            const cards = section.querySelectorAll(".wiki-card");
            let sectionHasMatch = false;

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();

                if (text.includes(query)) {
                    card.style.display = "";
                    sectionHasMatch = true;
                } else {
                    card.style.display = "none";
                }
            });

            // Hide section title if no cards match
            const title = section.querySelector("h2");
            if (title) {
                title.style.display = sectionHasMatch ? "" : "none";
            }
        });
    });
});
