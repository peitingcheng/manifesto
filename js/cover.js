let boxes;
let currentPage = 0;
const totalPages = 9;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    boxes = new Box(100, 100, 100, 0, 0, 0);
}

function draw() {
    background(0,0,0,0);
    camera(0, -150, 800);
    boxes.display(); 
    orbitControl();
    cursor(boxes.hovered ? HAND : ARROW);
}

function windowResized() {
    // 當視窗大小改變時，重新設置畫布大小
    resizeCanvas(windowWidth, windowHeight);
}

class Box {
    constructor(size, boxHeight, depth, x, y, z) {
        this.size = size;
        this.boxHeight = boxHeight;
        this.depth = depth;
        this.x = x;
        this.y = y;
        this.z = z;
        this.hovered = false;
    }

    display() {
        push();
        translate(this.x, this.y, this.z);
        rotateY(frameCount * 0.01);
        stroke(this.hovered ? 0 : 255);
        fill(this.hovered ? 255 : 0);
        box(this.size, this.boxHeight, this.depth);
        pop();
    }

    checkHover(mx, my) {
        // 簡單的滑鼠位置檢測
        let d = dist(mx - width/2, my - height/2, this.x, this.y);
        this.hovered = d < this.size;
        return this.hovered;
    }
}

function mouseMoved() {
    boxes.checkHover(mouseX, mouseY);
}

function mouseClicked() {
    if (boxes.hovered) {
        currentPage = (currentPage + 1) % totalPages;
        const targetPage = document.getElementById(`page-${String(currentPage).padStart(2, '0')}`);
        targetPage.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}