document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("threadCategory");

    const support = document.getElementById("supportBlock");
    const application = document.getElementById("applicationBlock");
    const appeal = document.getElementById("appealBlock");

    categorySelect.addEventListener("change", () => {
        support.classList.add("hidden");
        application.classList.add("hidden");
        appeal.classList.add("hidden");

        if (categorySelect.value === "support") {
            support.classList.remove("hidden");
        }

        if (categorySelect.value === "application") {
            application.classList.remove("hidden");
        }

        if (categorySelect.value === "appeal") {
            appeal.classList.remove("hidden");
        }
    });
});
