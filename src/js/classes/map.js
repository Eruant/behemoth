class map {

    consructor(width = 10, height = 10, data = []) {

        this.width = width;
        this.height = height;
        this.data = data;

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
