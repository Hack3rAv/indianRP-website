document.addEventListener("DOMContentLoaded", async () => {

    const categorySelect = document.getElementById("threadCategory");
    const titleInput = document.getElementById("threadTitle");
    const contentInput = document.getElementById("threadContent");
    const submitBtn = document.getElementById("submitThread");

    const supportBlock = document.getElementById("supportBlock");
    const applicationBlock = document.getElementById("applicationBlock");
    const appealBlock = document.getElementById("appealBlock");

    // -------------------------
    // CATEGORY VISIBILITY LOGIC
    // -------------------------
    categorySelect.addEventListener("change", () => {
        const value = categorySelect.value;

        supportBlock.classList.add("hidden");
        applicationBlock.classList.add("hidden");
        appealBlock.classList.add("hidden");

        if (value === "support") supportBlock.classList.remove("hidden");
        if (value === "application") applicationBlock.classList.remove("hidden");
        if (value === "appeal") appealBlock.classList.remove("hidden");
    });

    // -------------------------
    // SUBMIT THREAD
    // -------------------------
    submitBtn.addEventListener("click", async () => {

        const category = categorySelect.value;
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!category || !title || !content) {
            alert("Please fill all required fields");
            return;
        }

        // TEMP category → ID mapping
        const categoryMap = {
            announcements: 1,
            support: 2,
            appeals: 3,
            applications: 4,
            discussion: 5
        };

        const payload = {
            title,
            content,
            category_id: categoryMap[category],
            type: category
        };

        try {
            const res = await fetch("http://localhost:3000/api/forum/thread", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.message || "Failed to create thread");
                return;
            }

            // Redirect to thread page
            window.location.href = `/pages/forum/thread.html?id=${data.threadId}`;

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    });

});
