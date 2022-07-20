const fs = require("fs");

async function main() {
    let starting = getDictionary('a.json');
    if(starting === null) {
        console.log("Error retrieving data from json files");
        return;
    }

    let keys = Object.keys(starting);
    keys = keys.filter(key => key.match('-') === null);

    let cleaned = {};
    keys.forEach(key => cleaned[key] = starting[key]);

    saveDictionary(cleaned);
}

function getDictionary(fileName) {
    try {
        let content = fs.readFileSync(fileName, 'utf8');
        result = JSON.parse(content);
        return result;
    } catch(error) {
        console.log("Error restoring assets from dictionary file: ", fileName);
        return null;
    }
}


function saveDictionary(dictionary) {
    fs.writeFile('cleaned.json', JSON.stringify(dictionary || {}), (err) => {
        if(err) {
            console.log("Error writing to file");
            console.error(err);
        }
    });
}

main();