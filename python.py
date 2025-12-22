# import os

# BASE_DIR = "./"

# STRUCTURE = {
#     "": [
#         "index.html",
#         "404.html",
#         "README.md",
#     ],

#     "pages": [
#         "home.html",
#         "features.html",
#         "wiki.html",
#         "rules.html",
#         "download.html",
#         "community.html",
#         "apply.html",
#         "maintenance.html",
#     ],

#     "admin": [
#         "dashboard.html",
#         "tickets.html",
#         "appeals.html",
#         "ranks.html",
#         "docs.html",
#         "hiring.html",
#         "audit.html",
#     ],

#     "assets/css": [
#         "core.css",
#         "layout.css",
#         "components.css",
#         "animations.css",
#         "wiki.css",
#         "responsive.css",
#     ],

#     "assets/js": [
#         "app.js",
#         "router.js",
#         "serverStatus.js",
#         "parallax.js",
#         "horizontal.js",
#         "utils.js",
#     ],

#     "assets/images/hero": [
#         "hero-bg.jpg",
#     ],

#     "assets/images/ui": [
#         "logo.svg",
#         "status-online.svg",
#         "status-offline.svg",
#     ],

#     "assets/images/placeholders": [],

#     "assets/fonts": [],

#     "config": [
#         "site.config.js",
#     ],
# }

# def create_structure():
#     for folder, files in STRUCTURE.items():
#         path = os.path.join(BASE_DIR, folder)
#         os.makedirs(path, exist_ok=True)

#         for file in files:
#             file_path = os.path.join(path, file)
#             if not os.path.exists(file_path):
#                 with open(file_path, "w", encoding="utf-8") as f:
#                     f.write("")

#     print("✅ indian-roleplay-web structure created successfully")

# if __name__ == "__main__":
#     create_structure()



import os

BASE_DIR = "./backend"

STRUCTURE = {
    "src": [
        "app.js",
        "server.js",
    ],
    "src/config": [
        "db.js",
    ],
    "src/routes": [
        "auth.routes.js",
        "forum.routes.js",
        "admin.routes.js",
        "user.routes.js",
    ],
    "src/controllers": [
        "auth.controller.js",
        "forum.controller.js",
        "admin.controller.js",
        "user.controller.js",
    ],
    "src/middleware": [
        "auth.middleware.js",
        "role.middleware.js",
        "error.middleware.js",
    ],
    "src/utils": [
        "logger.js",
    ],
    "src/constants": [
        "roles.js",
    ],
    "": [
        ".env",
        "package.json",
        "README.md",
    ],
}

def create_structure():
    # Ensure the root backend directory exists
    os.makedirs(BASE_DIR, exist_ok=True)
    
    for folder, files in STRUCTURE.items():
        # Create folder path
        path = os.path.join(BASE_DIR, folder)
        os.makedirs(path, exist_ok=True)

        for file in files:
            file_path = os.path.join(path, file)
            # Create the file if it doesn't exist
            if not os.path.exists(file_path):
                with open(file_path, "w", encoding="utf-8") as f:
                    # Optional: Pre-fill README with project name
                    if file == "README.md":
                        f.write("# IN Roleplay Backend")
                    else:
                        f.write("")

    print(f"✅ Backend structure created successfully in {BASE_DIR}")

if __name__ == "__main__":
    create_structure()