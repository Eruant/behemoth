import ajax from 'simple-ajax';
import dom from './dom';

class loader {

    constructor() {

        this.loaded = false;
        this.filesLoaded = 0;
        this.filesToLoad = 0;
        this.onLoadedCallback = null;
    }

    progress() {

        if (this.filesToLoad === 0) {
            this.loaded = true;
            return 1;
        } else if (this.filesLoaded === 0) {
            return 0;
        } else {
            return this.filesLoaded / this.filesToLoad;
        }

    }

    load(path, callback) {

        this.loaded = false;
        this.filesToLoad++;

        new ajax(path)
            .on('success', (event, data) => {
                callback('success', data);
            })
            .on('error', (event, message) => {
                callback('error', message);
            })
            .on('complete', () => {
                this.filesLoaded++;

                if (this.progress() === 1 && this.onLoadedCallback) {
                    this.onLoadedCallback();
                }
            })
            .send();
    }

    onLoaded(scope, callback) {
        this.onLoadedCallback = callback.bind(scope);
    }

}

export default new loader();
