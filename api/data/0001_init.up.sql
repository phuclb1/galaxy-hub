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
    name            TEXT        NOT NULL,
    address         TEXT        NOT NULL,
    type            TEXT,
    department      TEXT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
