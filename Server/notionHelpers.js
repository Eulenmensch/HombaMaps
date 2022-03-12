function notionPropertiesById(properties) {
    return Object.values(properties).reduce((obj, property) => {
        const { id, ...rest } = property;
        return {...obj, [id]: rest };
    }, {})
}

async function getDatabasePropertyIDs(databaseId) {
    const database = await notion.databases.retrieve({
        database_id: databaseId
    })

    console.log(notionPropertiesById(database.properties));
}

module.exports = {
    notionPropertiesById,
    getDatabasePropertyIDs
}