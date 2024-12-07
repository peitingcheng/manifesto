let boxes = []

function setup() {
    // 創建全屏畫布
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    boxes = new Box(100, 100, 100, 0, 0, 0);
  }
  
  function draw() {
    background(0);
    camera(0, -150, 800);
    boxes.display(); 
    orbitControl();
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
    }

    display() {
        push();
        translate(this.x, this.y, this.z);
        rotateY(frameCount * 0.01);
        stroke(255);
        fill(0);
        //translate(this.size / 2, -this.boxHeight / 2, -this.depth / 2);
        box(this.size, this.boxHeight, this.depth);
        pop();
    }
  }
