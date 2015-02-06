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

export default dom;
