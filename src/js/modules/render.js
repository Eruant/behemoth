import settings from '../settings.json';
import loader from './loader';

class render {

    constructor() {

        this.scale = [1, 1];
        this.tileset = loader.loadImg('img/tileset.png');
    }

    setDimentions(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 32;
    }

    setScale(tilesX, tilesY) {

        var maxTileWidth = this.width / tilesX,
            maxTileHeight = this.height / tilesY;

        this.tileSize = (maxTileWidth > maxTileHeight) ? maxTileHeight : maxTileWidth;

    }

    drawTile(ctx, x, y, type = 0) {

        var size = 16,
            sx = size * type,
            sy = 0,
            sw = size,
            sh = size,
            dx = x,
            dy = y,
            dw = this.tileSize,
            dh = this.tileSize;

        ctx.drawImage(this.tileset, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    drawLoader(ctx, progress) {

        this.clearLoader(ctx);

        ctx.fillStyle = 'hsl(270, 50%, 60%)';
        ctx.strokeStyle = 'hsl(270, 50%, 60%)';
        ctx.save();
        ctx.translate(this.width * 0.5, this.height * 0.5);
        ctx.strokeRect(-50, -5, 100, 10);
        ctx.fillRect(-50, -5, Math.floor(progress * 100), 10);
        ctx.restore();

    }

    clearLoader(ctx) {

        ctx.save();
        ctx.translate(this.width * 0.5, this.height * 0.5);
        ctx.clearRect(-51, -6, 102, 12);
        ctx.restore();
    }

    drawMap(ctx, map) {

        this.setScale(map.width, map.height);

        var x = 0,
            y = 0;

        for (let i = 0, len = map.data.length; i < len; i++) {

            switch (map.data[i]) {
                case 'X':
                      //this.drawTile(ctx, x, y, 0);
                      break;
                case 'c':
                      this.drawTile(ctx, x, y, 0);
                      break;
                case 'o':
                      this.drawTile(ctx, x, y, 1);
                      break;
                default:
                      this.drawTile(ctx, x, y, 1);
            }

            if (i % map.width === map.width - 1) {
                x = 0;
                y += this.tileSize;
            } else {
                x += this.tileSize;
            }
        }

    }

    drawMobs(ctx, mobs, map) {

        this.setScale(map.width, map.height);


        var mobSize = this.tileSize * 0.7,
            padding = (this.tileSize - mobSize) * 0.5;

        // draw each mob
        for (let i = 0, len = mobs.length; i < len; i++) {

            let mob = mobs[i],
                lastX = mob.position.x,
                lastY = mob.position.y;

            // draw head
            ctx.save();
            ctx.translate(
                mob.position.x * this.tileSize + (this.tileSize * 0.5),
                mob.position.y * this.tileSize + (this.tileSize * 0.5)
            );
            ctx.rotate(mob.rotation);
            ctx.translate(-(this.tileSize * 0.5), -(this.tileSize * 0.5));
            ctx.fillStyle = 'hsl(' + mob.color + ', 50%, 60%)';
            ctx.fillRect(padding, padding, mobSize, mobSize);
            this.drawTile(ctx, 0, 0, 2);
            ctx.restore();

            // draw each body part
            for (let j = 0, jLen = mob.bodyParts.length; j < jLen; j++) {

                let part = mob.bodyParts[j];
                let last = (j + 1 === jLen) ? true : false;

                if (lastX === part.x && lastY === part.y) {
                    break;
                }

                ctx.save();
                ctx.translate(part.x * this.tileSize, part.y * this.tileSize);
                if (last) {
                    ctx.fillStyle = 'hsl(' + this.addColorValue(mob.color, 40) + ', 50%, 60%)';
                } else {
                    ctx.fillStyle = 'hsl(' + this.addColorValue(mob.color, 20) + ', 50%, 60%)';
                }
                ctx.fillRect(padding, padding, mobSize, mobSize);
                this.drawTile(ctx, 0, 0, 3);
                ctx.restore();

                lastX = part.x;
                lastY = part.y;

            }

        }

    }

    addColorValue(original, difference) {

        var newValue = original + difference;

        if (newValue > 360) {
            newValue -= 360;
        }

        return newValue;
    }

    drawCountdown(ctx, number) {
      ctx.fillStyle = 'hsl(0, 30%, 90%)';
      ctx.font = '100px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText(number, settings.width * 0.5, settings.height * 0.5);
    }
}

export default new render();
