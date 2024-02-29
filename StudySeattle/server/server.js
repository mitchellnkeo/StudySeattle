import express from "express"
import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { PORT } = process.env;

const app = express();
app.get("/", (req, res) => {
    res.send("Test.")
    });

    app.listen(PORT, () => {
        console.log(`Listening on port: ${ PORT }`);
        })
        