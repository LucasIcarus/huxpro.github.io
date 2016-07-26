// Element to move, time in ms to animate
const scroll = function (offset, duration, callback) {
	var e = document.documentElement;
	if(e.scrollTop===0){
		var t = e.scrollTop;
		++e.scrollTop;
		e = t+1===e.scrollTop--?e:document.body;
	}
	scrollToC(e, e.scrollTop, offset, duration);
	callback();
};

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
	if (duration < 0) return;
	if(typeof from === "object")from=from.offsetTop;
	if(typeof to === "object")to=to.offsetTop;

	scrollToX(element, from, to, 0, 1/duration, 20, easeOutCuaic);
}

function scrollToX(element, x1, x2, t, v, step, operacion) {
	if (t < 0 || t > 1 || v <= 0) return;
	element.scrollTop = x1 - (x1-x2)*operacion(t);
	t += v * step;

	setTimeout(function() {
		scrollToX(element, x1, x2, t, v, step, operacion);
	}, step);
}
function easeOutCuaic(t){
	t--;
	return t*t*t+1;
}

export default scroll
