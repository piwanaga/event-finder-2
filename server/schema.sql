DROP TABLE IF EXISTS users, artists_following CASCADE;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE
);

CREATE TABLE artists_following (
    id text NOT NULL,
    name text NOT NULL,
    photo_url text NOT NULL,
    username text NOT NULL  
        REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY(id, username)
);