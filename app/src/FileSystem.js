import fs from 'fs';
import readline from 'readline';

export class FileSystem {
    constructor(path) {
        this.path = path;
    }

    createReadStream() {
        const rs = fs.createReadStream(this.path);

        rs.on('error', () => {
            console.log('Error occured...');
        });

        return readline.createInterface(rs);
    }  
}