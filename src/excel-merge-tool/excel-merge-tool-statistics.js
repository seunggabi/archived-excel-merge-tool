//noinspection JSAnnotator
/**
 * Created by seunggabi on 2017. 4. 10..
 */
module.exports = {
	CONFIG: require("./excel-merge-tool-config.js"),
	UTIL: require("./excel-merge-tool-util.js"),
	UTIL: require("./excel-merge-tool-util.js"),

	counts: {},
	constCount: 3,
	times: 1,
	cps: 80000,

	MSG: "완료 예상 시간은 {{TIME}}초 입니다.",

	SheetCount: function() {
		this.cellCount = 0;
		this.count = 1;
	},

	total: 0,

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
			this.total += this.counts[c].cellCount * this.counts[c].count;
		}
		this.total *= this.times;

		this.counts = {};
		return this.total;
	},

	alert: function() {
		alert(this.MSG.replace("{{TIME}}", this.total/this.cps));
	}
};