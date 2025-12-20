/**
 * =====================================================
 * SITE CONFIGURATION (FRONTEND ONLY)
 * =====================================================
 * This file contains ONLY static configuration.
 * No logic, no DOM access, no fetch calls.
 * =====================================================
 */

window.SITE_CONFIG = {
    // -----------------------------
    // SERVER STATUS API
    // -----------------------------
    SERVER_STATUS_API: "https://rplayer.neopix.in/",

    // Polling interval in milliseconds
    SERVER_STATUS_INTERVAL: 5000, // 5 seconds

    // -----------------------------
    // MAINTENANCE MODE (FRONTEND)
    // -----------------------------
    MAINTENANCE_MODE: false,

    // -----------------------------
    // ROUTING
    // -----------------------------
    DEFAULT_ROUTE: "/",
    NOT_FOUND_ROUTE: "/404",

    // -----------------------------
    // UI / BEHAVIOR FLAGS
    // -----------------------------
    ENABLE_PARALLAX: true,
    ENABLE_HORIZONTAL_SECTIONS: true,

    // Reduce motion automatically on small devices
    REDUCE_MOTION_WIDTH: 768
};
