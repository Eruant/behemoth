import ajax from 'simple-ajax';

class loader {

    constructor() {

        this.loaded = 0;
        this.toLoad = 0;
    }

    progress() {

        if (this.toLoad === 0) {
            return 1;
        } else if (this.loaded === 0) {
            return 0;
        } else {
            return this.toLoad / this.loaded;
        }

    }

    load(path, callback) {

        this.toLoad++;

        new ajax(path)
            .on('success', (event, data) => {
                callback('success', data);
            })
            .on('error', (event, message) => {
                callback('error', message);
            })
            .on('complete', () => {
                this.loaded++;
            })
            .send();
    }
}

export default new loader();
