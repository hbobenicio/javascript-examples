const { Base64WritableStream, promisify } = require('./base64Stream');

const writer = new Base64WritableStream();
const asyncWriter = promisify(new Base64WritableStream());

writer.on('finish', function onFinish() {
    console.log('Base64:', writer.base64);
});
writer.on('error', function onError(err) {
    console.error('error:', err);
});

writer.write('a');
writer.write('b');
writer.write('c');
writer.end();

asyncWriter(w => {
    w.write('x');
    w.write('y');
    w.write('z');
}).then(base64 => {
    console.log('Async Base64:', base64);
}).catch(err => {
    console.error('asyncWriter error:', err);
});
