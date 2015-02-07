import map from './map';
import loader from '../modules/loader';

class levels {

    constructor() {

        this.maps = {};
    }

    add(name, width, height, data) {

        this.maps[name] = new map(width, height, data);
    }

    load(path) {

        var url = '/data/levels/' + path + '.json';

        loader.load(url, (type, data) => {
            if (type === 'success') {

                var map = JSON.parse(data);

                this.add(map.name, map.width, map.height, map.data);
            }
        });
    }
}

export default levels;
