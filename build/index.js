"use strict";
const Mustache = require('mustache');
const fs = require('fs');
//Simple example model - without using JSON file
const model = {
    system: { name: "ExampleSource" }
};
const filePath = './templates/CreateDatabase.mst';
async function loadTemplate(filePath) {
    let output;
    output = await fs.promises.readFile(filePath, 'utf8');
    return output;
}
;
function parseTemplate(template, model) {
    return Mustache.render(template, model);
}
async function getResult() {
    let template = await loadTemplate(filePath);
    parseTemplate(template, model);
    console.log('result: ' + template);
}
getResult();
