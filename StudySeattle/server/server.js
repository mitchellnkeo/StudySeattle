import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors middleware


dotenv.config();

const { PORT, DATABASE_URL } = process.env;

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

client.connect();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Endpoint to retrieve study spots and their attributes
app.get('/api/study-spots', async (req, res) => {
  try {
    // Query to join study_spots and attributes tables
    const query = `
      SELECT study_spots.*, attributes.*
      FROM study_spots
      JOIN attributes ON study_spots.id = attributes.study_spot_id
    `;

    const result = await client.query(query);

    // Map rows to an array of study spots with attributes
    const studySpots = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      latitude: row.latitude,
      longitude: row.longitude,
      attributes: {
        outlets: row.outlets,
        wifi: row.wifi,
        tables: row.tables,
        open_hour: row.open_hour,
        close_hour: row.close_hour,
        noise_level: row.noise_level,
        lighting: row.lighting,
        whiteboards: row.whiteboards,
        conference_rooms: row.conference_rooms,
      },
    }));

    // Send the array of study spots with attributes as JSON response
    res.json(studySpots);
  } catch (error) {
    console.error('Error fetching study spots and attributes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});