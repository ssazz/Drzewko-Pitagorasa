var q = document.createElement('canvas'),
    c = q.getContext('2d'),
    w = q.width = window.innerWidth,
    h = q.height = window.innerHeight,
		m = 14,
    i = 7,
    k = 30;

document.body.appendChild(q);

function b() {
  c.save();
  c.fillRect(0, 0, w, h);
  c.translate(w / 2, h - 0);
  c.save();
  function p(a, o, d, l) {
    if(l <= i) {
      
      c.rotate(a);
      c.fillStyle = l == i ? 'green' : 'rgb(60, ' + 25 * l + ', 20)';
      if (d >= 1) c.fillRect(-d, -2 * d - o, 2 * d, 2 * d);
      c.translate(0,  -2 * d - o);
      
      a = Math.PI / 180 * k; // deg to rad

      // special mode
      //if ( l % 2 == 0 && l != 1) a = Math.PI/2 - a;
      
      
      if (d >= 1) {
        var m = Math.cos(a) * d,
            n = Math.sin(a) * d;
      }
      
			//l != i ? c.save() : c.restore();
			c[l != i ? 'save' : 'restore']();

      p(-a, n, m, l + 1);
      p(Math.PI / 2 - a, m, n, l + 1);
      
    } 
  } // p function end
  
  p(0, 0, h / 10, 1);
  c.restore();
  
} // b end

function sa(e) { return e / h * 90; }
q.addEventListener('touchmove', function(e) { 
  e.preventDefault();
  var o = e.changedTouches[0].pageY;
  k = sa(o);
  b();
}, false);

q.addEventListener('touchstart', function(e) { 
  e.preventDefault();
  var o = e.changedTouches[0].pageY;
  k = sa(o);
  b();
}, false);

q.addEventListener('mousemove', function() { 
  k = sa(event.clientY);
  b();
}, false);

window.addEventListener('keydown', function(e) {
switch (e.keyCode) {
	case 38: case 39:
		i = i<m ? ++i : m;
		b();
		break;
	case 37: case 40:
		i = i>1 ? --i : 1;
		b();
		break;
	}
}, false);

window.addEventListener('resize', function() {
	w = q.width = window.innerWidth;
	h = q.height = window.innerHeight;
	b();
}, false);

window.onload = b; 
