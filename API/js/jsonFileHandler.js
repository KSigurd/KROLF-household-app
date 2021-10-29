const fs = require('fs').promises;

//Reads content from products.json-file
async function readProductsFromFile () {
    const jsonProducts = await fs.readFile(__dirname + '/../data/products.json', 'utf8', (error) => {
        if (error) throw error;
    });

    try {
        const products = JSON.parse(jsonProducts);
        return products;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

//Writes content to products.json-file
async function writeProductsToFile (products) {
    const jsonContent = JSON.stringify(products,0,2);

    await fs.writeFile(__dirname + '/../data/products.json', jsonContent, 'utf8', (error) => {
        if (error) throw error;
    });
}

module.exports = {
    readProductsFromFile,
    writeProductsToFile
}