const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const notion = require('./notion');

//middleware
app.use(express.json())

app.listen(
    PORT,
    () => console.log('live on http://localhost:' + PORT)
)

app.get('/get-towns', (req, res) => {
    notion.getTowns().then((notionRes) => {
        res.send(notionRes);
    });
})

app.post('/create-town', (req, res) => {
    const town = req.body;

    notion.createTown({
        name: town.name,
        description: town.description,
        coordinates: town.coordinates
    })

    res.send(`town ${town.name} has been added to the database`);
})