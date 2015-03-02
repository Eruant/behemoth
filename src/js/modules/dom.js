var _window = window,
    _document = _window.document,
    dom = {};

dom.createElement = function (type) {
    return _document.createElement(type);
};

dom.load = function (callback) {
    _window.onload = callback;
};

dom.add = function (element, selector) {
    _document.querySelector(selector).appendChild(element);
};

dom.requestAnimationFrame = function (callback, scope) {
    _window.requestAnimationFrame(callback.bind(scope));
};

dom.eventListener = function (scope, add, type, callback) {
    if (add === true) {
        _window.addEventListener(type, callback.bind(scope), false);
    } else {
        _window.removeEventListener(type);
    }
};

dom.setTimeout = function (callback, delay) {
    _window.setTimeout(() => {
        callback();
    }, delay);
};

dom.saveStorage = function (key, value) {

    _window.localStorage.setItem(key, JSON.stringify(value));
};

dom.loadStorage = function (key) {
    let item = _window.localStorage.getItem(key);

    return JSON.parse(item);
};

dom.setStyles = function () {

    var body = _document.querySelector('body');

    body.style.backgroundColor = 'hsl(90, 40%, 40%)';
    body.style.textAlign = 'center';

};

dom.reload = function () {
    _window.location.reload();
};

export default dom;
