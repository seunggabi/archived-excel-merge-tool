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
	KEY: {
		RANGE: "!ref",
		FORMULA: "f"
	},

	field: {
		range: null,
		colsIndex: [],
		rowsIndex: [],
		cols: [],
		startRow: null
	},
	isDuplication: false,


	Item: function(datas) {
		this.datas = datas || [];
	},

	addItem: function(sheet, datas) {
		var key = this.getIdentifier(datas);

		if(!this.items[sheet]) {
			this.items[sheet] = {};
			this.size[sheet] = 0;
		}
		if(this.isDuplication) {
			key += this.size[sheet];
		}

		if(!this.items[sheet].hasOwnProperty(key)) {
			this.size[sheet]++;
		}
		this.items[sheet][key] = new this.Item(datas);
	},

	getIdentifier: function(datas) {
		return datas.join(this.SPLITTER);
	},

	setDataConfig: function(isDuplication, fieldRange) {
		var cols = fieldRange.match(this.REG.COL);
		var rows = fieldRange.match(this.REG.ROW);

		this.field.range = fieldRange;
		this.field.colsIndex = cols;
		this.field.rowsIndex = rows;
		this.field.startRow = +rows[1]+1;
		this.isDuplication = isDuplication;
	},

	getRange: function(sheetName) {
		return this.field.colsIndex[0]+this.field.rowsIndex[0]
			+":"
			+this.field.colsIndex[1]+this.startRow+this.size[sheetName];
	},

	readCells: function(sheetName, sheet) {
		var item = [];

		var rowNumber = this.field.startRow;
		var row, col;
		var cellTable = {};
		for(var c in sheet) {
			if(c.match(this.REG.CELL)) {
				row = c.match(this.REG.ROW)[0];
				col = c.match(this.REG.COL)[0];

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
			for(var k in cellTable[this.field.startRow]) {
				item.push(cellTable[rowNumber][k]);
			}
			rowNumber++;
			this.addItem(sheetName, item);
			item = [];
		}
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
		sheet[this.KEY.RANGE] = this.getRange(sheetName);
	}
};