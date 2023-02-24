const Mustache = require('mustache');
const fs = require('fs');
const { saveToFile } = require('./files');

const templateFilePath = './templates/CreateDatabase.mst';
const modelFilePath = './model/example-source.json';
const outFilePath = './out/result.txt';

//Loads file from a path.
//Used for loading the template and model files.
async function loadFile(filePath: string): Promise<string> {
  return await fs.promises.readFile(filePath, 'utf8');
};

//Given a model and a template we parse a mustache template
//We are using a wrapper to decouple template engine from generation later.
function parseTemplate(template : string, model: Object): string {
    return Mustache.render(template, model);
};

async function runGenerate() {
  let template = await loadFile(templateFilePath);
  let model = JSON.parse(await loadFile(modelFilePath));
  
  saveToFile(outFilePath, parseTemplate(template, model));
};

runGenerate();