/**
 * Created by seunggabi on 2017. 3. 12..
 */

module.exports = {
	items: {},
	splitter: "{{$s$}}",

	Item: function(datas) {
		this.datas = datas || [];
	},

	addItem: function(datas) {
		this.items[this.getIdentifier(datas)] = new this.Item(datas);
	},

	getIdentifier: function(datas) {
		return datas.join(this.splitter);
	},
};