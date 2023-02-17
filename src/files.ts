const fst = require('fs');

exports.saveToFile = function saveToFile(targetPath: string, output: string): void {
    // Flag w+ because we want to overwite a pre-existing output
    // This function is async, which makes it suitable for
    fst.writeFile(targetPath, output, { flag: 'w+' }, (err: Error) => {
        if (err) {
            console.log(`Error writing to file at ${targetPath}:`);
            console.log(err);
        } else {
            console.log(`File written successfully ${targetPath}`);
        }
    });
}