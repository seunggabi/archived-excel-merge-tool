/**
 * Created by seunggabi on 2017. 3. 12..
 */

module.exports = {
	CONFIG: require("./excel-merge-tool-config.js"),

	items: {},
	sizes: {},

	field: {
		range: null,
		colsIndex: [],
		rowsIndex: [],
		cols: [],
		startRow: null
	},
	isDuplication: false,

	init: function() {
		this.items = {};
		this.sizes = {};
	},

	Item: function(datas) {
		this.datas = datas || [];
	},

	addItem: function(sheet, datas) {
		var key = this._getIdentifier(datas);

		if(!this.items[sheet]) {
			this.items[sheet] = {};
			this.sizes[sheet] = 0;
		}
		if(this.isDuplication) {
			key += this.sizes[sheet];
		}

		if(!this.items[sheet].hasOwnProperty(key)) {
			this.sizes[sheet]++;
		}
		this.items[sheet][key] = new this.Item(datas);
	},

	setDataConfig: function(isDuplication, fieldRange) {
		var cols = fieldRange.match(this.CONFIG.REG.COL);
		var rows = fieldRange.match(this.CONFIG.REG.ROW);

		this.field.range = fieldRange;
		this.field.colsIndex = cols;
		this.field.rowsIndex = rows;
		this.field.startRow = +rows[1]+1;
		this.isDuplication = isDuplication;
	},

	readCells: function(sheetName, sheet) {
		var items = [];
		var item = [];

		var rowNumber = this.field.startRow;
		var row, col;
		var cellTable = {};
		for(var c in sheet) {
			if(c.match(this.CONFIG.REG.CELL)) {
				row = c.match(this.CONFIG.REG.ROW)[0];
				col = c.match(this.CONFIG.REG.COL)[0];

				if(row > this.field.rowsIndex[1]) {
					if (this.field.cols.indexOf(col) < 0) {
						this.field.cols.push(col);
					}

					if (!cellTable[row]) {
						cellTable[row] = {};
					}
					cellTable[row][col] = sheet[c].v;
				}
			}
		}

		while(cellTable[rowNumber]) {
			for(var k in cellTable[+this.field.startRow]) {
				item.push(cellTable[rowNumber][k]);
			}
			rowNumber++;

			if(!this._isNull(item)) {
				this.addItem(sheetName, item);
				items.push(item.join(","));
				item = [];
			}
		}
		return items;
	},

	addSheet: function(sheetName, sheet) {
		var rowNumber = this.field.startRow;

		for(var i in this.items[sheetName]) {
			for(var j=0; j<this.field.cols.length; j++) {
				sheet[this.field.cols[j] + rowNumber] = {};
				sheet[this.field.cols[j] + rowNumber].t = "s";
				sheet[this.field.cols[j] + rowNumber].v = this.items[sheetName][i].datas[j];
			}
			rowNumber++;
		}
		sheet[this.CONFIG.KEY.RANGE] = this._getRange(sheetName);
	},

	_isNull: function(datas) {
		return datas.join("") === "";
	},

	_getIdentifier: function(datas) {
		return datas.join(this.CONFIG.SPLITTER);
	},

	_getRange: function(sheetName) {
		return this.field.colsIndex[0]+this.field.rowsIndex[0]
			+":"
			+this.field.colsIndex[1]+this.field.startRow+this.sizes[sheetName];
	}
};