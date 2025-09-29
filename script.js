// fuck it global vars everywhere1
const c = document.getElementById("c");
const ctx = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;
const icons = ["1.ico", "2.ico", "3.ico"];
let i = 0;
const title = "console";
const glitch = "!@#$%^&*<>?/\\|12345";
let chars = title.split("");
let img = new Image();
let cmd = null;
let titleInterval = null;
let iconInterval = null;
let info = [
  "User:               dejavu@localhost",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "Operating System:   NixOS i686",
  "Sys:                quota exceeded",
  "Kernel Version:     6.9.7",
  "Uptime:             17 year",
  "Installed Packages: 1874",
  "Shell:              bash 5.2",
  "Screen Resolution:  800x600",
  "Terminal Emulator:  xterm",
  "CPU:                Intel Atom N270 @ 1.6GHz",
  "GPU:                Intel GMA 950",
  "RAM Usage:          128MiB / 512MiB",
  "Local IP:           81.99.201.42", //omg real ip?????
  "GMod:               /home/deja/.steam/steam/steamapps/common/GarrysMod"
];

img.src = "i01_2.png";
img.onload = () => type("neofetch", draw);

function type(text, cb) {
  let p = "dejavu@localhost:~$ ";
  let s = "";
  let idx = 0;
  let blink = true;
  
  let t = setInterval(() => {
    s = text.slice(0, idx);
    
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, c.width, 60);
    
    ctx.fillStyle = "#fff";
    ctx.font = "20px 'Courier New', monospace";
    ctx.fillText(p + s + (blink ? "_" : ""), 40, 40);
    
    blink = !blink;
    if (idx <= text.length) {
      idx++;
    } else {
      clearInterval(t);
      cmd = p + text;
      cb && cb();
    }
  }, 150);
}

let lastDrawTime = 0;
function draw() {
  const now = Date.now();
  if (now - lastDrawTime < 16) return; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~60fps
  lastDrawTime = now;
  
  let x = 40, y = 80, sz = 500;
  
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, c.width, c.height);
  
  if (cmd) {
    ctx.fillStyle = "#fff";
    ctx.font = "20px 'Courier New', monospace";
    ctx.fillText(cmd, x, 40);
  }
  
  if (img.complete && img.naturalWidth > 0) {
    ctx.filter = "grayscale(100%)";
    ctx.drawImage(img, x, y, sz, sz);
    ctx.filter = "none";
  }
  
  ctx.fillStyle = "#fff";
  ctx.font = "18px 'Courier New', monospace";
  info.forEach((line, idx) => {
    ctx.fillText(line, x + sz + 30, y + idx * 22);
  });
}

let titleCache = title;
function fuckWithTitle() {
  if (Math.random() < 0.7) return;
  
  let newTitle = "";
  for (let j = 0; j < chars.length; j++) {
    if (Math.random() < 0.3) {
      newTitle += glitch[Math.floor(Math.random() * glitch.length)];
    } else {
      newTitle += chars[j];
    }
  }
  
  if (newTitle !== titleCache) {
    document.title = newTitle;
    titleCache = newTitle;
  }
}

function nextIcon() {
  const fav = document.getElementById("fav");
  if (fav) {
    fav.href = icons[i];
    i = (i + 1) % icons.length;
  }
}

titleInterval = setInterval(fuckWithTitle, 500);
iconInterval = setInterval(nextIcon, 1000);

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    c.width = innerWidth;
    c.height = innerHeight;
    if (cmd) draw();
  }, 100);
});

window.addEventListener("beforeunload", () => {
  clearInterval(titleInterval);
  clearInterval(iconInterval);
  clearTimeout(resizeTimeout);
});

class music {
  constructor() {
    this.a = document.getElementById("music");
    this.b = document.getElementById("btn");  
    this.v = document.getElementById("vol");
    this.p = document.getElementById("pct");
    
    if (!this.a || !this.b || !this.v || !this.p) return;
    
    this.setup();
  }
  
  setup() {
    this.a.volume = 0.2;
    this.updatePct();
    
    this.b.onclick = () => this.toggle();
    this.v.oninput = () => this.changeVol();
    this.a.onended = () => this.updateBtn();
    this.a.onplay = () => this.updateBtn();  
    this.a.onpause = () => this.updateBtn();
    
    this.a.onerror = () => {
      this.b.disabled = true;
      this.b.textContent = "holyshit111";
    };
  }
  
  toggle() {
    if (this.a.paused) {
      this.a.play().catch(e => console.log("autoplay blocked, deal with it"));
    } else {
      this.a.pause();
    }
  }
  
  changeVol() {
    this.a.volume = parseFloat(this.v.value);
    this.updatePct();
  }
  
  updateBtn() {
    this.b.textContent = this.a.paused ? "Play" : "Pause";
  }
  
  updatePct() {
    this.p.textContent = Math.round(this.a.volume * 100) + "%";
  }
  
  adjustVol(delta) {
    let newVol = Math.max(0, Math.min(1, this.a.volume + delta));
    this.a.volume = newVol;
    this.v.value = newVol;
    this.updatePct();
  }
}

const player = new music();

let lastKeyTime = 0;
document.addEventListener("keydown", (e) => {
  const now = Date.now();
  if (now - lastKeyTime < 50) return;
  lastKeyTime = now;
  
  switch(e.code) {
    case "Space":
      e.preventDefault();
      if (player) player.toggle();
      break;
    case "ArrowUp":
      if (player) player.adjustVol(0.05);
      break; 
    case "ArrowDown":
      if (player) player.adjustVol(-0.05);
      break;
  }
});


