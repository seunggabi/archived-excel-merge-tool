/**
 * Created by seunggabi on 2017. 3. 12..
 */

module.exports = {
	items: {},
	size: {},

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

	addItem: function(sheet, datas) {
		var key = this.getIdentifier(datas);

		if(!this.items[sheet]) {
			this.items[sheet] = {};
			this.size[sheet] = 0;
		}
		if(!this.items[sheet].hasOwnProperty(key)) {
			this.size[sheet]++;
		}
		this.items[sheet][this.getIdentifier(datas)] = new this.Item(datas);
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

	getRange: function(sheet) {
		return this.field.colsIndex[0]+this.field.rowsIndex[0]+":"+this.field.colsIndex[1]+this.size[sheet];
	}
};