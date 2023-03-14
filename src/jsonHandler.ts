import fs from 'fs';
// const jp = require('jsonpath');
import { JSONPath as jsonP } from 'jsonpath-plus';

function queryJson(data: JSON, targetPath: string, logResult = false): string[] {
  // path: $.generate.forModel
  const result = jsonP({ path: targetPath, json: data });
  if (logResult)
    console.log(result);
  return result;
}

//Loads file from a path.
//Used for loading the template and model files.
async function loadJson(filePath: string, logResult = false): Promise<JSON> {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    if (logResult) {
      console.log(data);
      console.log('\n type: ' + typeof data);
    }
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return JSON.parse("{}");
  }
}

async function loadJsonString(filePath: string, logResult = false): Promise<string> {
  return JSON.stringify(await loadJson(filePath));
}

export {
  queryJson, loadJson, loadJsonString
}