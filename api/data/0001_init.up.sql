BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id              BIGINT      PRIMARY KEY,
    name            TEXT,
    password        TEXT,
    email           TEXT        NOT NULL    UNIQUE,
    phone_number    TEXT,
    address         TEXT,
    role            TEXT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS training_centers (
    id              BIGINT      PRIMARY KEY,
    manager_id      BIGINT,
    name            TEXT        NOT NULL,
    address         TEXT        NOT NULL,
    type            TEXT,
    department      TEXT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE training_centers
    ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES users (id)
    ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS teams (
    id              BIGINT      PRIMARY KEY,
    name            TEXT        NOT NULL,
    coach_id        BIGINT,
    center_id       BIGINT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE teams
    ADD CONSTRAINT fk_coach FOREIGN KEY (coach_id) REFERENCES users (id)
    ON DELETE SET NULL;

ALTER TABLE teams
    ADD CONSTRAINT fk_center FOREIGN KEY (center_id) REFERENCES training_centers (id)
    ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS students (
    id              BIGINT      PRIMARY KEY,
    user_id         BIGINT      NOT NULL,
    team_id         BIGINT,
    parent_id       BIGINT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE students
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE;

ALTER TABLE students
    ADD CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES teams (id)
    ON DELETE SET NULL;

ALTER TABLE students
    ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES users (id)
    ON DELETE SET NULL;

COMMIT;
