/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	mergeSheet: function(wb1, wb2) {
		for(var s in wb2.Sheets) {
			if(wb1.Sheets.hasOwnProperty(s)) {
				wb1.Sheets[s] = this.mergeCells(wb1.Sheets[s], wb2.Sheets[s]);
			} else {
				wb1.Sheets[s] = wb2.Sheets[s];
				wb1.SheetNames.push(s);
			}
		}
		return wb1;
	},

	mergeCells: function(s1, s2) {
		for(var c in s2) {
			var v2 = String(s2[c].v);
			v2 = this.enterOnce(v2);

			if(s1.hasOwnProperty(c)) {
				var v1 = String(s1[c].v);
				v1 = this.enterOnce(v1);

				if(c === "!ref") {
					this.extendsRange(s1[c], s2[c]);
				}
				else if(v1.indexOf(v2) === -1 && v2.indexOf(v1) === -1) {
					s1[c].t = "s";
					s1[c].v = v1+String.fromCharCode(13)+v2;
				}
			} else {
				s2[c].v = v2;
				s1[c] = s2[c];
			}
		}
		return s1;
	},

	extendsRange: function(r1, r2) {
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

	max: function(a, b) {
		return a > b ? a : b;
	},

	min: function(a, b) {
		return a < b ? a : b;
	},

	mergeSheets: function(sheets) {
		return sheets.reduce(this.mergeSheet.bind(this));
	},

	enterOnce: function(text) {
		var regEnter = /[\r\n]+/g;
		return text.replace(regEnter, String.fromCharCode(13));
	}
};