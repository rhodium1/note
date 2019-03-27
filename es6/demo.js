class Point{
    constructor() {
        console.log(new.target);
    }
}
let p = new Point();
