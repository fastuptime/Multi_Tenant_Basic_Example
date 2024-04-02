const express = require('express');
const app = express();
const { StarDB } = require('stardb');
const port = 80;
const db = new StarDB("database.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    let site = req.headers.host;
    console.log(`Request from ${site}`);

    let config = await db.get("sites") || [];
    if(!config || config.length < 1) {
        return res.status(500).send(`<center><h1 style="color: red;">No sites found</h1></center>`);
    }

    config = config.find(c => c.site === site);
    if(!config) {
        return res.status(404).send(`<center><h1 style="color: red;">Site not found</h1><br><h3>${site}</h3></center>`);
    }

    if(config.blocked) {
        return res.status(403).send(`<center><h1 style="color: red;">Site is blocked</h1><br><h3>${site}</h3></center>`);
    }

    if(config.maintenance) {
        return res.status(503).send(`<center><h1 style="color: red;">Site is under maintenance</h1><br><h3>${site}</h3></center>`);
    }

    res.locals.config = config;
    next();

    // database example site add
    // db.push("sites", [
    //     {
    //         site: "example.com",
    //         blocked: false,
    //         maintenance: false
    //     }
    // ]);
});

app.get('/', async (req, res) => {
    res.send(`<center><h1>Welcome to ${req.headers.host}</h1></center>`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});