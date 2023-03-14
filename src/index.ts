import Mustache from 'mustache';
// import path from 'path';
import fs from 'fs';
// const fs = require('fs');
import path from 'path';
import { saveToFile, reRootPath } from './auxiliary';
import { loadJson, loadJsonString, queryJson } from './jsonHandler';

// const templateFilePath = './templates/CreateDatabase.mst';
// const modelFilePath = './model/example-source.json';
// const outFilePath = './out/result.txt';

//Given a model and a template we parse a mustache template
//We are using a wrapper to decouple template engine from generation later.
function parseTemplate(template: string, model: JSON): string {
  return Mustache.render(template, model);
}

async function generateAndSave(template: string, model: JSON, outFilePath: string) {
  if (!fs.existsSync(outFilePath)) {
    console.log('test');
    // throw new Error('No file exists at the given filepath.');
  }
  // let model = JSON.parse(await loadJson(modelFilePath));
  saveToFile(outFilePath, parseTemplate(template, model));
}

async function cliCfgRunGenerate(cliArgs: string[]) {
  // Load config using command line

  const configPath = cliArgs[2];
  // Check if file exists
  if (!fs.existsSync(configPath))
    throw new Error('No file exists at the given filepath.');
  // check if path is absolute
  if (path.resolve(configPath) !== configPath)
    throw new Error('Please specify an absolute filepath.')
  // Load config as string (parameter set to true)
  const config = await loadJsonString(configPath);
  console.log(config);
  const modelPathIn = JSON.parse(config).generate.forModel;
  const modelJson = await loadJson(reRootPath(modelPathIn));
  // Preprocess the config file
  const configJson = JSON.parse(parseTemplate(config, modelJson));
  // Deze moet vanuit de config folder of config file denken.
  // Assumption: config directory and model directory have same relative positions (logic is in rerootpath)
  const modelIterationJsonPaths: string[] = configJson.generate.forModelNodePaths;
  console.log(modelIterationJsonPaths);

  type templateInf = { outputNameFormat: string, inputTemplate: string }
  type temp = { modelJsonPath: string, elementIteratedOverName: string, templates: templateInf[] }
  // type temp2 = { jsonPath: string, schema: templateInf[] }
  // modelIterationJsonPaths.forEach((obj: temp) => {
  //   obj.templates.forEach((templateItem) => {
  //     const jsonResults = queryJson(modelJson, obj.modelJsonPath);
  //     jsonResults.forEach((jsonToUse) => {
  //       generateAndSave(templateItem.inputTemplate, JSON.parse(jsonToUse), templateItem.outputNameFormat);
  //     });
  //   });
    // console.log('results:' + results);
    // const resultsArray = jsonP({path: modelIterationJsonPath, modelJson});
  // })
}

function run() {
  const cliArguments = process.argv;
  cliCfgRunGenerate(cliArguments);
}

run();