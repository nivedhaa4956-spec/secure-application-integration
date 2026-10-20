const express = require("express");
const Database = require("better-sqlite3");

const app = express();
app.use(express.json());

const db = new Database("internships.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS internships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        domain TEXT NOT NULL,
        location TEXT
    )
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM internships").get();

if (count.count === 0) {
    const insert = db.prepare(`
        INSERT INTO internships (title, company, domain, location)
        VALUES (?, ?, ?, ?)
    `);

    insert.run("Python Developer Intern", "Tech Solutions", "Python", "Chennai");
    insert.run("Data Analyst Intern", "DataWorks", "Data Analytics", "Remote");
    insert.run("Web Development Intern", "WebTech", "Full Stack Development", "Bangalore");
}

app.get("/", (req, res) => {
    res.json({
        message: "Internship REST API is running"
    });
});

app.get("/api/internships", (req, res) => {
    const internships = db.prepare("SELECT * FROM internships").all();
    res.json(internships);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});