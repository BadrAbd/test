const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let origin;
let mouse = { x: 0, y: 0 };
let time = 0;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    scale(s) {
        return new Vector(this.x * s, this.y * s);
    }
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    origin = new Vector(width / 2, height / 2);
}

window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Initial mouse position at center to prevent jumping
mouse.x = width / 2;
mouse.y = height / 2;

function polar(rad, time) {
    rad += Math.sin(time / 100);
    // Heart equation
    let x = 16 * Math.sin(rad) ** 3;
    let y = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);

    // Scale pulsation
    let scale = (Math.sin(time / 10) + 3) * 4;

    // Create vector from heart coordinates
    let p = new Vector(x * scale, -y * scale);

    // Mouse interaction vector
    // origin + (mouse - origin) * 0.5
    let mouseVector = new Vector(mouse.x, mouse.y);
    let offset = origin.add(mouseVector.subtract(origin).scale(0.5));

    return p.add(offset);
}

function animate() {
    time += 0.1; // Increment time

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = "#d32f2f";
    ctx.fillStyle = "#ff6b6b";
    ctx.lineWidth = 2;

    // Draw the heart shape by iterating radians
    for (let i = 0; i <= Math.PI * 2; i += 0.05) {
        let v = polar(i, time);
        if (i === 0) {
            ctx.moveTo(v.x, v.y);
        } else {
            ctx.lineTo(v.x, v.y);
        }
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(animate);
}

animate();
