/**
 * Created by seunggabi on 2017. 2. 26..
 */

module.exports = {
	mergeSheets: function(wb1, wb2) {
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
			if(s1.hasOwnProperty(c)) {
				if(c === "!ref") {
					this.extendsRange(s1[c], s2[c]);
				}
				s1[c].t = "s";
				s1[c].v = s1[c].v+String.fromCharCode(13)+s2[c].v;
			} else {
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
	}
};