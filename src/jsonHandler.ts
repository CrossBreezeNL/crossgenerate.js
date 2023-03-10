const fs = require('fs');
// const jp = require('jsonpath');
const { JSONPath: jsonP } = require('jsonpath-plus');

function queryJson(data: object, targetPath: string, logResult = false): string[] {
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
};

exports.queryJson = queryJson;
exports.loadJson = loadJson;