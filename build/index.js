"use strict";
const Mustache = require('mustache');
const fs = require('fs');
const { saveToFile } = require('./files');
const templateFilePath = './templates/CreateDatabase.mst';
const modelFilePath = './model/example-source.json';
const outFilePath = './out/result.txt';
//Loads file from a path.
//Used for loading the template and model files.
async function loadFile(filePath) {
    return await fs.promises.readFile(filePath, 'utf8');
}
;
async function getResult() {
    let template = await loadFile(templateFilePath);
    let model = JSON.parse(await loadFile(modelFilePath));
    saveToFile(outFilePath, Mustache.render(template, model));
}
;
getResult();
