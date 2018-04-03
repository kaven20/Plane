function check(A, B, C, D, E, F, G, H) {
  C += A, D += B, G += E, H += F;
  if (C <= E || G <= A || D <= F || H <= B){
    return [0, 0, 0, 0];
  }
  var tmpX, tmpY;
  if (E > A) {
   tmpX = G < C ? [E, G] : [E, C];
  } else {
   tmpX = C < G ? [A, C] : [A, G];
  }
  if (F > B) {
   tmpY = H < D ? [F, H] : [F, D];
  } else {
   tmpY = D < H ? [B, D] : [B, H];
  }
  return [tmpX[0], tmpY[0], tmpX[1], tmpY[1]];
}



window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();