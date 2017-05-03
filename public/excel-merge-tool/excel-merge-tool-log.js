/**
 * Created by seunggabi on 2017. 3. 12..
 */

Date.prototype.timestamp = function() {
	let y = this.getFullYear();
	let m = this.getMonth() + 1;
	let d = this.getDate();
	let h = this.getHours();
	let i = this.getMinutes();
	let s = this.getSeconds();

	m = m>9 ? m : "0"+m;
	d = d>9 ? d : "0"+d;
	h = h>9 ? h : "0"+h;
	i = i>9 ? i : "0"+i;
	s = s>9 ? s : "0"+s;

	return [y, m, d].join("-")+" "+[h, i, s].join(":");
};

EMT.LOG = {
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

	getBinaryFile: function() {
		if(!this.status) {
			return;
		}
        let binaryFile = this._getItems();
		this.items = [];
		return binaryFile;
	},

	_getItems: function() {
		let items = "";

		this.items.forEach(function(item) {
			items += this._getItem(item)+"\n";
		}.bind(this));
		return items;
	},

	_getItem: function(item) {
		return "["+item.type+"]["+item.time+"] "+EMT.UTIL.removeEnter(item.content);
	}
};