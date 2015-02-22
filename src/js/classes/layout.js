import dom from '../modules/dom';

class layout {

    constructor(width = 600, height = 400) {

        var canvas = dom.createElement('canvas'),
            ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        // render on pixels (not inbetween)
        ctx.translate(-0.5, -0.5);

        dom.load(function () {
            dom.add(canvas, 'body');
        });

        return {
            canvas: canvas,
            ctx: ctx
        };
    }
}

export default layout;
