const fst = require('fs');

exports.saveToFile = function saveToFile(targetPath: string, output: string): void {
    console.log(targetPath);

    // Flag w+ because we want to overwite a pre-existing output
    fst.writeFile(targetPath, output, { flag: 'w+' }, (err: Error) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written file has the following contents:");
            console.log(fst.readFileSync(targetPath, "utf8"));
        }
    });
}