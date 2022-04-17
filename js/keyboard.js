import KeyButton from '../js/keyButton.js'
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = (w / 2);
    if (h < 2 * r) r = (h / 2);
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}



export default class Keyboard {
    keys = [];
    static keyNames = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", ''],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '', ''],
        ['', '', '', '', '', '', '', '', '.', '/', '', ''],
    ];
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        this.setKeyButtons();
        this.paint();
    }

    setKeyButtons() {
        this.fixDPI();
        let padding = 10;
        let stepX = Math.floor((this.canvas.width - padding * 5) / 12) - padding;
        let stepY = Math.floor(this.canvas.height / 4) - padding * 1.5;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 12; j++) {
                this.keys.push(new KeyButton(j * (stepX + padding) + padding * i * 2 + padding, i * (stepY + padding) + padding, stepX, stepY, Keyboard.keyNames[i][j]));
            }
        }

        this.keys.push(new KeyButton(2 * (stepX + padding) + padding * 3, stepY * 3 + padding * 5, stepX * 6, stepY, '⠀'));

    }

    getKeyButtonPosByID(id) {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i].id == id) {
                console.log('found');
                return i;
            }
        }
        return null;
    }


    setKeyColor(id, color = 'white') {
        let pos = this.getKeyButtonPosByID(id);
        if (!pos)
            return;
        let el = this.keys[pos];
        console.log(el);
        console.log(el.id);
        this.ctx.clearRect(el.x, el.y, el.w, el.h);
        this.drawButton(el, color);
    }

    paint() {
        this.ctx.font = ' 48px cursive';

        this.keys.forEach(el => {
            this.drawButton(el);
        });
    }

    drawButton(el, color = 'white') {
        this.ctx.fillStyle = `${color}`;
        this.ctx.lineWidth = 2;
        this.ctx.roundRect(el.x, el.y, el.w, el.h, 10).fill();
        this.ctx.roundRect(el.x, el.y, el.w, el.h, 10).stroke();
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(el.id, Math.floor(el.x + el.w / 2), Math.floor(el.y + el.h / 2));
    }


    fixDPI() {
        this.ratio = 4;
        // Math.ceil(window.devicePixelRatio);
        this.canvas.width = this.canvas.width * this.ratio;
        this.canvas.height = this.canvas.height * this.ratio;
        console.log(this.canvas.width);
        console.log(this.canvas.height);
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight}px`;
    }
}