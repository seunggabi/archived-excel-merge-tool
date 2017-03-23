/**
 * Created by seunggabi on 2017. 3. 12..
 */
Date.prototype.timestamp = function() {
	var y = this.getFullYear();
	var m = this.getMonth() + 1;
	var d = this.getDate();
	var h = this.getHours();
	var i = this.getMinutes();
	var s = this.getSeconds();

	m = m>9 ? m : "0"+m;
	d = d>9 ? d : "0"+d;
	h = h>9 ? h : "0"+h;
	i = i>9 ? i : "0"+i;
	s = s>9 ? s : "0"+s;

	return [y, m, d].join("-")+" "+[h, i, s].join(":");
};

module.exports = {
	FS: require("fs"),
	PATH: "files/output/",
	FILE_NAME: "log.txt",
	status: true,
	items: [],

	Item: function(type, content) {
		this.type = type;
		this.content = content;
		this.time = (new Date()).timestamp();
	},

	addItem: function(type, content) {
		if(!this.status) {
			return;
		}
		this.items.push(new this.Item(type, content));
	},

	_getItem: function(item) {
		if(!this.status) {
			return;
		}
		return "["+item.type+"]["+item.time+"] "+this._removeEnter(item.content);
	},

	_getItems: function() {
		if(!this.status) {
			return;
		}
		var items = "";

		this.items.forEach(function(item) {
			items += this._getItem(item)+"\n";
		}.bind(this));
		return items;
	},

	writeFile: function() {
		if(!this.status) {
			return;
		}
		this.FS.writeFile(this.PATH+this.FILE_NAME, this._getItems());
		this.items = [];
	},

	writeBinaryFile: function() {
		if(!this.status) {
			return;
		}
		this.FS.writeFile(this.PATH+this.FILE_NAME, this._getItems());
		this.items = [];
	},

	_removeEnter: function(text) {
		if(!this.status) {
			return;
		}
		var regEnter = /[\r\n]+/g;
		return text.replace(regEnter, " ");
	}
};