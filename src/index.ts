const Mustache = require('mustache');
const fs = require('fs');
const { saveToFile } = require('./files');

const templateFilePath = './templates/CreateDatabase.mst';
const modelFilePath = './model/example-source.json';
const outFilePath = './out/result.txt';

async function loadTemplate(filePath: string): Promise<string> {
  return await fs.promises.readFile(filePath, 'utf8');
};

async function loadModel(filePath: string): Promise<string> {
  return await fs.promises.readFile(filePath, 'utf8');
};

function parseTemplate(template : string, model: Object): string {
    return Mustache.render(template, model);    
};

async function getResult() {
  let template = await loadTemplate(templateFilePath);
  let model = JSON.parse(await loadModel(modelFilePath));
  
  saveToFile(outFilePath, parseTemplate(template, model));
  // console.log();
};

getResult();