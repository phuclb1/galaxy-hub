BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id              BIGINT      PRIMARY KEY,
    name            TEXT,
    password        TEXT,
    email           TEXT        NOT NULL    UNIQUE,
    picture         TEXT,
    role            TEXT,
    created_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
