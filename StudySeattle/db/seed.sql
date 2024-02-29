DROP TABLE IF EXISTS study_spots;
DROP TABLE IF EXISTS attributes;

CREATE TABLE study_spots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
);

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    coffee_shop_id INTEGER REFERENCES coffee_shops(id),
    outlets INTEGER,
    wifi BOOLEAN,
    tables INTEGER,
    open_hour INTEGER,
    close_hour INTEGER,
    noise_level INTEGER CHECK (noise_level >= 1 AND noise_level <= 10),
    lighting VARCHAR(50), -- 'natural', 'dim', 'bright'
    whiteboards INTEGER,
    conference_rooms INTEGER
);
