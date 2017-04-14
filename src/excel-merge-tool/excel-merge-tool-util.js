/**
 * Created by seunggabi on 2017. 3. 12..
 */

module.exports = {
	enterOnce: function(text) {
		text = this.trim(text);
		var regEnter = /[\r\n]+/g;
		return text.replace(regEnter, String.fromCharCode(13));
	},

	isInclude: function(a, b) {
		if(a === "") {
			return false;
		}
		return a.indexOf(b) >= 0 || b.indexOf(a) >= 0;
	},

	max: function(a, b) {
		var aLength = this.length(a);
		var bLength = this.length(b);

		if (aLength > bLength) {
			return a;
		} else if (aLength < bLength) {
			return b;
		} else {
			return a > b ? a : b;
		}
	},

	min: function(a, b) {
		var aLength = this.length(a);
		var bLength = this.length(b);

		if (aLength < bLength) {
			return a;
		} else if (aLength > bLength) {
			return b;
		} else {
			return a < b ? a : b;
		}
	},

	length: function(a) {
		if (typeof a === "string") {
			return a.length;
		}
		else {
			return 0;
		}
	},

	clone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	trim: function(text) {
		return text.replace(/[\r|\n]$/g, "").replace(/^[\r|\n]/g, "");
	},

	mix: function(target, mixin) {
		for (var i in mixin) {
			if (mixin.hasOwnProperty(i)) {
				if (this.isObject(mixin[i])) {
					target[i] = target[i] || {}
					target[i] = this.mix(target[i], mixin[i]);
				} else {
					if(!target.hasOwnProperty(i)) {
						target[i] = mixin[i];
					}
				}
			}
		}
		return target;
	},

	factorial: function(n) {
		if(n === 1) {
			return 1;
		}
		return n * this.factorial(n-1);
	},

	isObject: function(v) {
		if(!v || typeof(v) !== "object") {
			return false;
		}
		return true;
	}
};