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

    loadAjax(path, callback) {

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

    loadImg(path, callback) {

        this.loaded = false;
        this.filesToLoad++;

        var img = new Image();

        img.onload = () => {
            this.filesLoaded++;

            if (this.progress() === 1 && this.onLoadedCallback) {
                this.onLoadedCallback();
            }

            if (typeof callback === 'function') {
                callback();
            }
        };
        img.src = path;

        return img;

    }

    onLoaded(scope, callback) {
        this.onLoadedCallback = callback.bind(scope);
    }

}

export default new loader();
