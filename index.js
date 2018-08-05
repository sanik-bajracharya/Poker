
import { FileSystem } from './app/src/FileSystem';
import { Poker } from './app/src/Poker';
import { Validation } from './app/src/Validation';

let inputFilePath;

process.argv.forEach(function (val, index) {
    if (index === 2) {
        inputFilePath = val;
    }
});

const fs = new FileSystem(inputFilePath);
const rl = fs.createReadStream();

rl.on('line', (line) => {
    let refinedLine = line.trim().replace(/\s\s+/g, ' ').toUpperCase();
    let gPoker = new Poker(refinedLine, new Validation(refinedLine));
    gPoker.start();
});



