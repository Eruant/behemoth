import map from './map';
import loader from '../modules/loader';

class levels {

    constructor() {

        this.maps = {};
    }

    add(options) {

        this.maps[options.name] = new map(options);
    }

    load(path) {

        var url = '/data/levels/' + path + '.json';

        loader.load(url, (type, data) => {
            if (type === 'success') {

                var map = JSON.parse(data);

                this.add(map);
            }
        });
    }

    triggerGates(map) {

        for (let i = 0, len = map.data.length; i < len; i++) {

            switch (map.data[i]) {
                case 'o':
                    map.data[i] = 'c';
                    break;
                case 'c':
                    map.data[i] = 'o';
                    break;
            }
        }
    }
}

export default levels;
