-- Sample data for study_spots table
INSERT INTO study_spots (name, address, latitude, longitude)
VALUES 
    ('Coffee Shop A', '123 Main St', 47.12345678, -122.12345678),
    ('Coffee Shop B', '456 Elm St', 47.23456789, -122.23456789),
    ('Coffee Shop C', '789 Oak St', 47.34567890, -122.34567890);

-- Sample data for attributes table
INSERT INTO attributes (study_spot_id, outlets, wifi, tables, open_hour, close_hour, noise_level, lighting, whiteboards, conference_rooms)
VALUES
    (1, 10, true, 15, 8, 20, 5, 'bright', 2, 1),
    (2, 8, true, 12, 7, 22, 7, 'dim', 1, 0),
    (3, 6, true, 10, 6, 18, 3, 'natural', 0, 0);