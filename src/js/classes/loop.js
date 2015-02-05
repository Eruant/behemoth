var _private = {};

class loop {

    constructor(frameTime = (1000 / 60), update = null, draw = null) {
        _private.frameTime = frameTime;
        _private.pause = true;
        _private.update = update;
        _private.draw = draw;
    }

    start() {
        _private.pause = false;
        _private.startTime = new Date().getTime();
        _private.timeSinceLastUpdate = 0;

        this.tick(0);
    }

    stop() {
        _private.pause = true;
    }

    isRunning() {
        return _private.pause;
    }

    tick(timestamp) {
        if (_private.pause) {
            return;
        }

        var timePassed = new Date().getTime() - _private.startTime,
            delta = timestamp - timePassed;

        _private.timeSinceLastUpdate += delta;

        if (_private.timeSinceLastUpdate > _private.frameTime) {
            if (_private.update !== null) {
                _private.update();
            }
            _private.timeSinceLastUpdate = 0;
        }

        if (_private.draw !== null) {
            _private.draw();
        }

        window.requestAnimationFrame(this.tick.bind(this));
    }

}

export default loop;
