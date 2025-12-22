-- =====================================================
-- INDIAN ROLEPLAY - UNIFIED FORUM DATABASE (FINAL)
-- MariaDB / MySQL compatible
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- ROLES
-- =====================================================
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(20) UNIQUE NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    level INT NOT NULL
);

INSERT INTO roles (key_name, display_name, level) VALUES
('user', 'User', 1),
('support', 'Support Admin', 2),
('appeal', 'Appeal Admin', 3),
('admin', 'Server Manager', 4);

-- =====================================================
-- USERS
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    role_id INT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX (username),
    INDEX (email)
);

-- =====================================================
-- FORUM CATEGORIES
-- =====================================================
CREATE TABLE forum_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    is_admin_only BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- THREADS
-- =====================================================
CREATE TABLE threads (
    id INT PRIMARY KEY AUTO_INCREMENT,

    category_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    type ENUM(
        'discussion',
        'support',
        'application',
        'appeal',
        'archive'
    ) NOT NULL,

    status ENUM(
        'open',
        'closed',
        'locked'
    ) DEFAULT 'open',

    created_by INT NOT NULL,
    assigned_admin INT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES forum_categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (assigned_admin) REFERENCES users(id)
);

-- =====================================================
-- POSTS
-- =====================================================
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,

    thread_id INT NOT NULL,
    author_id INT NOT NULL,

    content TEXT NOT NULL,

    post_type ENUM(
        'user',
        'admin',
        'system'
    ) DEFAULT 'user',

    priority ENUM(
        'normal',
        'official',
        'priority',
        'final'
    ) DEFAULT 'normal',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- =====================================================
-- THREAD ACTIONS (ADMIN AUDIT)
-- =====================================================
CREATE TABLE thread_actions (
    id INT PRIMARY KEY AUTO_INCREMENT,

    thread_id INT NOT NULL,
    admin_id INT NOT NULL,

    action ENUM(
        'close',
        'lock',
        'unlock',
        'move',
        'assign',
        'status_change'
    ) NOT NULL,

    old_value VARCHAR(50),
    new_value VARCHAR(50),

    reason TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (thread_id) REFERENCES threads(id),
    FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- =====================================================
-- THREAD PARTICIPANTS
-- =====================================================
CREATE TABLE thread_participants (
    thread_id INT NOT NULL,
    user_id INT NOT NULL,

    PRIMARY KEY (thread_id, user_id),

    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

SET FOREIGN_KEY_CHECKS = 1;
