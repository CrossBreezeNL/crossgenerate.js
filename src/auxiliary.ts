import fs from 'fs';
import path from 'node:path';

function saveToFile(targetPath: string, output: string): void {
    // Flag w+ because we want to overwite a pre-existing output
    // This function is async
    fs.writeFile(targetPath, output, { flag: 'w+' }, (err) => {
        if (err) {
            console.log(`Error writing to file at ${targetPath}:`);
            console.log(err);
            throw new Error(err.message)
        } else {
            console.log(`File written successfully ${targetPath}`);
        }
    });
}

function reRootPath (filePath: string): string {
    console.log('in: ' + filePath);
    /* inside the match(), the / marks the beginning and end of a regex literal */
    const regexresults: string[] = filePath.match(/models.*/) || [''];
    const result = path.resolve(regexresults[0]);
    console.log(regexresults[0]);
    return result;
}

export {
    saveToFile, reRootPath
}