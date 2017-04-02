/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	CONFIG: require("./excel-merge-tool-config.js"),

	XLSX: require("xlsx-style"),
	UTIL: require("./excel-merge-tool-utils.js"),
	LOG: require("./excel-merge-tool-log.js"),
	DATA: require("./excel-merge-tool-data.js"),

	write_mode: null,
	log_mode: null,
	ignore_length: null,
	field_range: null,
	isFirst: true,

	init: function(data) {
		data = data || {};
		this.write_mode = data.write_mode || this.CONFIG.DEFAULT.WRITE_MODE;
		this.LOG.status = data.log_mode || this.CONFIG.DEFAULT.LOG_MODE;
		this.ignore_length = data.ignore_length || this.CONFIG.DEFAULT.IGNORE_LENGTH;
		this.field_range = data.field_range || this.CONFIG.DEFAULT.FIELD_RANGE;

		var isDuplication = data.isDuplication || this.CONFIG.DEFAULT.isDuplication;
		this.DATA.setDataConfig(isDuplication, this.field_range);

		this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "EMT init");
	},

	readFiles: function(fileNames) {
		var wbList = [];
		fileNames.forEach(function(fileName) {
			var wb = this.XLSX.readFile(this.CONFIG.PATH.READ + fileName, {cellStyles: true});
			wb.fileName = fileName;
			wbList.push(wb);

			this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Read File: "+fileName);
		}.bind(this));
		return wbList;
	},

	binaryFile: function(fileName, binary) {
		this.fileName = fileName;
		this.binary = binary;
	},

	readBinaryFiles: function(binaryFiles) {
		var wbList = [];
		binaryFiles.forEach(function(binaryFile) {
			var wb = this.XLSX.read(binaryFile.binary, {type:"binary", cellStyles: true});
			wb.fileName = binaryFile.fileName;
			wbList.push(wb);

			this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Load File: "+binaryFile.fileName);
		}.bind(this));
		return wbList;
	},

	selectXLSX: function(fileNames) {
		var filesXLSX = [];

		fileNames.forEach(function(fileName) {
			if(fileName.lastIndexOf(this.CONFIG.EXTENSION) >= 0
				&& fileName.lastIndexOf(this.CONFIG.USING_CHECK) < 0) {
				filesXLSX.push(fileName);
			}
		}.bind(this));
		return filesXLSX;
	},

	_mergeSheets: function(sheets) {
		return sheets.reduce(this._mergeSheet.bind(this));
	},

	_mergeSheet: function(wb1, wb2) {
		this.LOG.addItem(this.CONFIG.LOG_TYPE.MERGE, "TO "+wb1.fileName+", FROM "+wb2.fileName);

		for(var s in wb2.Sheets) {
			if(wb1.Sheets.hasOwnProperty(s)) {
				this.LOG.addItem(this.CONFIG.LOG_TYPE.CONFLICT, s+" Sheet ==> Conflict");
				wb1.Sheets[s].fileName = wb1.fileName;
				wb2.Sheets[s].fileName = wb2.fileName;
				wb1.Sheets[s] = this._mergeCells(wb1.Sheets[s], wb2.Sheets[s]);
			} else {
				this.LOG.addItem(this.LOG_TYPE.NEW, s+" Sheet ==> New");
				wb1.Sheets[s] = wb2.Sheets[s];
				wb1.SheetNames.push(s);
			}
			wb1.Sheets[s].isMerge = true;
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
				var v1 = this.UTIL.enterOnce(String(s1[c].v));
				if(c.match(this.CONFIG.REG.CELL)) {
					s1[c].s = this.UTIL.mix(this.UTIL.clone(s1[c].s), this.CONFIG.DEFAULT_STYLE);
				}

				if(c === this.CONFIG.KEY.RANGE) {
					this._extendsRange(s1[c], s2[c]);
				}
				else if(v1.length < this.ignore_length && v2.length < this.ignore_length) {
					v1 = v1.toUpperCase();
					v2 = v2.toUpperCase();

					if(v1 === v2) {
						s1[c].t = "s";
						s1[c].v = v1;
					} else {
						s1[c].v = this.UTIL.trim(v1 + String.fromCharCode(13) + v2);
					}
				}
				else if(!this.UTIL.isInclude(v1, v2)) {
					s1[c].t = "s";
					if(this.write_mode === this.CONFIG.WRITE_MODE.CONFLICT && s1[c].v !== "") {
						s1[c].s = this.CONFIG.CONFLICT_STYLE;
					}

					if(!s1.isMerge) {
						s1[c].v = this._concatFileName(s1.fileName, v1)
							+ String.fromCharCode(13)
							+ this._concatFileName(s2.fileName, v2);
					} else {
						s1[c].v += String.fromCharCode(13)
							+ this._concatFileName(s2.fileName, v2);
					}

					s1[c].v = this.UTIL.trim(s1[c].v);
					this.LOG.addItem(this.CONFIG.LOG_TYPE.CONFLICT, c+" Cell ==> Conflict ("+s1[c].v+")");
				}
			} else {
				if(v2.length < this.ignore_length) {
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
			if(s[c].hasOwnProperty && s[c].hasOwnProperty(this.CONFIG.KEY.FORMULA)) {
				s[c].t = "s";
				s[c].v = "="+s[c].f;
			}
		}
	},

	_extendsRange: function(r1, r2) {
		var r;
		var r1Col = r1.match(this.CONFIG.REG.COL);
		var r1Row = r1.match(this.CONFIG.REG.ROW);

		var r2Col = r2.match(this.CONFIG.REG.COL);
		var r2Row = r2.match(this.CONFIG.REG.ROW);

		r = this.UTIL.min(r1Col[0], r2Col[0])
			+ this.UTIL.min(r1Row[0], r2Row[0])
			+ ":"
			+ this.UTIL.max(r1Col[1], r2Col[1])
			+ this.UTIL.max(r1Row[1], r2Row[1]);

		return r;
	},

	_concatFileName: function(fileName, text) {
		if(text === "") {
			return text;
		}

		var fileNameLabel = "["+fileName+"]";
		if(text.indexOf(fileNameLabel) >= 0) {
			fileNameLabel = "";
		}

		var concatText = text;
		if(this.write_mode === this.CONFIG.WRITE_MODE.CONFLICT) {
			concatText = fileNameLabel + String.fromCharCode(13) + text;
		}

		return concatText;
	},

	writeFile: function(wbList) {
		switch(this.write_mode) {
			case this.CONFIG.WRITE_MODE.LIST:
			case this.CONFIG.WRITE_MODE.NONE:
			case this.CONFIG.WRITE_MODE.CONFLICT:
				this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				this._writeFile(this.UTIL.clone(wbList));
				this.LOG.writeFile();
				break;
			case this.CONFIG.WRITE_MODE.ALL:
				this.write_mode = this.CONFIG.WRITE_MODE.NONE;
				this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				this._writeFile(this.UTIL.clone(wbList));
				this.write_mode = this.CONFIG.WRITE_MODE.CONFLICT;
				this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				this._writeFile(this.UTIL.clone(wbList));
				this.write_mode = this.CONFIG.WRITE_MODE.ALL;
				this.LOG.writeFile();
				break;
			default:
				console.log(this.CONFIG.MSG.UNDEFINED);
		}
	},

	_writeFile: function(wbList) {
		var wb;

		if(this.write_mode === this.CONFIG.WRITE_MODE.LIST) {
			wb = this._addSheets(wbList);
		} else {
			wb = this._mergeSheets(wbList);
		}

		this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Write File: "+this.CONFIG.WRITE_NAME[this.write_mode]);
		this.XLSX.writeFile(wb, this.CONFIG.PATH.WRITE + this.CONFIG.WRITE_NAME[this.write_mode]);
	},

	writeBinaryFile: function(wbList) {
		var binaryFiles = [];
		switch(this.write_mode) {
			case this.CONFIG.WRITE_MODE.LIST:
			case this.CONFIG.WRITE_MODE.NONE:
			case this.CONFIG.WRITE_MODE.CONFLICT:
				this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				binaryFiles.push(this._writeBinaryFile(this.UTIL.clone(wbList)));
				binaryFiles.push(new this.binaryFile(this.LOG.FILE_NAME, this.LOG.getBinaryFile()));
				break;
			case this.CONFIG.WRITE_MODE.ALL:
				this.write_mode = this.CONFIG.WRITE_MODE.NONE;
				this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				binaryFiles.push(this._writeBinaryFile(this.UTIL.clone(wbList)));
				this.write_mode = this.CONFIG.WRITE_MODE.CONFLICT;
				this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Mode is "+this.write_mode);
				binaryFiles.push(this._writeBinaryFile(this.UTIL.clone(wbList)));
				this.write_mode = this.CONFIG.WRITE_MODE.ALL;
				binaryFiles.push(new this.binaryFile(this.LOG.FILE_NAME, this.LOG.getBinaryFile()));
				break;
			default:
				console.log(this.CONFIG.MSG.UNDEFINED);
		}
		return binaryFiles;
	},

	_writeBinaryFile: function(wbList) {
		var wb;

		if(this.write_mode === this.CONFIG.WRITE_MODE.LIST) {
			wb = this._addSheets(wbList);
		} else {
			wb = this._mergeSheets(wbList);
		}

		this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Write File: "+this.CONFIG.WRITE_NAME[this.write_mode]);
		return new this.binaryFile(this.CONFIG.WRITE_NAME[this.write_mode], this.XLSX.write(wb, {type: "binary"}));
	},

	_readSheets: function(wb) {
		this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Read File: "+wb.fileName);
		for(var s in wb.Sheets) {
			this.LOG.addItem(this.CONFIG.LOG_TYPE.SYSTEM, "Read Sheet: "+s);
			var items = this._readCells(s, wb.Sheets[s]);
			items.forEach(function(item, index) {
				this.LOG.addItem(this.CONFIG.LOG_TYPE.NEW, "New Item("+Number(1+index)+"): "+item);
			}.bind(this));
		}
	},

	_readCells: function(sheetName, sheet) {
		return this.DATA.readCells(sheetName, sheet);
	},

	_addSheets: function(wbList) {
		this.DATA.init();

		for(var wb in wbList) {
			this._readSheets(wbList[wb]);
		}

		for(var s in wbList[0].Sheets) {
			this.DATA.addSheet(s, wbList[0].Sheets[s]);
			this.LOG.addItem(this.CONFIG.LOG_TYPE.NEW, s+" New Data Count: "+this.DATA.sizes[s]);
		}
		return wbList[0];
	}
};