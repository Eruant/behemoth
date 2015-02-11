import map from './map';
import loader from '../modules/loader';
import mob from './mob';

class levels {

    constructor() {

        this.maps = {};
        this.currentMap = null;
    }

    add(options) {

        this.maps[options.name] = new map(options);

        this.maps[options.name].mobs = [];
        for (let i = 0, len = options.mobs.length; i < len; i++) {

            let mobData = options.mobs[i];

            let position = {
                x: parseInt(mobData.position.x, 10),
                y: parseInt(mobData.position.y, 10)
            };

            let direction = {
                x: parseInt(mobData.direction.x, 10),
                y: parseInt(mobData.direction.y, 10)
            };

            this.maps[options.name].mobs.push(new mob(position, direction));
        }
    }

    setMap(name) {
        this.currentMap = name;
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

    updateMobs() {

        for (let i = 0, len = this.maps[this.currentMap].mobs.length; i < len; i++) {
            this.updateMob(this.maps[this.currentMap].mobs[i]);
        }
    }

    updateMob(mob) {

        var map = this.maps[this.currentMap],
            nextPosition = mob.getNextPosition(),
            nextMapKey = map.getKeyForCoordinates(nextPosition),
            nextMapValue = map.data[nextMapKey];

        if (nextMapValue.match(/[\.o]/)) {
            mob.setPosition(nextPosition);
        } else {
            mob.rotate();
            nextPosition = mob.getNextPosition();
            nextMapKey = map.getKeyForCoordinates(nextPosition);
            nextMapValue = map.data[nextMapKey];

            if (nextMapValue.match(/[\.o]/)) {
                mob.setPosition(nextPosition);
            } else {
                mob.rotate();
                mob.rotate();
                nextPosition = mob.getNextPosition();
                nextMapKey = map.getKeyForCoordinates(nextPosition);
                nextMapValue = map.data[nextMapKey];

                if (nextMapValue.match(/[\.o]/)) {
                    mob.setPosition(nextPosition);
                } else {
                    console.warn('mob stuck');
                }
            }
        }
    }

}

export default levels;
