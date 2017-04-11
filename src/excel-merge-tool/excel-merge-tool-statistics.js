/**
 * Created by seunggabi on 2017. 4. 10..
 */
module.exports = {
	CONFIG: require("./excel-merge-tool-config.js"),
	UTIL: require("./excel-merge-tool-utils.js"),

	counts: {},
	constCount: 3,

	SheetCount: function() {
		this.cellCount = 0;
		this.count = 1;
	},

	total: 1,

	analyze: function(wb) {
		for(var name in wb.Sheets) {
			if(!this.counts[name]) {
				this.counts[name] = new this.SheetCount();
			} else {
				this.counts[name].count++;
			}
			var sheetCount = this.counts[name];
			sheetCount.cellCount = this.UTIL.max(sheetCount.cellCount, Object.keys(wb.Sheets[name]).length-this.constCount);
		}
	},

	calc: function() {
		this.total = Object.keys(this.counts).length;
		for(var c in this.counts) {
			this.total *= this.counts[c].cellCount * this.counts[c].count;
		}

		this.counts = {};
		return this.total;
	}
};