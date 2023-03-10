const fs = require('fs');
const path = require('node:path');

exports.saveToFile = function saveToFile(targetPath: string, output: string): void {
    // Flag w+ because we want to overwite a pre-existing output
    // This function is async
    fs.writeFile(targetPath, output, { flag: 'w+' }, (err: Error) => {
        if (err) {
            console.log(`Error writing to file at ${targetPath}:`);
            console.log(err);
        } else {
            console.log(`File written successfully ${targetPath}`);
        }
    });
}

exports.reRootPath = function reRootPath (filePath: string): string {
    /* inside the match(), the / marks the beginning and end of a regex literal */
    const regexresult = filePath.match(/models[/\\].*/) || [''];
    console.log('regexresult: ' + regexresult[0]);
    const result = path.resolve(regexresult[0]);
    console.log(result);
    return result;
}