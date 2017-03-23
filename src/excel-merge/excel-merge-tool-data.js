/**
 * Created by seunggabi on 2017. 3. 12..
 */

module.exports = {
	items: {
	},
	length: 0,

	SPLITTER: "{{$s$}}",
	REG: {
		COL: /[A-Z]+/g,
		ROW: /\d+/g,
		CELL: /[A-Z]\d+/g
	},
	field: {
		range: null,
		colsIndex: [],
		rowsIndex: [],
		cols: []
	},

	Item: function(datas) {
		this.datas = datas || [];
	},

	addItem: function(datas) {
		var key = this.getIdentifier(datas);
		if(!this.items.hasOwnProperty(key)) {
			this.length++;
		}
		this.items[this.getIdentifier(datas)] = new this.Item(datas);
	},

	getIdentifier: function(datas) {
		return datas.join(this.SPLITTER);
	},

	setFields: function(fieldRange) {
		var cols = fieldRange.match(this.REG.COL);
		var rows = fieldRange.match(this.REG.ROW);

		this.field.range = fieldRange;
		this.field.colsIndex = cols;
		this.field.rowsIndex = rows;
	},
};