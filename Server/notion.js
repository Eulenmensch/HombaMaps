const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function createTown({ name, description, coordinates }) {
    notion.pages.create({
        parent: {
            database_id: process.env.NOTION_TOWNS_DATABASE_ID
        },
        properties: {
            [process.env.NOTION_TOWNS_NAME_ID]: {
                title: [{
                    text: { content: name }
                }]
            },
            [process.env.NOTION_TOWNS_DESCRIPTION_ID]: {
                rich_text: [{
                    text: { content: description }
                }]
            },
            [process.env.NOTION_TOWNS_X_COORDINATE_ID]: {
                number: coordinates[0]
            },
            [process.env.NOTION_TOWNS_Y_COORDINATE_ID]: {
                number: coordinates[1]
            }
        }
    })
}

async function getTowns() {
    const response = await notion.databases.query({ database_id: process.env.NOTION_TOWNS_DATABASE_ID });
    const townPages = response.results;

    let townNames = [];

    townPages.forEach((townPage) => {
        let town = {
            name: townPage.properties.Name.title[0].plain_text,
            description: townPage.properties.Description.rich_text[0].plain_text,
            coordinates: [townPage.properties.x_coordinate.number,
                townPage.properties.y_coordinate.number
            ]
        }
        townNames.push(town);
    })

    return townNames;
}

module.exports = {
    getTowns,
    createTown
}