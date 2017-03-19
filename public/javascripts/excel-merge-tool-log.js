/**
 * Created by seunggabi on 2017. 3. 12..
 */
Date.prototype.timestamp = function() {
	var y = this.getFullYear();
	var m = this.getMonth() + 1; // getMonth() is zero-based
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

	Item: function(type, content) {
		this.type = type;
		this.content = content;
		this.time = new Date().timestamp();
	},

	items: [],

	addItem: function(type, content) {
		this.items.push(new this.Item(type, content));
	},

	getItem: function(item) {
		return "["+item.type+"]["+item.time+"]"+item.content;
	},

	getItems: function() {
		var items = "";

		this.items.forEach(function(item) {
			items += this.getItem(item)+"\n";
		}.bind(this));
		return items;
	},

	writeFile: function() {
		this.FS.writeFile(this.PATH+this.FILE_NAME, this.getItems())
	}
};