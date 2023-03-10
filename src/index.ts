const Mustache = require('mustache');
const fs = require('fs');
const { saveToFile, reRootPath } = require('./auxiliary');
const { loadJson, queryJson } = require('./jsonHandler')

// const templateFilePath = './templates/CreateDatabase.mst';
// const modelFilePath = './model/example-source.json';
const outFilePath = './out/result.txt';

var cliArguments = process.argv;

//Given a model and a template we parse a mustache template
//We are using a wrapper to decouple template engine from generation later.
function parseTemplate(template: string, model: Object): string {
  return Mustache.render(template, model);
};

async function generateFromTemplate(template: string, modelFilePath: string) {
  let model = JSON.parse(await loadJson(modelFilePath));
  saveToFile(outFilePath, parseTemplate(template, model));
};

async function cliCfgRunGenerate(cliArgs: string[]) {
  for(const argument of cliArguments)
    console.log("arg: " + argument);
  const cfgPath = `./configs/${cliArguments[2]}`;
  const configJson = await loadJson(cfgPath);

  // Deze moet vanuit de config folder of config file denken.
  // Assumption: config file and model file have same relative positions (logic is in rerootpath)
  const modelPathIn = queryJson(configJson, '$.generate.forModel');
  
  const modelJson = await loadJson(reRootPath(modelPathIn[0]) );
  const modelIterationJsonPath = queryJson(configJson, 'generate/forModelNodePaths');
  console
  // const resultsArray = jsonP({path: modelIterationJsonPath, modelJson});
};

cliCfgRunGenerate(cliArguments);