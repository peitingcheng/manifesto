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

    interact01();
    interact02();
    interact03();
    // interact04();
    interact06();
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
        this.showSideBoxes = false;
        this.rotationAngle = 0;
        this.showBubbles = false;
        this.bubblesList = [];
        this.showPages = false;
        this.pagesOpacity = 0;  // 新增透明度控制
        this.boxOpacity = 0;
        // this.isBoxOpen = false;
        // this.lidAngle = 0;
        this.showBlocks = false;
    }

    display() {
        push();
        translate(this.x, this.y, this.z);
        rotateY(frameCount * 0.01);
        stroke(this.hovered ? 0 : 255);
        fill(this.hovered ? 255 : 0, this.hovered ? 255 : 0, this.hovered ? 255 : 0, this.hovered ? 30 : 50);
        box(this.size, this.boxHeight, this.depth);
        
        if (this.showSideBoxes) {
            this.sideBoxes();
        }

        if (this.showBubbles) {
            this.bubbles();
        }

        if (this.showPages) {
            this.pages();
        }

        if (this.isBoxOpen) {
            this.openBox();
        }

        if (this.showBlocks) {
            this.blocks();
        }

        pop();
    }

    checkHover(mx, my) {
        // 簡單的滑鼠位置檢測
        let d = dist(mx - width/2, my - height/2, this.x, this.y);
        this.hovered = d < this.size;
        return this.hovered;
    }
    
    sideBoxes() {
        this.rotationAngle += 0.01;
        this.boxOpacity = min(this.boxOpacity + 2, 255);
        
        // 左側盒子
        push();
        translate(-this.size * 2, 0, 0);
        rotateY(this.rotationAngle);
        stroke(50, this.boxOpacity);
        fill(255, 255, 255, this.boxOpacity);
        box(this.size, this.boxHeight, this.depth);
        pop();

        // 右側盒子
        push();
        translate(this.size * 2, 0, 0);
        rotateY(this.rotationAngle);
        stroke(50, this.boxOpacity);
        fill(255, 255, 255, this.boxOpacity);
        box(this.size, this.boxHeight, this.depth);
        pop();

        // 連接虛線（左側）
        push();
        translate(-this.size, 0, 0);
        rotateZ(PI/2);
        fill(30, this.boxOpacity);
        cylinder(1, this.size * 2, 100);
        pop();

        // 連接虛線（右側）
        push();
        translate(this.size, 0, 0);
        rotateZ(PI/2);
        fill(30, this.boxOpacity);
        cylinder(1, this.size * 2, 100);
        pop();

        // 中央貫穿的 cylinder
        push();
        rotateZ(PI/2);
        fill(30, this.boxOpacity);
        cylinder(0.5, this.size * 2, 100);
        pop();
    }

    bubbles() {
        // 創建新的氣泡，限制在方塊內部
        if (frameCount % 10 === 0 && this.bubblesList.length < 50) {
            this.bubblesList.push({
                // 將 x, y, z 的範圍限制在方塊尺寸的一半之內
                x: random(-this.size/2, this.size/2),      // 限制在方塊寬度內
                y: this.boxHeight/2,                        // 從方塊頂部開始掉落
                z: random(-this.depth/2, this.depth/2),     // 限制在方塊深度內
                speed: random(0.5, 2),
                size: random(2, 8)
            });
        }

        // 更新和顯示所有氣泡
        for (let i = this.bubblesList.length - 1; i >= 0; i--) {
            let bubble = this.bubblesList[i];
            
            // 更新氣泡位置，向下移動
            bubble.y -= bubble.speed;  // 改為減法，使氣泡向下移動
            
            // 如果氣泡超出方塊底部，從數組中移除
            if (bubble.y < -this.boxHeight/2) {
                this.bubblesList.splice(i, 1);
                continue;
            }

            // 顯示氣泡
            push();
            translate(bubble.x, bubble.y, bubble.z);
            stroke(255);
            fill(255, 255, 255, 80);
            sphere(bubble.size);
            pop();
        }
    }

    pages() {
        // 逐漸增加透明度，最大值為255
        this.pagesOpacity = min(this.pagesOpacity + 5, 255);
        
        for (let i = 0; i < 4; i++) {
            push();
            translate(0, -this.boxHeight/2 - 20 - (i * 30), 0);
            rotateX(PI/2);
            stroke(255, this.pagesOpacity);  // 設置線條透明度
            fill(255, 255, 255, this.pagesOpacity);  // 設置填充透明度
            plane(100, 100);
            pop();
        }
    }

    // openBox() {
    //     // 逐漸增加蓋子打開的角度
    //     this.lidAngle = lerp(this.lidAngle, PI/2, 0.1);
        
    //     // 上蓋
    //     push();
    //     translate(0, -this.boxHeight/2, this.depth/2);
    //     rotateX(-this.lidAngle); // 使用動態角度
    //     translate(0, this.y, -this.depth/2);
    //     fill(255, 255, 255, 20);
    //     plane(this.size, this.depth/2);
    //     pop();
        
    //     // 左蓋
    //     push();
    //     translate(-this.size/2, -this.boxHeight/2, this.depth/2);
    //     rotateY(-this.lidAngle);
    //     translate(0, 0, -this.depth/2);
    //     fill(255, 255, 255, 20);
    //     plane(this.depth, this.boxHeight);
    //     pop();
        
    //     // 右蓋
    //     push();
    //     translate(this.size/2, -this.boxHeight/2, this.depth/2);
    //     rotateY(this.lidAngle);
    //     translate(0, 0, -this.depth/2);
    //     fill(255, 255, 255, 20);
    //     plane(this.depth, this.boxHeight);
    //     pop();
        
    //     // 前蓋
    //     push();
    //     translate(0, -this.boxHeight/2, this.depth);
    //     rotateX(this.lidAngle);
    //     translate(0, 0, -this.depth/2);
    //     fill(255, 255, 255, 20);
    //     plane(this.size, this.boxHeight/2);
    //     pop();
    // }

    blocks() {
        push();
        translate(0, -this.boxHeight/2, this.depth/2);
        rotateX(PI/2);
        fill(255, 255, 255, 20);
        box(this.size, this.depth/2);
        pop();
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

function interact01() {
    if (currentPage === 1 && boxes.hovered) {
        boxes.showSideBoxes = true;
    } else {
        boxes.showSideBoxes = false;
        boxes.boxOpacity = 0;  // 重置透明度
    }
}

function interact02() {
    if (currentPage === 2 && boxes.hovered) {
        boxes.showBubbles = true;
    } else {
        boxes.showBubbles = false;
    }
}

function interact03() {
    if (currentPage === 3 && boxes.hovered) {
        boxes.showPages = true;
    } else {
        boxes.showPages = false;
        boxes.pagesOpacity = 0;  // 當不顯示時重置透明度
    }
}

// function interact04() {
//     if (currentPage === 4 && boxes.hovered) {
//         boxes.isBoxOpen = true;
//     } else {
//         boxes.isBoxOpen = false;
//     }
// }

function interact06() {
    if (currentPage === 6 && boxes.hovered) {
        boxes.showBlocks = true;
    } else {
        boxes.showBlocks = false;
    }
}