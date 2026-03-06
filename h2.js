// Play Game Button
function playGame(){
  window.open("https://poki.com", "_blank");
}

/* ------------------------------
Interactive Spider-Man Background
------------------------------- */
const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Mouse position
let mouse = {x: width/2, y: height/2};
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Floating Spiders
class Spider{
  constructor(){
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random()*3 + 2;
    this.speedX = (Math.random()-0.5)*0.7;
    this.speedY = (Math.random()-0.5)*0.7;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x<0 || this.x>width) this.speedX*=-1;
    if(this.y<0 || this.y>height) this.speedY*=-1;
  }
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x,0);
    ctx.lineTo(this.x,this.y);
    ctx.strokeStyle="rgba(255,255,255,0.2)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle="red";
    ctx.fill();
  }
}

// Spider swinging from mouse
class SwingSpider{
  constructor(){
    this.x = width/2;
    this.y = 0;
    this.size = 20;
    this.angle = 0;
    this.radius = 150;
    this.speed = 0.02;
  }
  update(){
    this.angle += this.speed;
    this.x = mouse.x + Math.cos(this.angle) * this.radius;
    this.y = mouse.y + Math.sin(this.angle) * this.radius;
  }
  draw(){
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    ctx.lineTo(this.x,this.y);
    ctx.strokeStyle="white";
    ctx.lineWidth=2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle="red";
    ctx.shadowBlur=10;
    ctx.shadowColor="red";
    ctx.fill();
    ctx.shadowBlur=0;
  }
}

// Initialize
let spiders = [];
for(let i=0;i<50;i++) spiders.push(new Spider());
let swingSpider = new SwingSpider();

// Animation
function animate(){
  ctx.clearRect(0,0,width,height);

  // Background gradient glow
  let gradient = ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,width/1.5);
  gradient.addColorStop(0,'rgba(255,0,0,0.1)');
  gradient.addColorStop(1,'rgba(0,0,0,0.3)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,width,height);

  // Floating spiders
  spiders.forEach(s=>{
    s.update();
    s.draw();
  });

  // Swing spider
  swingSpider.update();
  swingSpider.draw();

  requestAnimationFrame(animate);
}

animate();