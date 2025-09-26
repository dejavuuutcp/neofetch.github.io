const c = document.getElementById("canvas"), ctx = c.getContext("2d");
c.width = innerWidth; c.height = innerHeight;

let info = [
  "dejavu@localhost","-----------------","OS: NixOS i686","Kernel: 6.9.7",
  "Uptime: inf","Packages: 1874","Shell: bash 5.2","Resolution: 800x600",
  "DE: none","WM: sway","WM Theme: default","Terminal: xterm",
  "CPU: Intel Atom N270 @1.6GHz","GPU: Intel GMA 950","RAM: 512MiB / 1GiB",
  "Local IP: 81.99.201.42"
];

let logo = new Image();
logo.src = "i01_2.png";
logo.onload = () => typeCmd("neofetch", draw);

function typeCmd(cmd, cb) {
  let p="dejavu@localhost:~$ ", s="", i=0, b=true;
  let t=setInterval(()=>{
    s=cmd.slice(0,i);
    ctx.fillStyle="#000"; ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle="#fff"; ctx.font="20px 'Courier New', monospace";
    ctx.fillText(p+s+(b?"_":""),40,40);
    b=!b; i<=cmd.length ? i++ : (clearInterval(t), cb());
  },150);
}

function draw() {
  let x0=40,y0=80,s=500;
  ctx.filter="grayscale(100%)"; ctx.drawImage(logo,x0,y0,s,s); ctx.filter="none";
  ctx.fillStyle="#fff"; ctx.font="18px 'Courier New', monospace";
  info.forEach((line,i)=> ctx.fillText(line,x0+s+30,y0+i*22));
}
