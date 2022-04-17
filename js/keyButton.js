export default class KeyButton {

    constructor(x, y, w, h, id, keyType = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.keyType = keyType;
    }
}