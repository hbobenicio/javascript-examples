const stream = require('stream');

class Base64WritableStream extends stream.Writable {
    constructor(props) {
        super(props);

        this.data = [];
        this.base64 = null;

        this._write = this._write.bind(this);
        this._final = this._final.bind(this);
    }

    /**
     * https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback_1
     */
    _write(chunk, encoding, callback) {
        this.data.push(chunk);
        callback();
    }

    _final(callback) {
        this.base64 = Buffer.concat(this.data).toString('base64');
        this.data = null;
        callback();
    }
}

function promisify(base64WritableStream) {
    return function(writeCallback) {
        return new Promise(function(resolve, reject) {
            base64WritableStream.on('finish', function(){
                resolve(base64WritableStream.base64);
            });
            base64WritableStream.on('error', reject);

            writeCallback(base64WritableStream);

            base64WritableStream.end();
        });
    }
}

module.exports = {
    Base64WritableStream,
    promisify,
};
