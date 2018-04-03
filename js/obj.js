function fireObj(){
	this.x;
	this.y;
	this.w = 20;
	this.h =20;
}
fireObj.prototype.init = function(){
	this.x = meX + (meW - this.w)/2;
	this.y = meY - this.h;
}
fireObj.prototype.draw = function(){
	this.y -= 10;
	if(this.y < 0 ){
		this.init();
	}
	ctx.drawImage(danPic1,this.x,this.y,this.w,this.h);
}
function drawFire(){
	if(!fire || !canfire){
		return false;
	}
	fire.draw();
}
function drawStar(){
	for(var i = 0; i < starsLen;i++){
		stars[i].update();
		stars[i].draw();
	}
}
function starObj(){
	this.x;
	this.y;
}
starObj.prototype.init = function(){
	this.x = Math.random() * cWidth;
	this.y = Math.random() * cHeight;
	this.ragX = 7;
	this.basetime = 0;
	this.picnum = 0;
	var arr = [-1,1];
	var randx = (parseInt(Math.random()*10)) % 2;
	var randy = (parseInt(Math.random()*10)) % 2;
	this.fangxiangX= arr[randx];
	this.fangxiangY= arr[randy];
}
starObj.prototype.update = function(){
	this.basetime += diftime;
	if(this.basetime > 80){
		this.picnum +=1;
		this.ragX = (this.picnum % 7) * 7;
		this.x += this.fangxiangX * this.basetime / 160 + Math.random() * 0.5;
		this.y += this.fangxiangY * this.basetime / 80 + Math.random() * 0.5;
		this.basetime = 0 ;
	}
	if(this.x > cWidth || this.y > cHeight || this.x < 0 || this.y < 0){
		this.init();
	}

}
starObj.prototype.draw = function(){

	ctx.drawImage(starPic, this.ragX, 0, 7, 7, this.x, this.y, 7, 7);
}

function enemyObj(){
	this.x;
	this.y;
	this.w = youW;
	this.h = youH;
}
enemyObj.prototype.init = function(){
	this.x = Math.random() * cWidth;
	this.y = - Math.random() * cHeight - 100 ;
	if(this.x > cWidth - this.w){
		this.x = cWidth - this.w
	}else if(this.x == 0){
		this.x = 0;
	}

}
enemyObj.prototype.draw =function(){
	ctx.drawImage(enemyPic1,this.x,this.y,this.w,this.h);
	this.y +=2;
	if(this.y > cHeight){
		this.init();
	}
}

function enemyDraw(){
	if(!canenemy){
		return false;
	}
	for(var i = 0; i < enemyLen;i++){
		enemys[i].draw();
		if(i == hitIndex){
			enemys[i].init();
		}
		
	}
	
}

function bomObj(){
	this.x;
	this.y;
	this.ragX;
	this.w = 128;
	this.h = 128;
	this.basetime;
}
bomObj.prototype.init = function(){
	this.basetime = 0;
	this.ragX = 0;
}
bomObj.prototype.draw = function(){
	this.basetime += diftime;
	if(this.basetime > 80){
		this.basetime = 0;
		if( this.ragX >= 400){
			this.ragX = 0;
		}else{
			this.ragX +=this.w;
		}
	}
	this.x = meX + (meW - this.w)/2;
	this.y = meY + (meH - this.h)/2; 
	ctx.drawImage(bomPic2, this.ragX, 0, this.w, this.h, this.x, this.y, this.w , this.h);
}

function hitObj(){
	this.x;
	this.y;
	this.ragX;
	this.w = 100;
	this.h = 125;
	this.basetime;
}
hitObj.prototype.init = function(){
	this.basetime = 0;
	this.ragX = 0;
}
hitObj.prototype.draw = function(x,y){
	this.basetime += diftime;
	if(this.basetime > 100){
		this.basetime = 0;
		if( this.ragX >= 400){
			this.ragX = 0;
		}else{
			this.ragX +=this.w;
		}
	}
	this.x = x + (youW - this.w)/2;
	this.y = y + (youH - this.h)/2; 
	ctx.drawImage(bomPic1, this.ragX, 0, this.w, this.h, this.x, this.y, this.w , this.h);
}