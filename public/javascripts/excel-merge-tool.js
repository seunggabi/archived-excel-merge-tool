/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	PATH: "files/",
	EXTENSION: ".xlsx",
	LOG: false,
	IGNORE_LENGTH: 2,

	readFiles: function(fileNames) {
		var self = this;
		var wbList = [];

		fileNames.forEach(function(value) {
			var wb = XLSX.readFile(self.PATH + value);
			wb.fileName = value;
			wbList.push(wb);
		});
		return wbList;
	},

	mergeSheets: function(sheets) {
		return sheets.reduce(this._mergeSheet.bind(this));
	},

	selectXLSX: function(fileNames) {
		var self = this;
		var fileXLSX = [];

		fileNames.forEach(function(fileName) {
			if(fileName.lastIndexOf(self.EXTENSION) !== -1
				&& fileName.lastIndexOf("$") === -1) {
				fileXLSX.push(fileName);
			}
		});
		return fileXLSX;
	},

	_mergeSheet: function(wb1, wb2) {
		for(var s in wb2.Sheets) {
			if(wb1.Sheets.hasOwnProperty(s)) {
				wb1.Sheets[s].fileName = wb1.fileName;
				wb2.Sheets[s].fileName = wb2.fileName;
				wb1.Sheets[s] = this._mergeCells(wb1.Sheets[s], wb2.Sheets[s]);
			} else {
				wb1.Sheets[s] = wb2.Sheets[s];
				wb1.SheetNames.push(s);
			}
		}
		return wb1;
	},

	_mergeCells: function(s1, s2) {
		for(var c in s2) {
			var v2 = String(s2[c].v);
			v2 = this._enterOnce(v2);

			if(s1.hasOwnProperty(c)) {
				var v1 = String(s1[c].v);
				v1 = this._enterOnce(v1);

				if(c === "!ref") {
					this._extendsRange(s1[c], s2[c]);
				}
				else if(v1.length <= this.IGNORE_LENGTH && v2.length <= this.IGNORE_LENGTH) {
					v1 = v1.toUpperCase();
					v2 = v2.toUpperCase();

					if(v1 === v2) {
						s1[c].t = "s";
						s1[c].v = v1;
					} else {
						s1[c].v = v1 + String.fromCharCode(13) + v2;
					}
				}
				else if(this.isInclude(v1, v2)) {
					s1[c].t = "s";
					s1[c].v = this._concatLog(s1.fileName, v1)
						+ String.fromCharCode(13)
						+ this._concatLog(s2.fileName, v2);
				}
			} else {
				if(v2.length <= this.IGNORE_LENGTH) {
					s2[c].v = v2;
				} else {
					s2[c].v =  this._concatLog(s2.fileName, v2);
				}
				s1[c] = s2[c];
			}
		}
		return s1;
	},

	_extendsRange: function(r1, r2) {
		var r;
		var regRow = /\w+/g;
		var regCol = /\d+/g;

		var r1Row = r1.match(regRow);
		var r1Col = r1.match(regCol);
		var r2Row = r2.match(regRow);
		var r2Col = r2.match(regCol);

		r = this.min(r1Row[0], r2Row[0])
			+ this.min(r1Col[0], r2Col[0])
			+ ":"
			+ this.max(r1Row[1], r2Row[1])
			+ this.max(r1Col[1], r2Col[1]);

		return r;
	},

	_enterOnce: function(text) {
		var regEnter = /[\r\n]+/g;
		return text.replace(regEnter, String.fromCharCode(13));
	},

	_concatLog: function(a, b) {
		var concatText = b;
		if(this.LOG) {
			concatText = a + String.fromCharCode(13) + b;
		}

		return concatText;
	},

	isInclude: function(a, b) {
		return a.indexOf(b) === -1 && a.indexOf(b) === -1;
	},

	max: function(a, b) {
		var aLength = this.length(a);
		var bLength = this.length(b);

		if(aLength > bLength) {
			return a;
		} else if(aLength < bLength) {
			return b;
		} else {
			return a > b ? a : b;
		}
	},

	min: function(a, b) {
		var aLength = this.length(a);
		var bLength = this.length(b);

		if(aLength < bLength) {
			return a;
		} else if(aLength > bLength) {
			return b;
		} else {
			return a < b ? a : b;
		}
	},

	length: function(a) {
		if(typeof a === "string") {
			return a.length;
		}
		else {
			return 0;
		}
	}
};