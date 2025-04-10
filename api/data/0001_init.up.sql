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

CREATE TABLE IF NOT EXISTS training_sessions (
    id              BIGINT      PRIMARY KEY,
    name            TEXT        NOT NULL,
    coach_id        BIGINT,
    team_id         BIGINT,
    start_date      TIMESTAMP   NOT NULL,
    session_type    TEXT        NOT NULL,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE training_sessions
    ADD CONSTRAINT fk_coach_training_session FOREIGN KEY (coach_id) REFERENCES users (id)
    ON DELETE SET NULL;

ALTER TABLE training_sessions
    ADD CONSTRAINT fk_team_training_session FOREIGN KEY (team_id) REFERENCES teams (id)
    ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS registrations (
    id              BIGINT      PRIMARY KEY,
    student_id      BIGINT,
    session_id      BIGINT,
    status          TEXT        NOT NULL,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE registrations
    ADD CONSTRAINT fk_student_registration FOREIGN KEY (student_id) REFERENCES students (id)
    ON DELETE CASCADE;

ALTER TABLE registrations
    ADD CONSTRAINT fk_training_session FOREIGN KEY (session_id) REFERENCES training_sessions (id)
    ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS feedback (
    id              BIGINT      PRIMARY KEY,
    user_id         BIGINT,
    session_id      BIGINT,
    context         TEXT        NOT NULL,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE feedback
    ADD CONSTRAINT fk_user_feedback FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE;

ALTER TABLE feedback
    ADD CONSTRAINT fk_training_session_feedback FOREIGN KEY (session_id) REFERENCES training_sessions (id)
    ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS attendance (
    id              BIGINT      PRIMARY KEY,
    user_id         BIGINT,
    session_id      BIGINT,
    status          TEXT        NOT NULL,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE feedback
    ADD CONSTRAINT fk_user_attendance FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE;

ALTER TABLE feedback
    ADD CONSTRAINT fk_training_session_attendance FOREIGN KEY (session_id) REFERENCES training_sessions (id)
    ON DELETE CASCADE;


COMMIT;
