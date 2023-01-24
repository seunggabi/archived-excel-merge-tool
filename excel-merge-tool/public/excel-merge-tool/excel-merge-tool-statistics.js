//noinspection JSAnnotator
/**
 * Created by seunggabi on 2017. 4. 10..
 */

EMT.STATISTICS = {
	counts: {},
	constCount: 3,
	times: 1,
	cps: 160000,

	SheetCount: function() {
		this.cellCount = 0;
		this.count = 1;
	},

	total: 0,

	analyze: function(wb) {
		for(let name in wb.Sheets) {
			if(this.counts[name]) {
				this.counts[name].count++;
			} else {
				this.counts[name] = new this.SheetCount();
			}

			let sheetCount = this.counts[name];
			sheetCount.cellCount = EMT.UTIL.max(sheetCount.cellCount, Object.keys(wb.Sheets[name]).length-this.constCount);
		}
	},

	_calc: function() {
		this.total = Object.keys(this.counts).length;
		for(let c in this.counts) {
			this.total += this.counts[c].cellCount * this.counts[c].count * this.counts[c].count / 2;
		}
		this.total *= this.times;

		this.counts = {};
		return this.total;
	},

	getTime: function() {
		this._calc();
		return this.total / this.cps;
	}
};