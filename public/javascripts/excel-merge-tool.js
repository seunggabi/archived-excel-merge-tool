/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	XLSX: require("xlsx-style"),
	UTIL: require("./excel-merge-tool-utils.js"),
	LOG: require("./excel-merge-tool-log.js"),
	DATA: require("./excel-merge-tool-data.js"),

	PATH: {
		READ: "files/",
		WRITE: "files/output/"
	},
	WRITE_NAME: {
		NONE: "merge.xlsx",
		CONFLICT: "merge_conflict.xlsx",
		LIST: "merge_list.xlsx"
	},
	EXTENSION: ".xlsx",
	WRITE_MODE: {
		NONE: "NONE",
		CONFLICT: "CONFLICT",
		ALL: "ALL",
		LIST: "LIST"
	},
	DEFAULT: {
		WRITE_MODE: "LIST",
		LOG_MODE: true,
		IGNORE_LENGTH: 2,
		FIELD_RANGE: "A1:D1"
	},
	MSG: {
		UNDEFINED: "사용되지 않는 모드입니다."
	},
	LOG_TYPE: {
		SYSTEM: "SYSTEM  ",
		MERGE: "MERGE   ",
		NEW: "NEW     ",
		CONFLICT: "CONFLICT"
	},
	USING_CHECK: "$",
	RANGE_KEY: "!ref",
	FORMULA_KEY: "f",

	write_mode: null,
	log_mode: null,
	ignore_length: null,
	field_range: null,

	init: function(data) {
		data = data || {};
		this.write_mode = data.write_mode || this.DEFAULT.WRITE_MODE;
		this.LOG.status = data.log_mode || this.DEFAULT.LOG_MODE;
		this.ignore_length = data.ignore_length || this.DEFAULT.IGNORE_LENGTH;
		this.field_range = data.field_range || this.DEFAULT.FIELD_RANGE;
		this.DATA.setFields(this.field_range);

		this.LOG.addItem(this.LOG_TYPE.SYSTEM, "EMT init");
	},

	readFiles: function(fileNames) {
		var wbList = [];
		fileNames.forEach(function(fileName) {
			var wb = this.XLSX.readFile(this.PATH.READ + fileName, {cellStyles: true});
			wb.fileName = fileName;
			wbList.push(wb);

			this.LOG.addItem(this.LOG_TYPE.SYSTEM, "Read "+fileName);
		}.bind(this));
		return wbList;
	},

	selectXLSX: function(fileNames) {
		var filesXLSX = [];

		fileNames.forEach(function(fileName) {
			if(fileName.lastIndexOf(this.EXTENSION) >= 0
				&& fileName.lastIndexOf(this.USING_CHECK) < 0) {
				filesXLSX.push(fileName);
			}
		}.bind(this));
		return filesXLSX;
	},

	_mergeSheets: function(sheets) {
		return sheets.reduce(this._mergeSheet.bind(this));
	},

	_mergeSheet: function(wb1, wb2) {
		this.LOG.addItem(this.LOG_TYPE.MERGE, "TO "+wb1.fileName+", FROM "+wb2.fileName);

		for(var s in wb2.Sheets) {
			if(wb1.Sheets.hasOwnProperty(s)) {
				this.LOG.addItem(this.LOG_TYPE.CONFLICT, s+" Sheet ==> Conflict");
				wb1.Sheets[s].fileName = wb1.fileName;
				wb2.Sheets[s].fileName = wb2.fileName;
				wb1.Sheets[s] = this._mergeCells(wb1.Sheets[s], wb2.Sheets[s]);
			} else {
				this.LOG.addItem(this.LOG_TYPE.NEW, s+" Sheet ==> New");
				wb1.Sheets[s] = wb2.Sheets[s];
				wb1.SheetNames.push(s);
			}
		}
		return wb1;
	},

	_mergeCells: function(s1, s2) {
		this._setCellFomula(s1);
		this._setCellFomula(s2);

		for(var c in s2) {
			var v2 = String(s2[c].v);
			v2 = this.UTIL.enterOnce(v2);

			if(s1.hasOwnProperty(c)) {
				var v1 = String(s1[c].v);
				v1 = this.UTIL.enterOnce(v1);

				if(c === this.RANGE_KEY) {
					this._extendsRange(s1[c], s2[c]);
				}
				else if(v1.length <= this.ignore_length && v2.length <= this.ignore_length) {
					v1 = v1.toUpperCase();
					v2 = v2.toUpperCase();

					if(v1 === v2) {
						s1[c].t = "s";
						s1[c].v = v1;
					} else {
						s1[c].v = v1 + String.fromCharCode(13) + v2;
					}
				}
				else if(!this.UTIL.isInclude(v1, v2)) {
					s1[c].t = "s";
					s1[c].v = this._concatFileName(s1.fileName, v1)
						+ String.fromCharCode(13)
						+ this._concatFileName(s2.fileName, v2);
					this.LOG.addItem(this.LOG_TYPE.CONFLICT, c+" Cell ==> Conflict ("+s1[c].v+")");
				}
			} else {
				if(v2.length <= this.ignore_length) {
					s2[c].v = v2;
				} else {
					s2[c].v =  this._concatFileName(s2.fileName, v2);
				}
				s1[c] = s2[c];
			}
		}
		return s1;
	},

	_setCellFomula: function(s) {
		for(var c in s) {
			if(s[c].hasOwnProperty(this.FORMULA_KEY)) {
				s[c].t = "s";
				s[c].v = "="+s[c].f;
			}
		}
	},

	_extendsRange: function(r1, r2) {
		var r;
		var r1Col = r1.match(this.DATA.REG.COL);
		var r1Row = r1.match(this.DATA.REG.ROW);

		var r2Col = r2.match(this.DATA.REG.COL);
		var r2Row = r2.match(this.DATA.REG.ROW);

		r = this.UTIL.min(r1Col[0], r2Col[0])
			+ this.UTIL.min(r1Row[0], r2Row[0])
			+ ":"
			+ this.UTIL.max(r1Col[1], r2Col[1])
			+ this.UTIL.max(r1Row[1], r2Row[1]);

		return r;
	},

	_concatFileName: function(fileName, text) {
		var concatText = text;
		if(this.write_mode === this.WRITE_MODE.CONFLICT) {
			concatText = "["+fileName+"]" + String.fromCharCode(13) + text;
		}

		return concatText;
	},

	writeFile: function(wbList) {
		switch(this.write_mode) {
			case this.WRITE_MODE.LIST:
			case this.WRITE_MODE.NONE:
			case this.WRITE_MODE.CONFLICT:
				this.LOG.addItem(this.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				this._writeFile(this.UTIL.clone(wbList));
				this.LOG.writeFile();
				break;
			case this.WRITE_MODE.ALL:
				this.write_mode = this.WRITE_MODE.NONE;
				this.LOG.addItem(this.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				this._writeFile(this.UTIL.clone(wbList));
				this.write_mode = this.WRITE_MODE.CONFLICT;
				this.LOG.addItem(this.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				this._writeFile(this.UTIL.clone(wbList));
				this.write_mode = this.WRITE_MODE.ALL;
				this.LOG.writeFile();
				break;
			default:
				console.log(this.MSG.UNDEFINED);
		}
	},

	_writeFile: function(wbList) {
		var wb;

		if(this.write_mode === this.WRITE_MODE.LIST) {
			wb = this._addSheets(wbList);
		} else {
			wb = this._mergeSheets(wbList);
		}

		this.XLSX.writeFile(wb, this.PATH.WRITE + this.WRITE_NAME[this.write_mode]);
		this.LOG.addItem(this.LOG_TYPE.SYSTEM, "Write "+this.WRITE_NAME[this.write_mode]);
	},

	_readSheets: function(wb) {
		for(var s in wb.Sheets) {
			this._readCells(wb.Sheets[s]);
		}
	},

	_readCells: function(s) {
		var item = [];

		var rowNumber = +this.DATA.field.rowsIndex[1];
		var row, col;
		var cellTable = {};
		for(var c in s) {
			if(c.match(this.DATA.REG.CELL)) {
				row = c.match(this.DATA.REG.ROW);
				col = c.match(this.DATA.REG.COL);

				if(this.DATA.field.cols.indexOf(c) < 0) {
					this.DATA.field.cols.push(c);
				}

				if(!cellTable[row]) {
					cellTable[row] = {};
				}
				cellTable[row][col] = s[c].v;
			}
		}

		while(cellTable[rowNumber]) {
			for(var k in cellTable[this.DATA.field.rowsIndex[1]]) {
				item.push(cellTable[rowNumber][k]);
			}
			rowNumber++;
			this.DATA.addItem(item);
			item = [];
		}
	},

	_addSheets: function(wbList) {
		for(var wb in wbList) {
			this._readSheets(wbList[wb]);
		}

		var rowNumber = this.DATA.field.rowsIndex[1];
		for(var s in wbList[0].Sheets) {
			var sheet = wbList[0].Sheets[s];

			sheet["!ref"] = "A1:D4";
			for(var i=0; i<this.DATA.items.length; i++) {
				for(var j=0; j<this.DATA.field.cols.length; j++) {
					sheet[this.DATA.field.cols[c]+rowNumber+i].t = "s";
					sheet[this.DATA.field.cols[c]+rowNumber+i].v = this.DATA.items[i].datas[j];
				}
			}
			console.log(this.DATA.items, this.DATA.items.length);
			//console.log(wbList[0].Sheets.시트1);
			break;
		}
		return wbList[0];
	}
};