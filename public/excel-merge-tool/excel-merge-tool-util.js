/**
 * Created by seunggabi on 2017. 3. 12..
 */

EMT.UTIL = {
	enterOnce: function(text) {
		if(typeof(text) !== "string") {
			return;
		}
		text = this.trim(text);
		return text.replace(EMT.CONFIG.REG.ENTER, String.fromCharCode(13));
	},

	isInclude: function(a, b) {
		if(a === "") {
			return false;
		}
		return a.indexOf(b) >= 0 || b.indexOf(a) >= 0;
	},

	max: function(a, b) {
		let aLength = this.length(a);
		let bLength = this.length(b);

		if (aLength > bLength) {
			return a;
		} else if (aLength < bLength) {
			return b;
		} else {
			return a > b ? a : b;
		}
	},

	min: function(a, b) {
		let aLength = this.length(a);
		let bLength = this.length(b);

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
		if(typeof(text) !== "string") {
			return;
		}
		return text.replace(EMT.CONFIG.REG.ENTER_START, "").replace(EMT.CONFIG.REG.ENTER_END, "");
	},

	removeEnter: function(text) {
		if(typeof(text) !== "string") {
			return;
		}
		return text.replace(EMT.CONFIG.REG.ENTER, " ");
	},

	mix: function(target, mixin) {
		for (let i in mixin) {
			if (mixin.hasOwnProperty(i)) {
				if (this.isObject(mixin[i])) {
					target[i] = target[i] || {};
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

	isNull: function(datas) {
		return datas.join("") === "";
	},

	isObject: function(v) {
		return v && typeof(v) === "object";
	},

	isSet: function(v) {
		return typeof(v) !== "undefined";
	},

	wrapBracket: function(text) {
		return "["+text+"]";
	},

	getEnter: function() {
		return String.fromCharCode(13) + String.fromCharCode(10);
	}
};