import s from './PostPage.scss'
import {addEventListener, removeEventListener} from '../../core/DOMUtils'
import scroll from './scroll'

const hasClass = (elem, cls) => (
	elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
);

const addClass = (elem, cls) => {
	if (!hasClass(elem, cls)) {
		elem.className += ' ' + cls;
		return !0;
	} else {
		return !1;
	}
};

const removeClass = (elem, cls) => {
	if (elem === null) {
	    return !1;
	}
	if (hasClass(elem, cls)) {
		elem.className = elem.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), '');
		return !0;
	} else {
		return !1;
	}
};

const getTop = (elem) => {
	let top = elem.offsetTop;

	do {
		elem = elem.offsetParent;
		top += elem.offsetTop;
	} while (elem.offsetParent !== document.body);

	return top;
};

const getHash = (link) => link.href.split('#')[1];

const config = {
	navItems: 'a',
	currentClass: s.active,
	changeHash: !1,
	easing: "swing",
	filter: "",
	scrollSpeed: 700,
	scrollOffset: 0,
	scrollThreshold: .2,
	scrollChange: null,
	padding: 80
};

class OnePageNav {
	constructor(elem, options) {
		this.elem = elem;
		this.options = options;
		this.win = window;
		this.sections = {};
		this.didScroll = false;
		this.doc = document;
		this.docHeight = document.body.clientHeight;
		this.defaults = {
			navItems: 'a',
			currentClass: s.active,
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.1,
			begin: false,
			end: false,
			scrollChange: false
		};
		this._handleClick = this.handleClick.bind(this);
		this._didScroll = (function () {this.didScroll = true}).bind(this);
		this._getPositions = this.getPositions.bind(this);
	}

	init() {
		this.config = Object.assign(this.options, this.defaults);
		this.navs = this.elem.querySelectorAll(this.config.navItems);
		if (this.config.filter) {
		    this.navs = [].filter.call(this.navs, this.config.filter);
		}

		[].map.call(this.navs, (nav) => {
			addEventListener(nav, 'click', this._handleClick);
		});
		this.getPositions();
		this.bindInterval();
		addEventListener(this.win, 'resize', this._getPositions);
		return this;
	}

	handleClick(e) {
		let link = e.target || e.srcElement;
		let parent = link.parentNode;
		let newLoc = '#' + getHash(link);

		if (!hasClass(parent, this.config.currentClass)) {
			this.adjustNav(this, parent);
			this.unbindInterval();
			this.scrollTo(newLoc,  () => {
				if (this.config.changeHash) {
					window.location.hash = newLoc;
				}
				setTimeout(() => {this.bindInterval()}, this.config.scrollSpeed);
			});
		}

		e.preventDefault();
	}

	adjustNav(self, parentElement) {
		const cls = self.config.currentClass;
		removeClass(self.elem.querySelector(`.${cls}`), cls);
		addClass(parentElement, cls);
	}

	bindInterval() {
		let docHeight;
		addEventListener(this.win, 'scroll', this._didScroll);
		this.t = setInterval(() => {
			docHeight = this.doc.body.clientHeight;
			if (this.didScroll) {
				this.didScroll = false;
				this.scrollChange();
			}

			if (docHeight !== this.docHeight) {
				this.docHeight = docHeight;
				this.getPositions();
			}
		}, 250);
	}

	unbindInterval() {
		clearInterval(this.t);
		removeEventListener(this.win, 'scroll', this._didScroll);
	}

	scrollTo(target, callback) {
		let offset = getTop(this.doc.querySelector(target));
		let curr = this.win.scrollY;
		if (offset < curr) {
		    offset -= 65;
		}
		scroll(offset, this.config.scrollSpeed, callback);
	}

	scrollChange() {
		let windowPos = this.win.scrollY;
		let position = this.getSection(windowPos);
		let parent;

		if (position !== null) {
			parent = this.elem.querySelector(`a[href$="#${position}"]`).parentNode;
			if (!hasClass(parent, this.config.currentClass)) {
				this.adjustNav(this, parent);

				if (this.config.scrollChange) {
					this.config.scrollChange(parent);
				}
			}
		}
	}

	getPositions() {
		let linkHref, topPos, target;
		[].map.call(this.navs,  (nav) => {
			linkHref = getHash(nav);
			target = document.querySelector('#' + linkHref);

			if (target&&target.nodeType === 1) {
				topPos = getTop(target);
				this.sections[linkHref] = Math.round(topPos);
			}
		});
	}

	getSection(windowPos) {
		let returnValue = null;
		let windowHeight = Math.round(this.win.innerHeight * this.config.scrollThreshold);
		for (let section in this.sections) {
			if ((this.sections[section] - windowHeight) < windowPos) {
				returnValue = section;
			}
		}
		return returnValue;
	}

	destroy() {
		removeEventListener(this.win, 'resize', this._getPositions);
		removeEventListener(this.win, 'scroll', this._didScroll);
		this._handleClick = null;
	}
}

export default OnePageNav;
