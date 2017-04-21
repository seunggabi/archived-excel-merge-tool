/**
 * Created by seunggabi on 2017. 3. 12..
 */

if(global && !global.EMT) global.EMT = {};
var EMT = global.EMT;

global.EMT.DATA = module.exports = {
	items: {},
	sizes: {},

	field: null,
	fields: {},

	isDuplication: false,

	init: function() {
		this.items = {};
		this.sizes = {};
	},

	Item: function(datas) {
		this.datas = datas || [];
	},

	addItem: function(sheetName, datas) {
		var key = this._getIdentifier(datas);

		if(!this.items[sheetName]) {
			this.items[sheetName] = {};
			this.sizes[sheetName] = 0;
		}
		if(this.isDuplication) {
			key += this.sizes[sheetName];
		}

		if(!this.items[sheetName].hasOwnProperty(key)) {
			this.sizes[sheetName]++;
		}
		this.items[sheetName][key] = new this.Item(datas);
	},

	setDataConfig: function(isDuplication, fieldRange) {
		this._setDuplication(isDuplication);
		this.field = this._createField(fieldRange);
	},

	_setDuplication: function(isDuplication) {
		this.isDuplication = isDuplication;
	},

	_createField: function(fieldRange) {
		if(!fieldRange) {
			return null;
		}

		var range = this._getRange(fieldRange);
		var field = {};

		field.range = fieldRange;
		field.colsIndex = range.cols;
		field.rowsIndex = range.rows;
		field.startRow = range.rows && +range.rows[1]+1;
		field.cols = [];

		return field;
	},

	_getField: function(sheetName) {
		return this.field || this.fields[sheetName];
	},

	_getRange: function(fieldRange) {
		var range = {};

		range.rows = fieldRange.match(EMT.CONFIG.REG.ROW);
		range.cols = fieldRange.match(EMT.CONFIG.REG.COL);

		return range;
	},

	readCells: function(sheetName, sheet) {
		var items = [];
		var item = [];

		if(!this.field && !this.fields[sheetName]) {
			var range = this._getRange(sheet[EMT.CONFIG.KEY.RANGE]);
			var fieldRnage = range.cols[0]+range.rows[0]+":"+range.cols[1]+range.rows[0];
			this.fields[sheetName] = this._createField(fieldRnage);
		}
		var field = this._getField(sheetName);
		var rowNumber = field.startRow;

		var row, col;
		var cellTable = {};
		for(var c in sheet) {
			if(c.match(EMT.CONFIG.REG.CELL)) {
				row = c.match(EMT.CONFIG.REG.ROW)[0];
				col = c.match(EMT.CONFIG.REG.COL)[0];

				if(row > field.rowsIndex[1]) {
					if (this._isFieldRange(field, col) && field.cols.indexOf(col) < 0) {
						field.cols.push(col);
					}

					if (!cellTable[row]) {
						cellTable[row] = {};
					}
					if(this._isFieldRange(field, col)) {
						cellTable[row][col] = sheet[c].v;
					}
				}
			}
		}

		while(cellTable[rowNumber]) {
			for(var k in cellTable[+field.startRow]) {
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

	_isFieldRange: function(field, col) {
		return EMT.UTIL.min(col, field.colsIndex[0]) === field.colsIndex[0];
	},

	addSheet: function(sheetName, sheet) {
		var field = this._getField(sheetName);
		var rowNumber = field.startRow;

		for(var i in this.items[sheetName]) {
			for(var j=0; j<field.cols.length; j++) {
				sheet[field.cols[j] + rowNumber] = {};
				sheet[field.cols[j] + rowNumber].t = "s";
				sheet[field.cols[j] + rowNumber].v = this.items[sheetName][i].datas[j];
				sheet[field.cols[j] + rowNumber].s = EMT.CONFIG.DEFAULT_STYLE;
			}
			rowNumber++;
		}
		sheet[EMT.CONFIG.KEY.RANGE] = this._getExtendRange(sheetName);
	},

	_isNull: function(datas) {
		return datas.join("") === "";
	},

	_getIdentifier: function(datas) {
		return datas.join(EMT.CONFIG.SPLITTER);
	},

	_getExtendRange: function(sheetName) {
		var field = this._getField(sheetName);

		return field.colsIndex[0]+field.rowsIndex[0]
			+":"
			+field.colsIndex[1]+field.startRow+this.sizes[sheetName];
	}
};