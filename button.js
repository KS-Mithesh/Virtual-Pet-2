class Button{
    constructor(text,x,y,fn) {
        this.button = createButton(text);
        this.x  = x;
        this.y  = y;
        this.fn = fn;
    }

    display() {
        this.button.position(this.x,this.y);
        this.button.mousePressed(this.fn);
    }
}
