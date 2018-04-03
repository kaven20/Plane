var c, ctx;
var colorArr = ["#fb5074","#fca2fb","#8fe3fe","#72fbac","#acfb72","#f0fb72"];
var starPic = new Image();
var mePic = new Image();
var enemyPic1 = new Image();
var enemyPic2 = new Image();
var danPic1 = new Image();
var bomPic1 = new Image();
var bomPic2 = new Image();
var cWidth = 320;
var cHeight = 460;
var stars = [];
var starsLen = 20;
var lastTime, diftime;
var meW = 80;
var meH = 52;
var youW = 36;
var youH = 42;
var meX,meY;
var hX,hfX;
var fire;
var canfire;
var enemys = [];
var enemyLen = 4;
var canenemy;
var bom, meIsDie;
var meObj,danObj,youObj;
var hitIndex;
var hit;
var gameover;
window.onload = function(){
	init();
	gameloop();
	var btn = document.getElementById('btn');
	btn.onclick = function(){
		init();
	}
}
function init(){
	gameover =document.getElementById("gameover");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	starPic.src = "images/star.png";
	mePic.src = "images/me.png";
	enemyPic1.src = "images/enemy.png";
	enemyPic2.src = "images/enemy.png";
	bomPic1.src = "images/bom1.png";
	bomPic2.src = "images/bom2.png";
	danPic1.src = "images/dan1.png"
	meX = (cWidth - meW) /2;
	meY = cHeight - meH;
	canfire = false;
	canenemy = false;
	meIsDie = false;
	hitIndex = -1; 
	lastTime = Date.now();
	diftime = 0;
	for(var i = 0; i < starsLen;i++){
		stars[i] = new starObj();
		stars[i].init();
	}
	for(var i = 0; i < enemyLen;i++){
		enemys[i] = new enemyObj();
		enemys[i].init();
	}
	fire = new fireObj();
	fire.init();
	bom = new bomObj();
	bom.init();
	hit = new hitObj();
	hit.init();
	c.addEventListener('touchstart', handStart);
	c.addEventListener('touchmove', handMove);
	c.addEventListener('touchend', handEnd);
	c.onmousedown=function(evt){
		handStart(evt);
		this.onmousemove = function(evt){
			handMove(evt);
		}
		this.onmouseup = function(){
			this.onmousemove=null;
			this.onmouseup=null;
			handEnd();	
		}
	}
	gameover.style.display = "none";
}
function drawBg(){
	var my_gradient = ctx.createLinearGradient(0,0,0,cHeight);
	my_gradient.addColorStop(0,"#09023d");
	my_gradient.addColorStop(1,"#000000");
	ctx.fillStyle = my_gradient;
	ctx.fillRect(0,0,cWidth,cHeight);
}
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now()
	diftime = now - lastTime;
	lastTime = now;
	drawBg();
	drawStar();
	drawMe();
	drawFire();
	enemyDraw();
	meDie();
	hitDie();
}
function drawMe(){
	if(meIsDie){
		return false;
	}
	ctx.drawImage(mePic,meX,meY,meW,meH);
}

function handStart(evt){
	evt.preventDefault();
	canenemy = true;
	canfire = true;
	hfX = 0;
	if(evt.targetTouches){
		hX = evt.targetTouches[0].pageX;
	}else{
		 var evt=evt||event;
		 hX = evt.clientX;
	}
}
var handMove = function(evt){
	evt.preventDefault();
	if(evt.targetTouches){
		hfX = evt.targetTouches[0].pageX - hX;
		hX = evt.targetTouches[0].pageX
	}else{
		var evt=evt||event;
		hfX = evt.clientX - hX;
		hX = evt.clientX;
	}
	if(meX + hfX >0 && meX + hfX < cWidth - meW){
		meX += hfX;
	}
}
var handEnd = function(){
	canfire = false;
}

function meDie(){
	for(var i = 0; i < enemyLen;i++){
		var rect = check(meX, meY, meW, meH, enemys[i].x, enemys[i].y, enemys[i].w, enemys[i].h);
		var meDie = (rect[2] - rect[0]) * (rect[3] - rect[1]);
		if(meDie > 15){
			meIsDie = true;
			bom.draw();
			canfire = false;
			setTimeout(function(){gameover.style.display = "block";},1000);
		}
	}
}

function hitDie(){
	for(var i = 0; i < enemyLen;i++){
		var rect = check(fire.x, fire.y, fire.w, fire.h, enemys[i].x, enemys[i].y, enemys[i].w, enemys[i].h);
		var hitDie = (rect[2] - rect[0]) * (rect[3] - rect[1]);
		if(hitDie > 24){
			var theX= enemys[i].x;
			var theY= enemys[i].y;
			hit.draw(theX,theY);
			hitDie = true;
			hitIndex = i;
			fire.init();
			break;
		}
	}
}
