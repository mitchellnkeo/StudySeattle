DROP TABLE IF EXISTS study_spots;
DROP TABLE IF EXISTS attributes;

CREATE TABLE study_spots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    study_spot_id INTEGER REFERENCES study_spots(id),
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
