
export class Logger {
    static log(msg, format = false) {
        let output;
        if (format) {
            let date = new Date();
            let dateTimeString = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
            output = `[${dateTimeString}][LOG]: ${msg}`;
        } else {
            output = msg;
        }
        console.log(output);
    }
}