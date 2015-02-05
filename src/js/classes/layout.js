class layout {

    constructor(width = 600, height = 400) {

        var canvas = window.document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        // TODO attach to body

        return {
            canvas: canvas,
            ctx: ctx
        };
    }
}

export default layout;
