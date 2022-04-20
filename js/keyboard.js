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
        [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        ],
        [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
            ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
            ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э"],
            ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'],
        ]
    ];

    constructor(canvas, lang = 0) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        this.lang = lang;
        this.fixDPI();
        this.setKeyButtons(lang);
        this.paint();
    }

    changeKeyboard(lang) {
        this.lang = lang;
        this.setKeyButtons();
        this.clear();
        this.paint();
    }

    setKeyButtons() {
        console.log('lang', this.lang);
        this.keys = [];
        let padding = 10;
        let stepX = Math.floor((this.canvas.width) / 15) - padding;
        let stepY = stepX;
        // Math.floor(this.canvas.height / 4) - padding * 1.5;
        let startX = stepX + padding * 5;

        for (let i = 0; i < Keyboard.keyNames[this.lang].length; i++) {
            for (let j = 0; j < Keyboard.keyNames[this.lang][i].length; j++) {
                this.keys.push(new KeyButton(j * (stepX + padding) + padding + startX, i * (stepY + padding) + padding, stepX, stepY, Keyboard.keyNames[this.lang][i][j]));
            }
            startX += padding * 4;

        }
        this.ctx.font = `${Math.floor(this.keys[0].h/2)}px cursive`;
        this.keys.push(new KeyButton(stepX + padding + startX, stepY * 4 + padding * 5, stepX * 6, stepY, '⠀'));

    }

    getKeyButtonPosByID(id) {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i].id == id) {
                console.log('found: ', id);
                return i;
            }
        }
        return null;
    }


    setKeyColor(id, color = 'white') {
        let pos = this.getKeyButtonPosByID(id);
        if (pos == null)
            return;
        let el = this.keys[pos];
        console.log('setColor', el);
        console.log(el.id);
        this.ctx.clearRect(el.x, el.y, el.w, el.h);
        this.drawButton(el, color);
    }


    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    paint() {
        this.keys.forEach(el => {
            this.drawButton(el);
        });
    }

    drawButton(el, color = 'white') {
        this.ctx.fillStyle = `${color}`;
        this.ctx.lineWidth = 2;
        this.ctx.roundRect(el.x, el.y, el.w, el.h, Math.floor(el.h / 5)).fill();
        // this.ctx.roundRect(el.x, el.y, el.w, el.h, 1).stroke();
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