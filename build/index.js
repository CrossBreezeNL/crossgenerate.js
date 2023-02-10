"use strict";
const Mustache = require('mustache');
const fs = require('fs');
//Simple example model - without using JSON file
const model = {
    name: "ExampleSource"
};
const filePath = './templates/CreateDatabase.mst';
async function loadTemplate(filePath) {
    return await fs.promises.readFile(filePath, 'utf8');
}
;
function parseTemplate(template, model) {
    return Mustache.render(template, model);
}
async function getResult() {
    let template = await loadTemplate(filePath);
    console.log(parseTemplate(template, model));
}
getResult();
