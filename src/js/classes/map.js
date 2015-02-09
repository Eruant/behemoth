class map {

    constructor(options) {

        this.width = options.width;
        this.height = options.height;
        this.data = options.data;
        this.mobs = options.mobs;

        // TODO deal with mobs
    }

    getCoordinatesForKey(key) {

        return {
            x: (key === 0) ? 0 : Math.floor(key / this.width),
            y: (key === 0) ? 0 : key % this.width
        };
    }

    getKeyForCoordinates(coordinates) {
        return (coordinates.y * this.width) + coordinates.x;
    }

    isKeyValid(key) {
        return (key > 0) && (key <= this.data.length);
    }

    isCoordinatesValid(coordinates) {

        var isXValid = (coordinates.x >= 0 && coordinates.x < this.width),
            isYValid = (coordinates.y >= 0 && coordinates.y < this.height);

        return isXValid && isYValid;
    }

}

export default map;
